declare module "*?worker" {
  const workerfactory: () => Worker;

  export default workerfactory;
}
