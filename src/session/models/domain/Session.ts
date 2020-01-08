import { ClientApp } from '../../../app/models/domain/ClientApp';
import { User } from '../../../user/models/domain/User';
import { Authorization } from '../../../authorization/models/domain/Authorization';
import { JsonWebToken } from '../../../common/models/JsonWebToken';

export class Session {
  constructor (
    public readonly token: JsonWebToken,
    public readonly authorization: Authorization,
    public readonly clientApp: ClientApp,
    public readonly user: User | null
  ) {}
}
