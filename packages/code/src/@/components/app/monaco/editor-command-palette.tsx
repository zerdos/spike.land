import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useCallback, useState } from "react";
import { editorCommands } from "./editor-commands";

export function EditorCommandPalette() {
  const [open, setOpen] = useState(false);

  const handleSelect = useCallback((commandId: string) => {
    const command = editorCommands.find((c) => c.id === commandId);
    setOpen(false);
    if (command) {
      queueMicrotask(() => command.action());
    }
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Editor Commands">
          {editorCommands.map((cmd) => (
            <CommandItem key={cmd.id} onSelect={() => handleSelect(cmd.id)}>
              <span>{cmd.label}</span>
              {cmd.shortcut && <kbd className="ml-auto text-xs">{cmd.shortcut}</kbd>}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
