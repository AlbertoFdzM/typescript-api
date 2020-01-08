import { injectable, unmanaged } from 'inversify';
import {
  DeleteQueryBuilder,
  UpdateResult,
  UpdateQueryBuilder,
  InsertQueryBuilder,
  InsertResult,
  ObjectLiteral,
  SelectQueryBuilder
} from 'typeorm';

import { Entity } from '../models/Entity';
import { ReadingRepository } from './ReadingRepository';
import { DeletionRepository } from './DeletionRepository';
import { EntityDeletionQuery } from '../models/EntityDeletionQuery';
import { DeletionType } from '../models/DeletionType';
import { EntityDb } from '../models/EntityDb';
import { EntityFindQuery } from '../models/EntityFindQuery';
import { UpdateRepository } from './UpdateRepository';
import { EntityUpdateQuery } from '../models/EntityUpdateQuery';
import { Adapter } from './Adapter';
import { CreationRepository } from './CreationRepository';
import { DbDatasource } from '../../datasources/DbDatasource';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@injectable()
export abstract class WritingRepository<
  TEntity extends Entity,
  TEntityDb extends EntityDb,
  TCreationQuery,
  TUpdateQueryValues
> extends ReadingRepository<TEntity, TEntityDb>
  implements
    CreationRepository<TEntity, TCreationQuery>,
    UpdateRepository<TEntity, TUpdateQueryValues>,
    DeletionRepository<TEntity> {
  constructor(
    dbDataSource: DbDatasource,
    @unmanaged()
    EntityDbConstructor: new () => TEntityDb,
    findQueryToSelectQueryBuilderAdapter: Adapter<
      EntityFindQuery,
      SelectQueryBuilder<TEntityDb>
    >,
    entityDbToEntityAdapter: Adapter<TEntityDb, TEntity>,
    protected readonly creationQueryToInsertQueryBuilderAdapter: Adapter<
      TCreationQuery,
      InsertQueryBuilder<TEntityDb>
    >,
    protected readonly updateQueryToUpdateQueryBuilderAdapter: Adapter<
      EntityUpdateQuery<TEntity, TUpdateQueryValues>,
      UpdateQueryBuilder<TEntityDb>
    >
  ) {
    super(
      dbDataSource,
      EntityDbConstructor,
      findQueryToSelectQueryBuilderAdapter,
      entityDbToEntityAdapter
    );
  }

  public async create(creationQuery: TCreationQuery): Promise<TEntity> {
    const insertQueryBuilder: InsertQueryBuilder<TEntityDb> = await this.creationQueryToInsertQueryBuilderAdapter.adapt(
      creationQuery
    );
    const result: InsertResult = await insertQueryBuilder.execute();
    const generatedMap:
      | ObjectLiteral
      | undefined = result.generatedMaps.shift();

    if (generatedMap !== undefined && 'id' in generatedMap) {
      return this.findByIdOrFail(generatedMap.id);
    } else {
      throw new Error('Created EntityDb not received in InsertResult');
    }
  }

  public async update(
    updateQuery: EntityUpdateQuery<TEntity, TUpdateQueryValues>
  ): Promise<TEntity> {
    const updateQueryBuilder: UpdateQueryBuilder<TEntityDb> = await this.updateQueryToUpdateQueryBuilderAdapter.adapt(
      updateQuery
    );

    const result: UpdateResult = await updateQueryBuilder.execute();
    const generatedMap:
      | ObjectLiteral
      | undefined = result.generatedMaps.shift();

    if (generatedMap !== undefined && 'id' in generatedMap) {
      return this.findByIdOrFail(generatedMap.id);
    } else {
      throw new Error('Updated EntityDb not received in UpdateResult');
    }
  }

  public async delete(
    deletionQuery: EntityDeletionQuery<TEntity>
  ): Promise<TEntity | null> {
    let entity: TEntity | null;

    switch (deletionQuery.type) {
      case DeletionType.hard:
        entity = await this.hardDelete(deletionQuery);
        break;
      case DeletionType.logic:
        entity = await this.logicDelete(deletionQuery);
        break;
      default:
        throw new Error('DeletionType not supported');
    }

    return entity;
  }

  protected async findByIdOrFail(id: number): Promise<TEntity> {
    const entityDb: TEntityDb | undefined = await this.dbRepo
      .createQueryBuilder()
      .setParameter('id', id)
      .where(`${this.EntityDb.name}.id = :id`)
      .getOne();

    if (entityDb === undefined) {
      throw new Error('Created EntityDb not found in DB');
    }

    const entity: TEntity = await this.entityDbToEntityAdapter.adapt(entityDb);

    return entity;
  }

  private async hardDelete(
    deletionQuery: EntityDeletionQuery<TEntity>
  ): Promise<null> {
    const deletionQueryBuilder: DeleteQueryBuilder<TEntityDb> = this.dbRepo
      .createQueryBuilder()
      .delete()
      .setParameter('id', deletionQuery.entity.id)
      .where(`${this.EntityDb.name}.id = :id`);

    await deletionQueryBuilder.execute();

    return null;
  }

  private async logicDelete(
    deletionQuery: EntityDeletionQuery<TEntity>
  ): Promise<TEntity> {
    const values: TEntityDb = new this.EntityDb();

    values.deleted_at = new Date();

    const updateQueryBuilder: UpdateQueryBuilder<TEntityDb> = this.dbRepo
      .createQueryBuilder()
      .update()
      // HACK: solves https://github.com/typeorm/typeorm/issues/2904
      .set(values as QueryDeepPartialEntity<TEntityDb>)
      .setParameter('id', deletionQuery.entity.id)
      .where(`${this.EntityDb.name}.id = :id`);

    const result: UpdateResult = await updateQueryBuilder.execute();
    const generatedMap:
      | ObjectLiteral
      | undefined = result.generatedMaps.shift();

    if (generatedMap !== undefined && 'id' in generatedMap) {
      return this.findByIdOrFail(generatedMap.id);
    } else {
      throw new Error('Deleted EntityDb not received in UpdateResult');
    }
  }
}
