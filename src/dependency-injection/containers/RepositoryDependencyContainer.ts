import { ContainerModule, interfaces } from 'inversify';

import { REPOSITORY_TYPES } from '../types/REPOSITORY_TYPES';
import { UserRepository } from '../../user/UserRepository';

export const repositoryDependencyContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind(REPOSITORY_TYPES.USER).to(UserRepository);
  }
);
