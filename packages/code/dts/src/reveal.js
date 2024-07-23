export const reveal = () => {
  const re = document.getElementById("root");
  const rootEl = re.lastElementChild;
  rootEl.style.height = "100%";
  re?.removeChild(re.firstElementChild);
  rootEl.style.opacity = "1";
};
