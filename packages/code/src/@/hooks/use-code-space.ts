import { routes } from "@/lib/routes";

export const getCodeSpace = (pathname: string = "") => {
  const paths = (pathname || location.pathname).split("/").slice(1);

  const redirect = Object.hasOwn(routes, location.pathname)
    ? routes[(pathname || location.pathname) as unknown as keyof typeof routes]
    : null;

  return redirect || paths[1];
};
