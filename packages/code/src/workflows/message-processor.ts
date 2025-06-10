import type { ICode, ImageData } from "@/lib/interfaces";
import { metrics } from "@/lib/metrics";
import type { ChatAnthropicCallOptions } from "@langchain/anthropic";
import type { BaseLanguageModelInput } from "@langchain/core/language_models/base";
import type { AIMessage, AIMessageChunk } from "@langchain/core/messages";
import { HumanMessage } from "@langchain/core/messages";
import type { Runnable } from "@langchain/core/runnables";
import { MODEL_NAME } from "../config/workflow-config";
import { isRetryableError } from "../utils/retry";
import type { AgentState } from "../workflows/chat-langchain";
import { toolResponseCache } from "./caching";
import { determineReturnModifiedCode, getHashWithCache } from "./code-processing";
import { telemetry } from "./telemetry";
import { createCodeIntegrityError, ErrorType, WorkflowError } from "./tools/utils/error-handlers";
import {
  extractToolResponseMetadata,
  handleMissingCodeResponse,
  updateToolCallsWithCodeFlag,
} from "./tools/utils/tool-response-utils";
import type { ExtendedAgentState, ToolResponseMetadata } from "./workflow-types";

/**
 * Processes a message in the workflow
 */
export async function processMessage(
  state: AgentState,
  model: Runnable<
    BaseLanguageModelInput,
    AIMessageChunk,
    ChatAnthropicCallOptions
  >,
  cSess: ICode,
  initialState: AgentState,
): Promise<Partial<AgentState>> {
  // Start performance tracking
  telemetry.startTimer("processMessage");
  const start = Date.now();
  try {
    if (state.hash && state.code) {
      // Calculate hash with caching
      const currentHash = getHashWithCache(state.code);

      if (state.hash !== currentHash) {
        throw createCodeIntegrityError(
          "Code integrity",
          state.hash,
          currentHash,
          state.code.length,
        );
      }
    }

    if (state.code && state.code.length > 1000) {
      console.warn(
        `Performance optimization: Processing large code block (${state.code.length} chars)`,
      );
    }

    const cleanedState = { ...state, code: state.code };
    const lastMessage = state.messages[state.messages.length - 1];
    let returnModifiedCode = false;

    if (lastMessage && !("content" in lastMessage)) {
      throw new WorkflowError("Invalid message format", ErrorType.Unexpected);
    }

    if (
      lastMessage && "tool_calls" in lastMessage &&
      Array.isArray(lastMessage.tool_calls)
    ) {
      returnModifiedCode = determineReturnModifiedCode(
        lastMessage.tool_calls,
        state.code,
      );
    }

    if (
      lastMessage && "tool_calls" in lastMessage &&
      Array.isArray(lastMessage.tool_calls)
    ) {
      const updatedToolCalls = updateToolCallsWithCodeFlag(
        lastMessage.tool_calls,
        returnModifiedCode,
      );
      const updatedLastMessage = {
        ...lastMessage,
        tool_calls: updatedToolCalls,
      } as AIMessage;
      cleanedState.messages = [
        ...state.messages.slice(0, -1),
        updatedLastMessage,
      ];
    }

    // Use retry mechanism for model invocation
    telemetry.startTimer("model.invoke");

    // Log the messages being sent to the model for debugging
    console.warn(
      "Invoking model with messages:",
      JSON.stringify(cleanedState.messages.map((m) => ({
        type: m.constructor.name,
        content: typeof m.content === "string"
          ? m.content.substring(0, 100) + "..."
          : "(non-string content)",
        has_tool_calls: "tool_calls" in m && Array.isArray(m.tool_calls) &&
          m.tool_calls.length > 0,
      }))),
    );

    const response = await model.invoke(cleanedState.messages);

    // Log if the response contains tool calls
    console.warn(
      "Model response has tool calls:",
      "tool_calls" in response && Array.isArray(response.tool_calls) &&
        response.tool_calls.length > 0,
    );
    const modelDuration = telemetry.stopTimer("model.invoke");

    // Record model interaction metrics
    telemetry.trackModelInteraction({
      model: MODEL_NAME,
      promptTokens: 0, // We don't have access to token counts directly
      completionTokens: 0, // We don't have access to token counts directly
      duration: modelDuration || 0,
      success: true,
    });

    // Check cache for tool response metadata
    const responseKey = JSON.stringify({
      content: response.content,
      tool_calls: response.tool_calls,
    });

    let metadata: ToolResponseMetadata;
    const cachedResponse = toolResponseCache.get(responseKey);

    if (cachedResponse && "hash" in cachedResponse) {
      metadata = cachedResponse as ToolResponseMetadata;
      metrics.recordOperation("toolResponse.cache.hit", 0);
    } else {
      const metadataStart = Date.now();
      metadata = extractToolResponseMetadata(response, state);
      const metadataDuration = Date.now() - metadataStart;
      metrics.recordOperation("toolResponse.extraction", metadataDuration);

      // Cache the result with proper type conversion
      const hashForCache: string = metadata.hash ?? "";
      toolResponseCache.set(responseKey, {
        hash: hashForCache,
        modifiedCodeHash: metadata.modifiedCodeHash ?? "", // Provide default
        compilationError: !!metadata.compilationError,
        codeWasReturned: metadata.codeWasReturned,
      });
    }

    const { hash, compilationError, codeWasReturned } = metadata;

    const currentHashForState: string = hash ?? ""; // hash from metadata (destructured on L157)
    const updatedState = {
      ...cleanedState,
      messages: [response],
      isStreaming: true,
      hash: currentHashForState,
    };

    // Check for images in the message
    const currentHumanMessage = state.messages[state.messages.length - 1];
    if (
      currentHumanMessage instanceof HumanMessage &&
      currentHumanMessage.additional_kwargs["images"]
    ) {
      const images = currentHumanMessage
        .additional_kwargs["images"] as ImageData[];
      (updatedState as ExtendedAgentState)["images"] = images;
      (updatedState as ExtendedAgentState).hasImages = images.length > 0;
    }

    // Save the AI response message to cSess
    if (response) {
      const aiMessageForChat = {
        id: Date.now().toString(),
        role: "assistant" as const,
        content: typeof response.content === "string" ? response.content : "",
      };
      await cSess.addMessage(aiMessageForChat);
    }

    // Handle case where code is not returned in the tool response
    // This happens with our optimized replaceInFileTool that doesn't return full code
    if ((!codeWasReturned || (hash && hash !== state.hash))) {
      // Ensure hash is a string before passing to handleMissingCodeResponse
      const hashToUse = hash || "";
      // Pass cSess to handleMissingCodeResponse
      const latestCode = await handleMissingCodeResponse(
        hashToUse,
        state,
        cSess,
      );
      if (latestCode) {
        updatedState.code = latestCode;
        // Update hash if needed
        if (!hash && latestCode) {
          updatedState.hash = getHashWithCache(latestCode);
        }
      }
    }

    if (compilationError) {
      console.warn("Compilation error detected", compilationError);
      throw new WorkflowError(
        "failed to compile: syntax error",
        ErrorType.Compilation,
      );
    }

    if (state.code !== updatedState.code && updatedState.code && !hash) {
      // Calculate hash with caching for updated code
      updatedState.hash = getHashWithCache(updatedState.code);
    }

    if (
      updatedState.code &&
      state.code === updatedState.code &&
      state.code !== initialState.code
    ) {
      throw new WorkflowError(
        "Code modification failed",
        ErrorType.ToolExecution,
        {
          initialCodeLength: state.code.length,
          currentCodeLength: state.code.length,
        },
        "Try breaking your changes into smaller, more targeted modifications.",
      );
    }

    // Record processing duration and success
    const duration = Date.now() - start;
    metrics.recordOperation("processMessage", duration);
    telemetry.stopTimer("processMessage", {
      codeModified: (state.code !== updatedState.code).toString(),
      codeLength: updatedState.code?.length?.toString() || "0",
    });

    return updatedState;
  } catch (error) {
    const errorContext = {
      error,
      state: {
        codeLength: state.code?.length,
        hash: state.hash,
        hasMessages: state.messages?.length > 0,
      },
    };

    // Record error in telemetry
    telemetry.trackError(
      error instanceof Error ? error : new Error(String(error)),
      {
        location: "processMessage",
        codeLength: state.code?.length?.toString() || "0",
        isRetryable: isRetryableError(error).toString(),
      },
    );

    const duration = Date.now() - start;
    metrics.recordOperation("processMessage", duration, true);
    telemetry.stopTimer("processMessage", { success: "false" });

    console.error("Error processing message:", errorContext);
    throw error;
  }
}
