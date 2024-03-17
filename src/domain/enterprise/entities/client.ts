import { randomUUID } from "node:crypto";

export class Client {
  id?: string;
  name: string;
  document: string;
  birthday: Date;
  email: string;

  constructor(input: Client) {
    this.id = input.id ?? randomUUID();

    Object.assign(this, input);
  }
}
