/** Initialize an empty document with root element */
export const renderTestingPlatform = (cy) => {
  // Let's mount components under a new div with this id
  const rootId = "cypress-root";
  const document = cy.state("document");
  if (document.getElementById(rootId)) {
    return;
  }
  const rootNode = document.createElement("div");
  rootNode.setAttribute("id", rootId);
  document.getElementsByTagName("body")[0].prepend(rootNode);
  const selector = "#" + rootId;
  return cy.get(selector, { log: false });
};
