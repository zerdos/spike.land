const broadcastChannels = new Map<string, BroadcastChannel>();

export const getBroadcastChannel = (codeSpace: string) => {
  if (broadcastChannels.has(codeSpace)) {
    return broadcastChannels.get(codeSpace)!;
  }

  const bc = new BroadcastChannel(`codeSpace-${codeSpace}`);

  broadcastChannels.set(codeSpace, bc);

  return bc;
};
