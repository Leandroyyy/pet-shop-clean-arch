import { Pet } from "../../enterprise/entities/pet";

export interface PetRepository {
  save(pet: Pet): Promise<void>;
}
