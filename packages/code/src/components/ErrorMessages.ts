// errorMessages.ts

export const errorMessages = {
  typescript: "There might be a TypeScript error in your code. Check the editor for more details.",
  prettier: "There was an issue formatting your code. It might contain syntax errors.",
  transpile: "Your code couldn't be transpiled. There might be a syntax or compilation error.",
  render: "The code was transpiled, but no HTML output was generated. Check your render function.",
};

export type ErrorType = keyof typeof errorMessages | null;
