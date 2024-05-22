import { Entity } from "../../../commons/entity";

interface PetProps {
  name: string
  birthday: Date
}

export class Pet extends Entity<PetProps>{
  static create(props: PetProps, id?: string) {
    const client = new Pet(props, id);

    return client;
  }

  get name() {
    return this.props.name;
  }

  get birthday() {
    return this.props.birthday;
  }
}