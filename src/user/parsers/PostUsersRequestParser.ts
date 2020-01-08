import { injectable } from 'inversify';

import { Parser } from '../../common/modules/Parser';
import { Request } from '../../common/models/Request';
import { UserApiCreationQuery } from '../models/api/UserApiCreationQuery';

@injectable()
export class PostUsersRequestParser
  implements Parser<Request, UserApiCreationQuery> {
  public parse(req: Request): UserApiCreationQuery {
    return new UserApiCreationQuery(req.body.username, req.body.email);
  }
}
