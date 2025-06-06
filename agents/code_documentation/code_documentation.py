from phi.agent import Agent
from phi.model.openai import OpenAIChat
from phi.tools.file import FileTools # Import FileTools

class CodeDocumentationAssistant(Agent):
    """
    An AI agent that generates documentation for TypeScript/React code.

    This agent takes a file path to a TypeScript/React file, reads its content,
    and uses an OpenAI model to generate documentation for components, functions,
    interfaces, and types found in the code.

    Key Features:
    - Utilizes OpenAI's language models (e.g., GPT-4).
    - Employs FileTools to read source code files.
    - Designed to be integrated into workflows requiring automated code documentation.

    Usage:
        assistant = CodeDocumentationAssistant()
        assistant.print_response("Generate documentation for the code in 'path/to/your/file.tsx'")
    """
    def __init__(self, model_name: str = "gpt-4", debug_mode: bool = True):
        super().__init__(
            description="Generates documentation for TypeScript/React code.",
            instructions=[
                "You are a helpful AI assistant that generates documentation for TypeScript/React code.",
                "Given a file path, read the code and generate clear, concise, and accurate documentation for it.",
                "Focus on explaining components, functions, interfaces, and types.",
                "Use the `read_file` tool to access the content of the specified file path.",
            ],
            model=OpenAIChat(model=model_name),
            tools=[FileTools()], # Instantiate and pass FileTools
            show_tool_calls=debug_mode,
            markdown=debug_mode,
            debug_mode=debug_mode,
        )

if __name__ == "__main__":
    code_doc_agent = CodeDocumentationAssistant()
    code_doc_agent.print_response("Generate documentation for the code in 'agents/code_documentation/DummyComponent.tsx'")
