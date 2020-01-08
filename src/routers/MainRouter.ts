import { injectable, inject } from 'inversify';

import { Router } from '../common/modules/Router';
import { ROUTER_TYPES } from '../dependency-injection/types/ROUTER_TYPES';

@injectable()
export class MainRouter extends Router {
  constructor (
    @inject(ROUTER_TYPES.USERS)
    private readonly usersRouter: Router
  ) {
    super();

    this.init();
  }

  protected init(): void {
    this.router.use('/users', this.usersRouter.middleware);
  }
}
