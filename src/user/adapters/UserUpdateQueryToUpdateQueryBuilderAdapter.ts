import { injectable } from 'inversify';
import { UpdateQueryBuilder, createQueryBuilder } from 'typeorm';

import { Adapter } from '../../common/modules/Adapter';
import { UserUpdateQuery } from '../models/domain/UserUpdateQuery';
import { UserDb } from '../models/db/UserDb';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@injectable()
export class UserUpdateQueryToUpdateQueryBuilderAdapter
  implements Adapter<UserUpdateQuery, UpdateQueryBuilder<UserDb>> {
  public async adapt(
    query: UserUpdateQuery
  ): Promise<UpdateQueryBuilder<UserDb>> {
    const values: QueryDeepPartialEntity<UserDb> = {};

    if ('username' in query.values) values.username = query.values.username;
    if ('email' in query.values) values.email = query.values.email;

    const queryBuilder: UpdateQueryBuilder<UserDb> = createQueryBuilder(UserDb)
      .update()
      .set(values)
      .setParameter('id', query.entity.id)
      .where(`${UserDb.name}.id = :id`);

    return queryBuilder;
  }
}
