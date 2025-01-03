import type { ICodeSession } from "@/lib/interfaces";

type DiffOperation = "EQUAL" | "INSERT" | "DELETE" | "REPLACE";

export interface DiffEntry {
  operation: DiffOperation;
  path: string[];
  value?: unknown;
  oldValue?: unknown;
}

export function createDiff(oldState: ICodeSession, newState: ICodeSession): DiffEntry[] {
  const diffs: DiffEntry[] = [];
  computeDiff([], oldState, newState, diffs);
  return diffs;
}

function computeDiff(
  path: string[],
  oldValue: unknown,
  newValue: unknown,
  diffs: DiffEntry[],
): void {
  // Handle different types or null/undefined
  if (
    typeof oldValue !== typeof newValue ||
    (oldValue === null && newValue !== null) ||
    (oldValue !== null && newValue === null)
  ) {
    diffs.push({
      operation: "REPLACE",
      path,
      oldValue,
      value: newValue,
    });
    return;
  }

  // Handle primitive types
  if (typeof oldValue !== "object" || oldValue === null) {
    if (oldValue !== newValue) {
      diffs.push({
        operation: "REPLACE",
        path,
        oldValue,
        value: newValue,
      });
    }
    return;
  }

  // Handle arrays
  if (Array.isArray(oldValue) && Array.isArray(newValue)) {
    const maxLength = Math.max(oldValue.length, newValue.length);
    for (let i = 0; i < maxLength; i++) {
      const currentPath = [...path, i.toString()];

      if (i >= oldValue.length) {
        diffs.push({
          operation: "INSERT",
          path: currentPath,
          value: newValue[i],
        });
      } else if (i >= newValue.length) {
        diffs.push({
          operation: "DELETE",
          path: currentPath,
          oldValue: oldValue[i],
        });
      } else {
        computeDiff(currentPath, oldValue[i], newValue[i], diffs);
      }
    }
    return;
  }

  // Handle objects
  const allKeys = [
    ...new Set([...Object.keys(oldValue), ...Object.keys(newValue as unknown as object)]),
  ];

  for (const key of allKeys) {
    const currentPath = [...path, key];

    if (!(key in oldValue)) {
      diffs.push({
        operation: "INSERT",
        path: currentPath,
        value: (newValue as Record<string, unknown>)[key],
      });
    } else if (!(key in (newValue as Record<string, unknown>))) {
      diffs.push({
        operation: "DELETE",
        path: currentPath,
        oldValue: (oldValue as Record<string, unknown>)[key],
      });
    } else {
      computeDiff(
        currentPath,
        (oldValue as Record<string, unknown>)[key],
        (newValue as Record<string, unknown>)[key],
        diffs,
      );
    }
  }
}

export function applyDiff<T>(baseState: T, diffs: DiffEntry[]): T {
  const newState = JSON.parse(JSON.stringify(baseState));

  for (const diff of diffs) {
    let current = newState;
    const lastIndex = diff.path.length - 1;

    // Navigate to the parent object/array
    for (let i = 0; i < lastIndex; i++) {
      if (!(diff.path[i] in current)) {
        current[diff.path[i]] = isNaN(Number(diff.path[i + 1])) ? {} : [];
      }
      current = current[diff.path[i]];
    }

    const lastKey = diff.path[lastIndex];

    switch (diff.operation) {
      case "INSERT":
      case "REPLACE":
        current[lastKey] = JSON.parse(JSON.stringify(diff.value));
        break;
      case "DELETE":
        if (Array.isArray(current)) {
          current.splice(Number(lastKey), 1);
        } else {
          delete current[lastKey];
        }
        break;
    }
  }

  return newState;
}

// Example usage:
/*
const oldState = {
  users: [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" }
  ],
  settings: {
    theme: "dark",
    notifications: true
  }
};

const newState = {
  users: [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane" }
  ],
  settings: {
    theme: "light",
    notifications: true,
    language: "en"
  }
};

const diffs = createDiff(oldState, newState);
console.log(diffs);
// Output will be something like:
// [
//   { operation: 'REPLACE', path: ['users', '0', 'name'], oldValue: 'John', value: 'John Doe' },
//   { operation: 'REPLACE', path: ['settings', 'theme'], oldValue: 'dark', value: 'light' },
//   { operation: 'INSERT', path: ['settings', 'language'], value: 'en' }
// ]

const reconstructedState = applyDiff(oldState, diffs);
console.log(JSON.stringify(reconstructedState) === JSON.stringify(newState)); // true
*/
