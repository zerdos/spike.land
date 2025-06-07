import { routes } from "@/lib/routes";

export const getCodeSpace = (pathname: string) => {
  const paths = pathname.split("/").slice(1);

  const redirect = Object.hasOwn(routes, pathname)
    ? routes[pathname as unknown as keyof typeof routes]
    : null;

  return redirect || paths[1] || "empty";
};
