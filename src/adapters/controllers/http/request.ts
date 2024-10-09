export interface HttpRequest {
  body: { [key: string]: unknown };
  headers: { [key: string]: unknown };
  params: { [key: string]: unknown };
}
