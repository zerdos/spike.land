const loader = async () => {
  const { diff } = await import("../diff/diff.min.js");
  window.diff = diff;
};

loader();
