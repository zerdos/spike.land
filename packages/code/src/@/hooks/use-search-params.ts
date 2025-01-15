export const useSearchParams = () => {
  const searchParams = new URLSearchParams(location.search);

  const setSearchParam = (key: string, value: string) => {
    searchParams.set(key, value);
    if (history.pushState) {
      history.pushState(null, "", `?${searchParams.toString()}`);
    } else {
      location.search = searchParams.toString();
    }
  };

  const getSearchParam = (key: string) => searchParams.get(key);

  return {
    ...searchParams,
    get: getSearchParam,
    set: setSearchParam,
  };
};
