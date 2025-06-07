// contextUtils.ts

export function extractCurrentTask(aiResponse: string): string {
  const taskMatch = aiResponse.match(/Current task: (.*)/);
  return (taskMatch?.[1] ?? "") as string;
}

export function extractCodeStructure(code: string): string {
  // This is a basic implementation. You might want to enhance this
  // to provide a more detailed code structure analysis.
  const lines = code.split("\n");
  const structure = lines
    .filter((line) => /^(class|function|const|let|var|import|export)/.test(line.trim()))
    .map((line) => line.trim())
    .join("\n");
  return structure;
}
