import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { useCallback, useEffect, useState } from "react";
import { editorCommands } from "./editor-commands";

interface EditorCommandPaletteProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EditorCommandPalette({ open: controlledOpen, onOpenChange }: EditorCommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  // Use controlled or uncontrolled state
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = useCallback((value: boolean) => {
    if (onOpenChange) {
      onOpenChange(value);
    } else {
      setInternalOpen(value);
    }
  }, [onOpenChange]);

  // Handle keyboard shortcut (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(!isOpen);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setOpen]);

  const handleSelect = useCallback((commandId: string) => {
    const command = editorCommands.find((c) => c.id === commandId);
    if (command) {
      setOpen(false);
      // Small delay to let the dialog close before executing
      setTimeout(() => {
        command.action();
      }, 50);
    }
  }, [setOpen]);

  return (
    <CommandDialog
      open={isOpen}
      onOpenChange={setOpen}
      title="Editor Commands"
      description="Search for a command to run in the editor"
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No commands found.</CommandEmpty>
        <CommandGroup heading="Editor Actions">
          {editorCommands.map((command) => (
            <CommandItem
              key={command.id}
              value={`${command.label} ${command.description || ""}`}
              onSelect={() => handleSelect(command.id)}
            >
              <span>{command.label}</span>
              {command.shortcut && (
                <CommandShortcut>{command.shortcut}</CommandShortcut>
              )}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

// Export a hook for controlling the command palette externally
export function useEditorCommandPalette() {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((prev) => !prev), []);
  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);

  return { open, setOpen, toggle, show, hide };
}
