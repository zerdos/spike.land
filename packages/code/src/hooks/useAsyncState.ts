import { useEffect, useState } from "react";

export const useAsyncState = <T>(
  asyncFn: () => Promise<T>,
  deps: React.DependencyList = [],
) => {
  const [state, setState] = useState<T | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      try {
        const result = await asyncFn();
        if (!isCancelled) setState(result);
      } catch (error) {
        console.error("Error in useAsyncState:", error);
        if (!isCancelled) setState(null);
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, deps);

  return state;
};
