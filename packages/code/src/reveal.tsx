export const reveal = () => {
  const re = document.getElementById("root");
  const rootEl = re!.lastElementChild as HTMLDivElement;
  const firstEl = re!.lastElementChild as HTMLDivElement;

  if (!rootEl) return;

  rootEl.style.height = "100%";

  if (firstEl !== rootEl) {
    re?.removeChild(re.firstElementChild!);
  }

  rootEl.style.opacity = "1";
};
