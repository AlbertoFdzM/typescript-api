import { Container } from 'inversify';

import { configDependencyContainer } from './ConfigDependencyContainer';
import { datasourceDependencyContainer } from './DatasourceDependencyContainer';
import { repositoryDependencyContainer } from './RepositoryDependencyContainer';
import { interactorDependencyContainer } from './InteractorDependencyContainer';
import { parserDependencyContainer } from './ParserDependencyContainer';
import { adapterDependencyContainer } from './AdapterDependencyContainer';
import { reqHandlerDependencyContainer } from './ReqHandlerDependencyContainer';
import { routerDependencyContainer } from './RouterDependencyContainer';
import { GENERAL_TYPES } from '../types/GENERAL_TYPES';
import { App } from '../../App';

export const mainDependencyContainer: Container = new Container();

mainDependencyContainer.load(configDependencyContainer)
mainDependencyContainer.load(datasourceDependencyContainer);
mainDependencyContainer.load(repositoryDependencyContainer);
mainDependencyContainer.load(interactorDependencyContainer);
mainDependencyContainer.load(parserDependencyContainer);
mainDependencyContainer.load(adapterDependencyContainer);
mainDependencyContainer.load(reqHandlerDependencyContainer);
mainDependencyContainer.load(routerDependencyContainer);
mainDependencyContainer.bind(GENERAL_TYPES.APP).to(App);
