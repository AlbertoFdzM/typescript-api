import { injectable, inject } from 'inversify';

import { ReqHandler } from '../../common/modules/ReqHandler';
import { UserApi } from '../models/api/UserApi';
import { Request } from '../../common/models/Request';
import { ADAPTER_TYPES } from '../../dependency-injection/types/ADAPTER_TYPES';
import { Adapter } from '../../common/modules/Adapter';
import { UserCreationQuery } from '../models/domain/UserCreationQuery';
import { INTERACTOR_TYPES } from '../../dependency-injection/types/INTERACTOR_TYPES';
import { Interactor } from '../../common/modules/Interactor';
import { User } from '../models/domain/User';

@injectable()
export class PostUsersReqHandler implements ReqHandler<UserApi> {

  constructor (
    @inject(ADAPTER_TYPES.POST_USERS_REQUEST_TO_USER_CREATION_QUERY)
    private readonly postUsersRequestToUserCreationQueryAdapter: Adapter<Request, UserCreationQuery>,
    @inject(INTERACTOR_TYPES.CREATE_USER)
    private readonly createUserInteractor: Interactor<UserCreationQuery, User>,
    @inject(ADAPTER_TYPES.USER_TO_USER_API)
    private readonly userToUserApiAdapter: Adapter<User, UserApi>,
  ) {}

  public async handle(req: Request): Promise<UserApi> {
    const creationQuery: UserCreationQuery = await this.postUsersRequestToUserCreationQueryAdapter.adapt(req);

    const user: User = await this.createUserInteractor.interact(creationQuery);

    const userApi: UserApi = await this.userToUserApiAdapter.adapt(user);

    return userApi;
  }
}
