export declare function handleErrors(
  request: Request,
  func: () => Promise<Response>,
): Promise<Response>;
