export interface DbParams {
  field: string;
  value: any;
}

export interface DbConnection {
  searchByParameters(
    tableName: string,
    fields: string[] | null,
    parameters: DbParams[]
  ): Promise<any>;
  searchAll(tableName: string, fields?: string[] | null): Promise<any[]>;
  insert(tableName: string, parameters: DbParams[]): Promise<void>;
  findByLastId(tableName: string): Promise<number>;
  beginTransaction(): Promise<string>
  commit(): Promise<void>
  rollback(): Promise<void>
}
