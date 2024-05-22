import { Client } from "../../enterprise/entities/client";

export interface ClientRepository {
  save(client: Client): Promise<void>;
  findByDocument(document: string): Promise<Client | null>;
}
