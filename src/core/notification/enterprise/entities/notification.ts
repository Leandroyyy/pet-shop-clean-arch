import { Entity } from "../../../commons/entity";

export interface NotificationProps {
  recipientId: string;
  title: string;
  content: string;
  readAt?: Date;
  createdAt?: Date;
}

export class Notification extends Entity<NotificationProps> {
  static create(props: NotificationProps, id?: string) {
    const notification = new Notification(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return notification;
  }

  get recipientId() {
    return this.props.recipientId;
  }

  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get readAt() {
    return this.props.readAt;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  read() {
    this.props.readAt = new Date();
  }
}
