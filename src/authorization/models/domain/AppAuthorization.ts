import { Authorization } from './Authorization';
import { AuthorizationType } from './AuthorizationType';

export class AppAuthorization extends Authorization {
  constructor (
    id: number,
    uuid: string,
    public readonly clientAppUuid: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null = null
  ) {
    super(
      id,
      uuid,
      AuthorizationType.app,
      createdAt,
      updatedAt,
      deletedAt
    );
  }
}
