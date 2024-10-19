import { Entity } from "../../../commons/entity";
import { Pet } from "./pet";

interface OwnerProps {
  name: string;
  document: string;
  birthday: Date;
  email: string;
  pets?: Pet[];
}

export class Owner extends Entity<OwnerProps> {
  static create(props: OwnerProps, id?: string) {
    const owner = new Owner({ ...props, pets: props.pets ?? [] }, id);

    return owner;
  }

  get name() {
    return this.props.name;
  }

  get document() {
    return this.props.document;
  }

  get birthday() {
    return this.props.birthday;
  }

  get email() {
    return this.props.email;
  }

  get pets() {
    return this.props.pets
  }

  registerPet(pet: Pet) {
    this.props.pets!.push(pet);
  }
}
