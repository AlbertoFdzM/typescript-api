import { Entity } from '../../../common/models/Entity';

export class ClientApp extends Entity {
  constructor (
    id: number,
    uuid: string,
    public readonly name: string,
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
