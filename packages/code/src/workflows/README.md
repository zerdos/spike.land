# Enhanced Langchain Agent Workflow

This directory contains an improved implementation of the Langchain agent workflow with enhanced file change management capabilities.

## Key Components

### FileChangeManager

The `FileChangeManager` class (`tools/utils/file-change-manager.ts`) provides several improvements to the file change process:

1. **Better Hash Management**
   - Maintains a short-term memory of the most recent successful hash
   - Automatically retries with corrected hash when hash mismatches occur
   - Validates hash before submitting changes

2. **Smarter SEARCH/REPLACE Blocks**
   - Adds context lines to SEARCH blocks to ensure unique matches
   - Optimizes blocks for better matching accuracy
   - Provides line number hints for critical sections

3. **Atomic Change Batching**
   - Groups related changes into single tool calls
   - Uses multi-block diffs for complex changes
   - Analyzes dependencies between changes

4. **Error Recovery Improvements**
   - Automatically expands context when SEARCH blocks fail to match
   - Implements difference analysis between attempted SEARCH blocks and current content
   - Adds fallback pattern matching when exact line matches fail

5. **State Management**
   - Maintains a simple in-memory model of the file's current state
   - Tracks pending changes that haven't been confirmed
   - Provides version diff visualization for complex multi-step changes

### Enhanced Replace-in-File Tool

The `getEnhancedReplaceInFileTool` function (`tools/enhanced-replace-in-file.ts`) provides an improved version of the replace-in-file tool that uses the FileChangeManager for better file change handling.

### Enhanced Workflow Creator

The `createEnhancedWorkflowWithStringReplace` function (`enhanced-workflow-creator.ts`) creates a workflow that uses the enhanced replace-in-file tool for improved file change management.

## Usage

To use the enhanced workflow in your application:

```typescript
import { createEnhancedWorkflowWithStringReplace } from './workflows';

// Create an enhanced workflow
const workflow = createEnhancedWorkflowWithStringReplace(initialState, codeSession);

// Invoke the workflow
const result = await workflow.invoke(prompt, images);
```

## Benefits

Using the enhanced workflow provides several benefits:

1. **Reduced Conversation Length**: The enhanced workflow can reduce the number of back-and-forth messages needed to complete a task by handling hash management, context expansion, and change batching automatically.

2. **Improved Success Rate**: The enhanced workflow has better error recovery mechanisms, which can improve the success rate of file changes.

3. **Better User Experience**: The enhanced workflow provides clearer error messages and progress updates, which can improve the user experience.

## Implementation Details

The enhanced workflow uses the same interface as the original workflow, so it can be used as a drop-in replacement. The main difference is that it uses the enhanced replace-in-file tool, which in turn uses the FileChangeManager for better file change handling.

The FileChangeManager maintains a state of the file being modified, including the current content, hash, and pending changes. When a change is submitted, the FileChangeManager validates the hash, optimizes the SEARCH/REPLACE blocks, applies the changes, and updates the state.

If a change fails to apply, the FileChangeManager attempts to recover by trying different strategies, such as expanding the context or using flexible whitespace matching. If all recovery strategies fail, the FileChangeManager returns an error with a clear message.
