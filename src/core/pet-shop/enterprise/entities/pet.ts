import { Entity } from "../../../commons/entity";
import { PetType } from "./pet-type";

interface PetProps {
  name: string;
  birthday: Date;
  species: string;
  breed: string;
  gender: string;
  type: PetType;
}

export class Pet extends Entity<PetProps> {
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
