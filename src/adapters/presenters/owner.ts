import { Owner } from "@/domain/pet-shop/enterprise/entities/owner";

export class OwnerPresenter {

  static toJSON(owner: Owner) {
    return {
      id: owner.id,
      name: owner.name,
      document: owner.document,
      birthday: owner.birthday,
      email: owner.email,
      petsIds: owner.pets?.map((data) => {
        return { id: data.id };
      }),
    };
  }

}
