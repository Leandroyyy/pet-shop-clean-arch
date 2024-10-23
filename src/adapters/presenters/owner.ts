import { Owner } from "@/domain/pet-shop/enterprise/entities/owner";

export class OwnerPresenter {
  static toJSON(owner: Owner) {
    return {
      id: owner.id,
      name: owner.name,
      document: owner.document,
      birthday: owner.birthday.toISOString().split("T")[0],
      email: owner.email,
    };
  }
}
