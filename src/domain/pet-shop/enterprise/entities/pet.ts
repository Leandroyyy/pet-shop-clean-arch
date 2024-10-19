import { Entity } from "../../../commons/entity";
import { PetType } from "./pet-type";

interface PetProps {
  name: string;
  birthday: Date;
  breed: string;
  gender: "male" | "female";
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

  get breed() {
    return this.props.breed;
  }

  get gender() {
    return this.props.gender;
  }

  get type() {
    return this.props.type;
  }
}
