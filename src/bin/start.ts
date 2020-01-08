#!/usr/bin/env node
import 'reflect-metadata';

import { App } from '../App';
import { mainDependencyContainer } from '../dependency-injection/containers/MainDependencyContainer';
import { GENERAL_TYPES } from '../dependency-injection/types/GENERAL_TYPES';

const app: App = mainDependencyContainer.get(GENERAL_TYPES.APP);

app.start();
