import { Entity } from '../../../common/models/Entity';

export class User extends Entity {
  constructor (
    id: number,
    uuid: string,
    public readonly username: string,
    public readonly email: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null = null
  ) {
    super(
      id,
      uuid,
      createdAt,
      updatedAt,
      deletedAt
    );
  }
}
