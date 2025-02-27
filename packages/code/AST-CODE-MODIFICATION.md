# AST-Based Code Modification System

This system provides a robust, semantic approach to code modification using Abstract Syntax Trees (AST) instead of brittle string-based search/replace operations.

## Key Benefits

1. **Semantic Understanding**: Modifies code based on its structure and meaning, not just text patterns
2. **Resilient to Formatting**: Works regardless of code style, indentation, or whitespace
3. **Precise Targeting**: Can target specific code elements like methods, classes, or imports
4. **Better Error Messages**: Provides detailed, context-aware error information
5. **Large File Support**: Efficiently handles large files with minimal memory usage
6. **Code Integrity**: Maintains document hash verification throughout the process

## How It Works

The system uses the Babel parser to convert code into an Abstract Syntax Tree (AST), which represents the code's structure rather than its text. This allows for more intelligent modifications:

1. **Parsing**: Code is parsed into an AST using appropriate plugins based on file type
2. **Targeting**: Specific nodes in the AST are targeted using a path-like syntax
3. **Modification**: Operations (add, update, delete, move) are applied to the targeted nodes
4. **Generation**: Modified AST is converted back to code
5. **Formatting**: Code is formatted using Prettier to maintain consistent style

## Operation Types

The system supports four types of operations:

1. **Add**: Add new code elements (imports, methods, properties, etc.)
2. **Update**: Modify existing code elements
3. **Delete**: Remove code elements
4. **Move**: Relocate code elements to different parts of the codebase

## Usage Example

```typescript
// Example of using the AST-based code modification tool
const operations = [
  {
    type: "update",
    target: "class:UserManager.method:addUser",
    code: "async addUser(name: string, password: string) { /* new implementation */ }",
  },
  {
    type: "add",
    target: "program",
    position: "before",
    code: 'import { hash } from "bcrypt";',
  },
];

// The tool handles the rest - parsing, modifying, and generating code
```

## Implementation Details

The system consists of several key components:

1. **AST Parser**: Uses Babel to parse code into an AST
2. **Node Finder**: Locates specific nodes in the AST based on target paths
3. **Operation Applier**: Applies modifications to the targeted nodes
4. **Code Generator**: Converts the modified AST back to code
5. **Formatter**: Ensures consistent code style using Prettier

## Integration with LangChain

The system integrates with LangChain workflows:

1. **Tool Definition**: Exposes the AST modification capabilities as a tool
2. **Workflow Integration**: Seamlessly works within the existing agent workflow
3. **Document Hash Tracking**: Maintains code integrity through hash verification
4. **Error Handling**: Provides detailed error information for debugging

## Getting Started

To use this system:

1. Install dependencies: `npm install`
2. Import the AST code modification tool: `import { astCodeModificationTool } from "@/tools/ast-code-modification"`
3. Use the tool in your LangChain workflow: `createAstWorkflow(initialState)`

## Dependencies

- Babel (parser, traverse, generator, types)
- Prettier
- LangChain
- Zod

## Future Improvements

- Enhanced node targeting with more flexible path syntax
- Support for more complex AST transformations
- Visual diff generation for better change visualization
- Performance optimizations for very large files
- Support for additional languages beyond JavaScript/TypeScript
