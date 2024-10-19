export interface SchemaValidator<T> {
  execute(data: T): { data: T; errors: any[] };
}
