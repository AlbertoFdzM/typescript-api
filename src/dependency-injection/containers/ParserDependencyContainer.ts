import { ContainerModule, interfaces } from 'inversify';

import { PARSER_TYPES } from '../types/PARSER_TYPES';
import { PostUsersRequestParser } from '../../user/parsers/PostUsersRequestParser';

export const parserDependencyContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind(PARSER_TYPES.POST_USERS_REQUEST).to(PostUsersRequestParser)
  }
);
