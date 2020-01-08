import { ContainerModule, interfaces } from 'inversify';

import { ADAPTER_TYPES } from '../types/ADAPTER_TYPES';
import { UserToUserApiAdapter } from '../../user/adapters/UserToUserApiAdapter';
import { DateToUnixTimeAdapter } from '../../common/modules/DateToUnixTimeAdapter';
import { PostUsersRequestToUserCreationQueryAdapter } from '../../user/adapters/PostUsersRequestToUserCreationQueryAdapter';
import { UserApiCreationQueryToUserCreationQueryAdapter } from '../../user/adapters/UserApiCreationQueryToUserCreationQueryAdapter';
import { UserFindQueryToSelectQueryBuilderAdapter } from '../../user/adapters/UserFindQueryToSelectQueryBuilderAdapter';
import { UserDbToUserAdapter } from '../../user/adapters/UserDbToUserAdapter';
import { UserCreationQueryToInsertQueryBuilderAdapter } from '../../user/adapters/UserCreationQueryToInsertQueryBuilderAdapter';
import { UserUpdateQueryToUpdateQueryBuilderAdapter } from '../../user/adapters/UserUpdateQueryToUpdateQueryBuilderAdapter';

export const adapterDependencyContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind(ADAPTER_TYPES.DATE_TO_UNIX_TIME).to(DateToUnixTimeAdapter);
    bind(ADAPTER_TYPES.POST_USERS_REQUEST_TO_USER_CREATION_QUERY).to(
      PostUsersRequestToUserCreationQueryAdapter
    );
    bind(ADAPTER_TYPES.USER_API_CREATION_QUERY_TO_USER_CREATION_QUERY).to(
      UserApiCreationQueryToUserCreationQueryAdapter
    );
    bind(ADAPTER_TYPES.USER_CREATION_QUERY_TO_INSERT_QUERY_BUILDER).to(UserCreationQueryToInsertQueryBuilderAdapter);
    bind(ADAPTER_TYPES.USER_DB_TO_USER).to(UserDbToUserAdapter);
    bind(ADAPTER_TYPES.USER_FIND_QUERY_TO_SELECT_QUERY_BUILDER).to(
      UserFindQueryToSelectQueryBuilderAdapter
    );
    bind(ADAPTER_TYPES.USER_UPDATE_QUERY_TO_UPDATE_QUERY_BUILDER).to(UserUpdateQueryToUpdateQueryBuilderAdapter);
    bind(ADAPTER_TYPES.USER_TO_USER_API).to(UserToUserApiAdapter);
  }
);
