import { HttpError } from "./httpError";

type SafeAsyncResult<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: HttpError;
};

const toSafeAsync = async <T>(promise: Promise<T>): Promise<SafeAsyncResult<T>> => {
  try {
    const data = await promise;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: HttpError.fromError(error) };
  }
};

export default toSafeAsync;