import { Authorization } from './Authorization';
import { AuthorizationType } from './AuthorizationType';

export class UserAuthorization extends Authorization {
  constructor (
    id: number,
    uuid: string,
    public readonly clientAppUuid: string,
    public readonly userUuid: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null = null
  ) {
    super(
      id,
      uuid,
      AuthorizationType.user,
      createdAt,
      updatedAt,
      deletedAt
    );
  }
}
