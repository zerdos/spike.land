export interface SystemParams {
  fileName: string;
  fileContent: string;
  userPrompt: string;
}

export interface ReminderParams {
  userPrompt: string;
}

export function anthropicSystem(params: SystemParams): string {
  return `Human: I am working on a file named ${params.fileName}. 
The current content of the file is:

${params.fileContent}

${params.userPrompt}`;
}

export function reminder(params: ReminderParams): string {
  return params.userPrompt;
}
