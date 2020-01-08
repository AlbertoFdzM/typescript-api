import { ContainerModule, interfaces } from 'inversify';

import { REQ_HANDLER_TYPES } from '../types/REQ_HANDLER_TYPES';
import { PostUsersReqHandler } from '../../user/req-handlers/PostUsersReqHandler';

export const reqHandlerDependencyContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind(REQ_HANDLER_TYPES.POST_USERS).to(PostUsersReqHandler);
  }
);
