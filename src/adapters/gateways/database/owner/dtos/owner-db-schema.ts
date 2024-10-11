export interface OwnerDbSchema {
  id: string;
  name: string;
  document: string;
  birthday: Date;
  email: string;
  petIds?: string[]
}
