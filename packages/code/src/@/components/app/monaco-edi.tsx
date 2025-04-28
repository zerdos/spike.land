import { ata, prettierToThrow } from "@/lib/shared";
import { startMonaco } from "./monaco";
import type { EditorConfig, EditorModel } from "./monaco/types";

// Store for editor models
const mod: Record<string, EditorModel> = {};

/**
 * Initialize Monaco editor with the given configuration
 * This is the main entry point for the Monaco editor component
 */
export const startMonacoEditor = async ({
  code,
  container,
  codeSpace,
  onChange,
}: EditorConfig): Promise<EditorModel> => {
  // If we already have a model for this codeSpace, check if it's still valid
  if (mod[codeSpace]) {
    try {
      // Check if the container is still in the DOM
      if (container && document.body.contains(container)) {
        return mod[codeSpace];
      } else {
        // Container is no longer in the DOM, clean up the old model
        console.debug(
          `Container for ${codeSpace} is no longer in the DOM, creating new model`,
        );
        // Use requestAnimationFrame to ensure we're not unmounting during render
        requestAnimationFrame(() => {
          delete mod[codeSpace];
        });
      }
    } catch (error) {
      console.error(`Error checking model for ${codeSpace}:`, error);
      // Use requestAnimationFrame to ensure we're not unmounting during render
      requestAnimationFrame(() => {
        delete mod[codeSpace];
      });
    }
  }

  // Create a new model using the modular implementation
  mod[codeSpace] = await startMonaco(
    { code, container, codeSpace, onChange },
    ata,
    prettierToThrow,
  );

  return mod[codeSpace];
};
