import { injectable } from 'inversify';

import { Adapter } from '../../common/modules/Adapter';
import { UserApiCreationQuery } from '../models/api/UserApiCreationQuery';
import { UserCreationQuery } from '../models/domain/UserCreationQuery';

@injectable()
export class UserApiCreationQueryToUserCreationQueryAdapter implements Adapter<UserApiCreationQuery, UserCreationQuery> {
  public async adapt(userApiCreationQuery: UserApiCreationQuery): Promise<UserCreationQuery> {
    return new UserCreationQuery(
      userApiCreationQuery.username,
      userApiCreationQuery.email
    );
  }
}
