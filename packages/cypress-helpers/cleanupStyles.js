export const cleanupStyles = (cy) => {
  const document = cy.state('document');
  const styles = document.body.querySelectorAll('style');
  styles.forEach(styleElement => {
    document.body.removeChild(styleElement);
  });
  const links = document.body.querySelectorAll('link[rel=stylesheet]');
  links.forEach(link => {
    document.body.removeChild(link);
  });
};
