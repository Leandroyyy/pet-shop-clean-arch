import { Entity } from "@/domain/commons/entity";
import { Optional } from "@/domain/commons/optional";

export interface NotificationProps {
  recipientEmail: string;
  title: string;
  content: string;
  readAt?: Date;
  createdAt: Date;
}

export class Notification extends Entity<NotificationProps> {
  static create(props: Optional<NotificationProps, "createdAt">, id?: string) {
    const notification = new Notification(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return notification;
  }

  get recipientEmail() {
    return this.props.recipientEmail;
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
}
