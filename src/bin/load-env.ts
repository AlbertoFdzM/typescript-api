#!/usr/bin/env node
import 'reflect-metadata';

import { mainDependencyContainer } from '../dependency-injection/containers/MainDependencyContainer';
import { EnvDatasource } from '../datasources/EnvDatasource';
import { DATASOURCE_TYPES } from '../dependency-injection/types/DATASOURCE_TYPES';

const envDatasource: EnvDatasource = mainDependencyContainer.get(DATASOURCE_TYPES.ENV);

envDatasource.populateEnv();
