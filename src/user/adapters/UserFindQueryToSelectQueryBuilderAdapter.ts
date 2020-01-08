import { injectable } from 'inversify';
import { SelectQueryBuilder } from 'typeorm';

import { Adapter } from '../../common/modules/Adapter';
import { UserFindQuery } from '../models/domain/UserFindQuery';
import { UserDb } from '../models/db/UserDb';
import { EntityFindQuery } from '../../common/models/EntityFindQuery';
import { EntityFindQueryToSelectQueryBuilder } from '../../common/adapters/EntityFindQueryToSelectQueryBuilder';

@injectable()
export class UserFindQueryToSelectQueryBuilderAdapter
  implements Adapter<UserFindQuery, SelectQueryBuilder<UserDb>> {

  private readonly entityFindQueryToSelectQueryBuilderAdapter: Adapter<EntityFindQuery, SelectQueryBuilder<UserDb>>;

  constructor () {
    this.entityFindQueryToSelectQueryBuilderAdapter = new EntityFindQueryToSelectQueryBuilder(UserDb);
  }

  public async adapt(
    userFindQuery: UserFindQuery
  ): Promise<SelectQueryBuilder<UserDb>> {
    const selectQueryBuilder: SelectQueryBuilder<UserDb> = await this.entityFindQueryToSelectQueryBuilderAdapter.adapt(userFindQuery);

    return selectQueryBuilder;
  }
}
