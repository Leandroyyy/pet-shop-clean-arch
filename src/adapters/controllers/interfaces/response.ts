export interface Response<T> {
  code: number;
  body: T | { message: string, path?: string }[];
  headers?: { [key: string]: unknown };
}
