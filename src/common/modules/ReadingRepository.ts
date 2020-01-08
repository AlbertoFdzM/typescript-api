import { injectable } from 'inversify';
import { SelectQueryBuilder, Repository } from 'typeorm';

import { FindingRepository } from './FindingRepository';
import { FindingOneRepository } from './FindingOneRepository';
import { EntityFindQuery } from '../models/EntityFindQuery';
import { EntityList } from '../models/EntityList';
import { DbDatasource } from '../../datasources/DbDatasource';
import { Adapter } from './Adapter';
import { Entity } from '../models/Entity';

@injectable()
export abstract class ReadingRepository<TEntity extends Entity, TEntityDb>
  implements FindingRepository<TEntity>, FindingOneRepository<TEntity> {
  protected get dbRepo(): Repository<TEntityDb> {
    return this.dbDataSource.getRepository(this.EntityDb);
  }

  constructor(
    protected readonly dbDataSource: DbDatasource,
    protected readonly EntityDb: new () => TEntityDb,
    protected readonly findQueryToSelectQueryBuilderAdapter: Adapter<
      EntityFindQuery,
      SelectQueryBuilder<TEntityDb>
    >,
    protected readonly entityDbToEntityAdapter: Adapter<TEntityDb, TEntity>
  ) {}

  public async find(findQuery: EntityFindQuery): Promise<EntityList<TEntity>> {
    const queryBuilder: SelectQueryBuilder<TEntityDb> = await this.findQueryToSelectQueryBuilderAdapter.adapt(
      findQuery
    );

    const [entitiesDb, count]: [
      TEntityDb[],
      number
    ] = await queryBuilder.getManyAndCount();

    const entities: TEntity[] = await Promise.all(
      entitiesDb.map(
        async (entityDb: TEntityDb): Promise<TEntity> => {
          return this.entityDbToEntityAdapter.adapt(entityDb);
        }
      )
    );

    const entityList: EntityList<TEntity> = new EntityList(
      entities,
      findQuery.pagination.offset,
      findQuery.pagination.limit,
      count
    );

    return entityList;
  }

  public async findOne(findQuery: EntityFindQuery): Promise<TEntity> {
    const queryBuilder: SelectQueryBuilder<TEntityDb> = await this.findQueryToSelectQueryBuilderAdapter.adapt(
      findQuery
    );

    const entityDb: TEntityDb | undefined = await queryBuilder.getOne();

    if (!(entityDb instanceof this.EntityDb)) {
      throw new Error('Entity not found');
    }

    const entity: TEntity = await this.entityDbToEntityAdapter.adapt(entityDb);

    return entity;
  }
}
