import { ContainerModule, interfaces } from 'inversify';

import { CONFIG_TYPES } from '../types/CONFIG_TYPES';
import { DbConfig } from '../../config/DbConfig';

export const configDependencyContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind(CONFIG_TYPES.DB).to(DbConfig);
  }
);
