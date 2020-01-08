import { Entity } from '../../../common/models/Entity';
import { AuthorizationType } from './AuthorizationType';

export class Authorization extends Entity {
  constructor(
    id: number,
    uuid: string,
    public readonly type: AuthorizationType,
    public readonly clientAppUuid: string,
    public readonly userUuid: string | null = null,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null = null
  ) {
    super(id, uuid, createdAt, updatedAt, deletedAt);
  }
}
