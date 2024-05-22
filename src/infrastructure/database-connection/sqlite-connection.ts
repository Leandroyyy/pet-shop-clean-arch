import { open } from "sqlite";
import sqlite3 from 'sqlite3';
import { DbConnection, DbParams } from "../../adapters/gateways/database/sqlite/db-connection";

interface Parameters {
  restriction: string;
  values: any[];
}

export class SqliteConnection implements DbConnection {
  private _dsn: string;

  constructor(dsn: string) {
    this._dsn = dsn;
  }
  
  async beginTransaction(): Promise<string> {
    const connection = await this.openDatabase();

    const transactionId = await connection.all('BEGIN TRANSACTION;')

    return transactionId[0]
  }

  async commit(): Promise<void> {
    const connection = await this.openDatabase();

    await connection.all('COMMIT;')
  }

  async rollback(): Promise<void> {
    const connection = await this.openDatabase();

    await connection.all('ROLLBACK;')
  }

  private async openDatabase() {
    return await open({ filename: this._dsn, driver: sqlite3.Database });
  }

  async searchAll(
    tableName: string,
    fields?: string[] | null
  ): Promise<unknown[]> {
    const fieldsToSearch = this.adjustFieldsExpression(fields);

    const sql = `SELECT ${fieldsToSearch} FROM ${tableName} `;
    const connection = await this.openDatabase();
    const rows = await connection.all(sql, []);
    connection.close();
    return rows;
  }

  async searchByParameters(
    tableName: string,
    fields: string[] | null,
    parameters: DbParams[]
  ): Promise<any> {
    const fieldsToSearch = this.adjustFieldsExpression(fields);
    const parametersToSearch = this.prepareParamsSearch(parameters);
    const sql = `
      SELECT ${fieldsToSearch} 
      FROM ${tableName}
      ${parametersToSearch.restriction}
    `;

    const connection = await this.openDatabase();
    const rows = await connection.all(sql, parametersToSearch.values);
    connection.close();
    return rows;
  }

  async findByLastId(tableName: string): Promise<number> {
    const sql = `SELECT seq FROM sqlite_sequence WHERE name=$t`;
    const params = { $t: tableName };
    const db = await this.openDatabase();
    const result = await db.get(sql, params);

    if (result === null || result === undefined) {
      return 1;
    }

    return result.seq + 1;
  }

  async insert(tableName: string, parameters: DbParams[]): Promise<void> {
    const fieldNames: string[] = [];
    const valueNames: string[] = [];
    const values: Record<string, any> = {};

    parameters.forEach(function (item) {
      fieldNames.push(item.field);
      const valueName = `$${item.field}`;
      valueNames.push(valueName);
      values[valueName] = item.value;
    });

    const sql = `
      INSERT INTO ${tableName} 
      (${fieldNames.join(",")}) 
      VALUES 
      (${valueNames.join(",")})
    `;

    const database = await this.openDatabase();
    const prepared = await database.prepare(sql, values);
    prepared.run();
  }

  // Helpers
  private prepareParamsSearch(
    params: DbParams[] | null | undefined
  ): Parameters {
    if (params === null || params === undefined) {
      return {
        restriction: "",
        values: [],
      };
    }

    const fieldRestrictions: string[] = [];
    const values: any[] = [];
    params.forEach(function (item) {
      fieldRestrictions.push(`${item.field} = ?`);
      values.push(item.value);
    });

    return {
      restriction: `WHERE ${fieldRestrictions.join(" AND ")}`,
      values: values,
    };
  }

  private adjustFieldsExpression(fields: string[] | undefined | null): string {
    if (fields === undefined || fields === null) {
      return " * ";
    } else if (fields.length === 0) {
      return " * ";
    } else {
      return fields.join(", ");
    }
  }
}
