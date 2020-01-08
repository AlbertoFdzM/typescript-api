import { injectable, inject } from 'inversify';
import express from 'express';
import HttpStatusCode from 'http-status-codes';

import { Router } from '../../common/modules/Router';
import { Request } from '../../common/models/Request';
import { UserApi } from '../../user/models/api/UserApi';
import { ReqHandler } from '../../common/modules/ReqHandler';
import { REQ_HANDLER_TYPES } from '../../dependency-injection/types/REQ_HANDLER_TYPES';

@injectable()
export class UsersRouter extends Router {
  constructor(
    @inject(REQ_HANDLER_TYPES.POST_USERS)
    private readonly postUsersReqHandler: ReqHandler<UserApi>
  ) {
    super();

    this.init();
  }

  protected init(): void {
    this.router.route('/').post(this.post.bind(this));
  }

  private async post(
    req: Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const userApi: UserApi = await this.postUsersReqHandler.handle(req);

      res.status(HttpStatusCode.CREATED);
      res.json(userApi);
    } catch (err) {
      next(err);
    }
  }
}
