export class ConflictError extends Error {
  code: number;

  constructor(message: string) {
    super(message);
    this.code = 409;
  }
}
