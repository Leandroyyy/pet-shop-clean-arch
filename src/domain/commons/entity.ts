import { randomUUID } from "node:crypto";

export class Entity<T> {
  private _id: string;
  protected props: T;

  get id() {
    return this._id;
  }

  protected constructor(props: T, id?: string) {
    this.props = props;
    this._id = id ?? randomUUID();
  }

  equals(entity: Entity<any>) {
    if (entity === this) return true;

    if (entity.id === this._id) return true;

    return false;
  }
}
