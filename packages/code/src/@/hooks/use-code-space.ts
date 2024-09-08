import { routes } from "@/lib/routes";

const paths = location.pathname.split("/").slice(1);

const redirect = Object.hasOwn(routes, location.pathname)
  ? routes[location.pathname as unknown as keyof typeof routes]
  : null;
// console.log({ paths });
export const useCodeSpace = () => redirect || paths[1];
