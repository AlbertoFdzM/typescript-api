import { injectable, inject } from 'inversify';

import { Adapter } from '../../common/modules/Adapter';
import { User } from '../models/domain/User';
import { UserApi } from '../models/api/UserApi';
import { ADAPTER_TYPES } from '../../dependency-injection/types/ADAPTER_TYPES';

@injectable()
export class UserToUserApiAdapter implements Adapter<User, UserApi> {

  constructor (
    @inject(ADAPTER_TYPES.DATE_TO_UNIX_TIME)
    private readonly dateToUnixTimeAdapter: Adapter<Date, number>
  ) {}

  public async adapt(user: User): Promise<UserApi> {
    return new UserApi(
      user.uuid,
      user.username,
      user.email,
      await this.dateToUnixTimeAdapter.adapt(user.createdAt),
      await this.dateToUnixTimeAdapter.adapt(user.updatedAt),
      user.deletedAt !== null ? await this.dateToUnixTimeAdapter.adapt(user.deletedAt) : null
    )
  }
}
