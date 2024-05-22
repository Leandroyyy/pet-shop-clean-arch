import { Pet } from "../../enterprise/entities/pet";

export interface PetRepository {
  findById(id: string): Promise<Pet>;
}