function versions() {
  const v = {
    workerPrefix: window.location.hostname === "blog.zed.vision"
      ? `https://blog.zed.vision/code/src/workers`
      : `${location.href}src/workers`,
  };

  return v;
}

export const v = versions();
export default versions;
