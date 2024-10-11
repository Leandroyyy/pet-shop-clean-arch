import { Owner } from "../../enterprise/entities/owner";

export interface OwnerRepository {
  save(owner: Owner): Promise<void>;
  findByDocument(document: string): Promise<Owner | null>;
  findyById(id: string): Promise<Owner | null>;
  edit(owner: Owner): Promise<void>;
}
