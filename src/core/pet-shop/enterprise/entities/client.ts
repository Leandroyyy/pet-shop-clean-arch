import { Entity } from "../../../commons/entity";
import { Pet } from "./pet";

interface ClientProps {
  name: string;
  document: string;
  birthday: Date;
  email: string;
  pets?: Pet[];
}

export class Client extends Entity<ClientProps> {
  static create(props: ClientProps, id?: string) {
    const client = new Client({ ...props, pets: props.pets ?? [] }, id);

    return client;
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
}
