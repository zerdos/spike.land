import { useEffect } from "react";

export const useBroadcastChannel = (
  codeSpace: string,
  handleBroadcastMessage: (event: MessageEvent) => void,
) => {
  useEffect(() => {
    const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);
    BC.addEventListener("message", handleBroadcastMessage);

    return () => {
      BC.removeEventListener("message", handleBroadcastMessage);
    };
  }, [codeSpace, handleBroadcastMessage]);
};
