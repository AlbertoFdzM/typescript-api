import { injectable, inject } from 'inversify';

import { Adapter } from '../../common/modules/Adapter';
import { Request } from '../../common/models/Request';
import { UserCreationQuery } from '../models/domain/UserCreationQuery';
import { PARSER_TYPES } from '../../dependency-injection/types/PARSER_TYPES';
import { UserApiCreationQuery } from '../models/api/UserApiCreationQuery';
import { Parser } from '../../common/modules/Parser';
import { ADAPTER_TYPES } from '../../dependency-injection/types/ADAPTER_TYPES';

@injectable()
export class PostUsersRequestToUserCreationQueryAdapter
  implements Adapter<Request, UserCreationQuery> {
  constructor(
    @inject(PARSER_TYPES.POST_USERS_REQUEST)
    private readonly postUsersRequestParser: Parser<
      Request,
      UserApiCreationQuery
    >,
    @inject(ADAPTER_TYPES.USER_API_CREATION_QUERY_TO_USER_CREATION_QUERY)
    private readonly userApiCreationQueryToUserCreationQueryAdapter: Adapter<
      UserApiCreationQuery,
      UserCreationQuery
    >
  ) {}

  public async adapt(req: Request): Promise<UserCreationQuery> {
    const userApiCreationQuery: UserApiCreationQuery = this.postUsersRequestParser.parse(
      req
    );
    const userCreationQuery: UserCreationQuery = await this.userApiCreationQueryToUserCreationQueryAdapter.adapt(
      userApiCreationQuery
    );

    return userCreationQuery;
  }
}
