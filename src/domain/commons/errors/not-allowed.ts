export class NotAllowedError extends Error {
  code: number;

  constructor(message: string) {
    super(message);
    this.code = 403;
  }
}