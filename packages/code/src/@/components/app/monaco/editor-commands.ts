const isMac = typeof navigator !== "undefined" && /Mac/.test(navigator.platform);
const modKey = isMac ? "Cmd" : "Ctrl";

export interface EditorCommand {
  id: string;
  label: string;
  shortcut?: string;
  action: () => void;
}

const getEditorAPI = () => window.__spikeEditor;

export const editorCommands: EditorCommand[] = [
  {
    id: "find",
    label: "Find",
    shortcut: `${modKey}+F`,
    action: () => getEditorAPI()?.triggerAction("actions.find"),
  },
  {
    id: "replace",
    label: "Find and Replace",
    shortcut: `${modKey}+H`,
    action: () => getEditorAPI()?.triggerAction("editor.action.startFindReplaceAction"),
  },
  {
    id: "format",
    label: "Format Document",
    shortcut: `${modKey}+Shift+F`,
    action: () => getEditorAPI()?.format(),
  },
  {
    id: "goto-line",
    label: "Go to Line",
    shortcut: `${modKey}+G`,
    action: () => getEditorAPI()?.triggerAction("editor.action.gotoLine"),
  },
  {
    id: "toggle-minimap",
    label: "Toggle Minimap",
    action: () => getEditorAPI()?.triggerAction("editor.action.toggleMinimap"),
  },
  {
    id: "fold-all",
    label: "Fold All",
    shortcut: `${modKey}+K ${modKey}+0`,
    action: () => getEditorAPI()?.triggerAction("editor.foldAll"),
  },
  {
    id: "unfold-all",
    label: "Unfold All",
    shortcut: `${modKey}+K ${modKey}+J`,
    action: () => getEditorAPI()?.triggerAction("editor.unfoldAll"),
  },
  {
    id: "undo",
    label: "Undo",
    shortcut: `${modKey}+Z`,
    action: () => getEditorAPI()?.undo(),
  },
  {
    id: "redo",
    label: "Redo",
    shortcut: `${modKey}+Shift+Z`,
    action: () => getEditorAPI()?.redo(),
  },
];
