import { Pet } from "@/domain/pet-shop/enterprise/entities/pet";

export class PetPresenter {
  static toJSON(pet: Pet) {
    return {
      id: pet.id,
      name: pet.name,
      birthday: pet.birthday.toISOString().split("T")[0],
      breed: pet.breed,
      gender: pet.gender,
      type: pet.type,
    };
  }
}
