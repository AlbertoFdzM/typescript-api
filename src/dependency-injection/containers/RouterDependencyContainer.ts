import { ContainerModule, interfaces } from 'inversify';

import { ROUTER_TYPES } from '../types/ROUTER_TYPES';
import { MainRouter } from '../../routers/MainRouter';
import { UsersRouter } from '../../routers/users/UsersRouter';

export const routerDependencyContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind(ROUTER_TYPES.MAIN).to(MainRouter);
    bind(ROUTER_TYPES.USERS).to(UsersRouter);
  }
);
