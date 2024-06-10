export interface DbParams<T> {
  field: keyof T;
  value: T[keyof T];
}

export interface SqlDbConnection {
  searchByParameters<T>(
    tableName: string,
    fields: string[] | null,
    parameters: DbParams<T>[]
  ): Promise<T[] | null>;
  searchAll<T>(tableName: string, fields?: string[] | null): Promise<T[]>;
  insert<T>(tableName: string, parameters: DbParams<T>[]): Promise<void>;
  update<T>(tableName: string, parameters: DbParams<T>[]): Promise<void>;
  beginTransaction(): Promise<string>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}
