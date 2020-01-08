import { ContainerModule, interfaces } from 'inversify';

import { INTERACTOR_TYPES } from '../types/INTERACTOR_TYPES';
import { CreateUserInteractor } from '../../user/interactors/CreateUserInteractor';

export const interactorDependencyContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind(INTERACTOR_TYPES.CREATE_USER).to(CreateUserInteractor);
  }
);
