// Types for the result object with discriminated union
interface Success<T> {
  data: T;
  error: null;
}

interface Failure<E> {
  data: null;
  error: E;
}

type Result<T, E = Error> = Success<T> | Failure<E>;

// Main wrapper function
export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}

interface TestResult {
  result: string;
  toThrow: boolean;
}

async function testResultOrThrow(
  { result, toThrow }: TestResult,
): Promise<string> {
  if (toThrow) {
    throw new Error(result);
  }
  return result;
}

(async () => {
  const { data, error } = await tryCatch(
    testResultOrThrow({ result: "yay", toThrow: true }),
  );

  if (error) {
    console.error("Error:", error);
  }

  console.info("Formatted:", data);
})();
