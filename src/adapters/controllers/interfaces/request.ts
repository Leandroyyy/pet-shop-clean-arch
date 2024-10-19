export interface Request {
  body: any;
  headers: { [key: string]: unknown };
  params: { [key: string]: unknown };
}
