import { injectable } from 'inversify';
import { InsertQueryBuilder, createQueryBuilder } from 'typeorm';

import { Adapter } from '../../common/modules/Adapter';
import { UserCreationQuery } from '../models/domain/UserCreationQuery';
import { UserDb } from '../models/db/UserDb';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@injectable()
export class UserCreationQueryToInsertQueryBuilderAdapter implements Adapter<UserCreationQuery, InsertQueryBuilder<UserDb>> {
  public async adapt (query: UserCreationQuery): Promise<InsertQueryBuilder<UserDb>> {
    const values: QueryDeepPartialEntity<UserDb> = new UserDb();

    values.username = query.username;
    values.email = query.email;

    const queryBuilder: InsertQueryBuilder<UserDb> = createQueryBuilder(UserDb)
      .insert()
      .values(values);

    return queryBuilder;
  }
}
