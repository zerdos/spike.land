
export const asyncLimit = (fn, n) => {
  let pendingPromises = [];
  return async function (...args) {
    if (pendingPromises.length >= n) {
      await Promise.race(pendingPromises);
    }

    const p = fn.apply(this, args);
    pendingPromises.push(p);
    await p;
    pendingPromises = pendingPromises.filter((pending) => pending !== p);
    return p;
  };
};
