import initialClaude from "./initial-claude.txt";

export const claudeRecovery = (codeNow: string, errorLog: string) =>
  `Hey,
something went wrong with processing your code. Its not even running.
Did you send the change request in the correct format? 
You must modify the code using string replace tools. The sting replace block is applied on the whole code. 
The format is as follows:
<<<<<<< SEARCH
[Original code to be replaced]
=======
[New code to replace the original]
>>>>>>> REPLACE

This format helps to clearly identify the changes to be made.

I followed the instructions you gave me, but it seems that I'm still stuck. The code I have is:

${codeNow}

The error what I am getting is:
\`\`\`
${errorLog}
\`\`\`

Could you help me with this error? I'm stuck.
Usw only the code block format to provide the changes.
`;

export const anthropicSystem = (
  { fileName, fileContent, userPrompt }: {
    fileName: string;
    fileContent: string;
    userPrompt: string;
  },
) =>
  initialClaude.replace("{{fileName}}", fileName).replace(
    "{{fileContent}}",
    fileContent,
  ).replace(
    "{{userPrompt}}",
    userPrompt,
  );

export const reminder = ({ userPrompt }: { userPrompt: string; }) => `

${userPrompt}

Reminder from the system:
Please remember that just give the user 
instructions what to do, NEVER don't provide 
the full code.
`;

export const gptSystem = `
You will receive from the user a specific code, that needs to be modified based of a set of well defined instructions.
Your task it to provide the user the full code with the modifications requested.
You must print out all lines of the updated code and never refer to the user's original code.
If the user doesn't provide you instructions, just return an empty string.
`;
