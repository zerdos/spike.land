# Code Documentation Assistant

This agent assists developers by automatically generating documentation for TypeScript/React code.

## Features

- Reads TypeScript/React files.
- Generates documentation for components, functions, interfaces, and types.
- Uses an OpenAI language model for documentation generation.

## How to Use

1.  **Ensure you have an OpenAI API key set up.** The agent relies on an OpenAI model (e.g., GPT-4) for generating documentation.
2.  **Instantiate the agent:**
    ```python
    from agents.code_documentation.code_documentation import CodeDocumentationAssistant

    code_doc_agent = CodeDocumentationAssistant()
    ```
3.  **Provide the path to the code file:**
    ```python
    file_path = "path/to/your/component.tsx"
    code_doc_agent.print_response(f"Generate documentation for the code in '{file_path}'")
    ```

## Example

See the `if __name__ == "__main__":` block in `agents/code_documentation/code_documentation.py` for an example of how to run the agent with a dummy component.

## Limitations

- The quality of the documentation depends on the capabilities of the underlying OpenAI model.
- Complex or unconventional code structures might not be documented perfectly.
- Requires a valid OpenAI API key with access to the chosen model.
- The `FileTools` used by the agent have a default size limit for readable files.
