export interface HttpResponse {
  statusCode: number;
  body: { [key: string]: unknown };
  headers?: { [key: string]: unknown };
}
