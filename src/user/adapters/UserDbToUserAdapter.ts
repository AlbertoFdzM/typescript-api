import { injectable } from 'inversify';

import { Adapter } from '../../common/modules/Adapter';
import { UserDb } from '../models/db/UserDb';
import { User } from '../models/domain/User';

@injectable()
export class UserDbToUserAdapter implements Adapter<UserDb, User> {
  public async adapt(userDb: UserDb): Promise<User> {
    if (userDb.id == null) throw new Error('No UserDb.id property');
    if (userDb.uuid == null) throw new Error('No UserDb.uuid property');
    if (userDb.username == null) throw new Error('No UserDb.username property');
    if (userDb.email == null) throw new Error('No UserDb.email property');
    if (userDb.created_at == null) throw new Error('No UserDb.created_at property');
    if (userDb.updated_at == null) throw new Error('No UserDb.updated_at property');

    const user: User = new User(
      userDb.id,
      userDb.uuid,
      userDb.username,
      userDb.email,
      userDb.created_at,
      userDb.updated_at,
      userDb.deleted_at
    );

    return user;
  }

}
