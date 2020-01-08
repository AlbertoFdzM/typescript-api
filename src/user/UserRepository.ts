import { injectable, inject } from 'inversify';

import { WritingRepository } from '../common/modules/WritingRepository';
import { User } from './models/domain/User';
import { UserDb } from './models/db/UserDb';
import { UserCreationQuery } from './models/domain/UserCreationQuery';
import { UserUpdateQueryValues } from './models/domain/UserUpdateQueryValues';
import { DATASOURCE_TYPES } from '../dependency-injection/types/DATASOURCE_TYPES';
import { DbDatasource } from '../datasources/DbDatasource';
import { Adapter } from '../common/modules/Adapter';
import {
  SelectQueryBuilder,
  InsertQueryBuilder,
  UpdateQueryBuilder
} from 'typeorm';
import { UserFindQuery } from './models/domain/UserFindQuery';
import { UserUpdateQuery } from './models/domain/UserUpdateQuery';
import { ADAPTER_TYPES } from '../dependency-injection/types/ADAPTER_TYPES';

@injectable()
export class UserRepository extends WritingRepository<
  User,
  UserDb,
  UserCreationQuery,
  UserUpdateQueryValues
> {
  constructor(
    @inject(DATASOURCE_TYPES.DB)
    dbDatasource: DbDatasource,
    @inject(ADAPTER_TYPES.USER_FIND_QUERY_TO_SELECT_QUERY_BUILDER)
    userFindQueryToSelectQueryBuilderAdapter: Adapter<
      UserFindQuery,
      SelectQueryBuilder<UserDb>
    >,
    @inject(ADAPTER_TYPES.USER_DB_TO_USER)
    userDbToUserAdapter: Adapter<UserDb, User>,
    @inject(ADAPTER_TYPES.USER_CREATION_QUERY_TO_INSERT_QUERY_BUILDER)
    userCreationQueryToInsertQueryBuilderAdapter: Adapter<
      UserCreationQuery,
      InsertQueryBuilder<UserDb>
    >,
    @inject(ADAPTER_TYPES.USER_UPDATE_QUERY_TO_UPDATE_QUERY_BUILDER)
    userUpdateQueryToUpdateQueryBuilderAdapter: Adapter<
      UserUpdateQuery,
      UpdateQueryBuilder<UserDb>
    >
  ) {
    super(
      dbDatasource,
      UserDb,
      userFindQueryToSelectQueryBuilderAdapter,
      userDbToUserAdapter,
      userCreationQueryToInsertQueryBuilderAdapter,
      userUpdateQueryToUpdateQueryBuilderAdapter
    );
  }
}
