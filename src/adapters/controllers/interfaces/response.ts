export interface Response<T> {
  code: number;
  body: T | { message: string };
  headers?: { [key: string]: unknown };
}
