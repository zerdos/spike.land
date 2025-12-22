// Editor commands registry for command palette integration

export interface EditorCommand {
  id: string;
  label: string;
  shortcut?: string;
  description?: string;
  action: () => void;
}

// Get the current editor API from window
const getEditorAPI = () => window.__spikeEditor;

// Registry of editor commands
export const editorCommands: EditorCommand[] = [
  {
    id: "find",
    label: "Find",
    shortcut: "Cmd+F",
    description: "Find text in the editor",
    action: () => {
      const api = getEditorAPI();
      if (api) {
        api.focus();
        api.triggerAction("actions.find");
      }
    },
  },
  {
    id: "replace",
    label: "Find and Replace",
    shortcut: "Cmd+H",
    description: "Find and replace text in the editor",
    action: () => {
      const api = getEditorAPI();
      if (api) {
        api.focus();
        api.triggerAction("editor.action.startFindReplaceAction");
      }
    },
  },
  {
    id: "goToLine",
    label: "Go to Line...",
    shortcut: "Ctrl+G",
    description: "Jump to a specific line number",
    action: () => {
      const api = getEditorAPI();
      if (api) {
        api.focus();
        api.triggerAction("editor.action.gotoLine");
      }
    },
  },
  {
    id: "format",
    label: "Format Document",
    shortcut: "Shift+Alt+F",
    description: "Format the entire document",
    action: () => {
      const api = getEditorAPI();
      if (api) {
        api.focus();
        api.triggerAction("editor.action.formatDocument");
      }
    },
  },
  {
    id: "selectAll",
    label: "Select All",
    shortcut: "Cmd+A",
    description: "Select all text in the editor",
    action: () => {
      const api = getEditorAPI();
      if (api) {
        api.focus();
        api.triggerAction("editor.action.selectAll");
      }
    },
  },
  {
    id: "comment",
    label: "Toggle Line Comment",
    shortcut: "Cmd+/",
    description: "Toggle comment on the current line",
    action: () => {
      const api = getEditorAPI();
      if (api) {
        api.focus();
        api.triggerAction("editor.action.commentLine");
      }
    },
  },
  {
    id: "selectNextOccurrence",
    label: "Select Next Occurrence",
    shortcut: "Cmd+D",
    description: "Select the next occurrence of the current selection",
    action: () => {
      const api = getEditorAPI();
      if (api) {
        api.focus();
        api.triggerAction("editor.action.addSelectionToNextFindMatch");
      }
    },
  },
  {
    id: "undo",
    label: "Undo",
    shortcut: "Cmd+Z",
    description: "Undo the last action",
    action: () => {
      const api = getEditorAPI();
      if (api) {
        api.focus();
        api.triggerAction("undo");
      }
    },
  },
  {
    id: "redo",
    label: "Redo",
    shortcut: "Cmd+Shift+Z",
    description: "Redo the last undone action",
    action: () => {
      const api = getEditorAPI();
      if (api) {
        api.focus();
        api.triggerAction("redo");
      }
    },
  },
  {
    id: "fold",
    label: "Fold Region",
    shortcut: "Cmd+Opt+[",
    description: "Fold the current code region",
    action: () => {
      const api = getEditorAPI();
      if (api) {
        api.focus();
        api.triggerAction("editor.fold");
      }
    },
  },
  {
    id: "unfold",
    label: "Unfold Region",
    shortcut: "Cmd+Opt+]",
    description: "Unfold the current code region",
    action: () => {
      const api = getEditorAPI();
      if (api) {
        api.focus();
        api.triggerAction("editor.unfold");
      }
    },
  },
  {
    id: "foldAll",
    label: "Fold All",
    shortcut: "Cmd+K Cmd+0",
    description: "Fold all code regions",
    action: () => {
      const api = getEditorAPI();
      if (api) {
        api.focus();
        api.triggerAction("editor.foldAll");
      }
    },
  },
  {
    id: "unfoldAll",
    label: "Unfold All",
    shortcut: "Cmd+K Cmd+J",
    description: "Unfold all code regions",
    action: () => {
      const api = getEditorAPI();
      if (api) {
        api.focus();
        api.triggerAction("editor.unfoldAll");
      }
    },
  },
];
