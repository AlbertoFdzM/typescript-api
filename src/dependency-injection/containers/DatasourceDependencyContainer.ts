import { ContainerModule, interfaces } from 'inversify';

import { DATASOURCE_TYPES } from '../types/DATASOURCE_TYPES';
import { DbDatasource } from '../../datasources/DbDatasource';
import { EnvDatasource } from '../../datasources/EnvDatasource';

export const datasourceDependencyContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind(DATASOURCE_TYPES.DB).to(DbDatasource);
    bind(DATASOURCE_TYPES.ENV).to(EnvDatasource);
  }
);
