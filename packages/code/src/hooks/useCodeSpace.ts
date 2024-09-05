import { routes } from "../routes";

const paths = location.href.split("/").slice(3);

const redirect = Object.hasOwn(routes, location.pathname)
  ? routes[location.pathname as unknown as keyof typeof routes]
  : null;

export const useCodeSpace = () => redirect || paths[1];
