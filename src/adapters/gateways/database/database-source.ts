export interface DbParams<T> {
  field: keyof T;
  value: T[keyof T];
}

export interface DatabaseSource<T> {
  searchByParameters(parameters: DbParams<T>[]): Promise<T[]>;
  insert(parameters: DbParams<T>[]): Promise<void>;
  update(parameters: DbParams<T>[]): Promise<void>;
}
