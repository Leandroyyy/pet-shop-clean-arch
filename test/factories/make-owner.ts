import { Owner, OwnerProps } from "@/domain/pet-shop/enterprise/entities/owner";

export function makeOwner(override: Partial<OwnerProps> = {}, id?: string) {
  const owner = Owner.create(
    {
      birthday: new Date("20-02-2003"),
      document: "123132213",
      email: "john@due.com",
      name: "john due",
      ...override,
    },
    id
  );

  return owner;
}
