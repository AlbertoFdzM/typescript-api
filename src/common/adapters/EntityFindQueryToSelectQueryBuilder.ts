import { SelectQueryBuilder, createQueryBuilder } from 'typeorm';

import { EntityDb } from '../models/EntityDb';
import { Adapter } from '../modules/Adapter';
import { EntityFindQuery } from '../models/EntityFindQuery';
import { PaginationQuery } from '../models/PaginationQuery';

export class EntityFindQueryToSelectQueryBuilder<TEntityDb extends EntityDb>
  implements Adapter<EntityFindQuery, SelectQueryBuilder<TEntityDb>> {
  constructor(private readonly EntityDbConstructor: new () => TEntityDb) {}

  public async adapt(
    entityFindQuery: EntityFindQuery
  ): Promise<SelectQueryBuilder<TEntityDb>> {
    type TKey = Extract<keyof EntityFindQuery, string>;

    const selectQueryBuilder: SelectQueryBuilder<TEntityDb> = createQueryBuilder(
      this.EntityDbConstructor
    );

    const keys: TKey[] = Object.getOwnPropertyNames(entityFindQuery) as TKey[];

    keys.forEach((key: TKey): void => {
      if (entityFindQuery[key] !== null) {
        switch (key) {
          case 'id':
            this.populateIdInQueryBuilder(
              selectQueryBuilder,
              entityFindQuery[key] as number
            );
            break;
          case 'ids':
            this.populateIdsInQueryBuilder(
              selectQueryBuilder,
              entityFindQuery[key] as number[]
            );
            break;
          case 'isDeleted':
            this.populateIsDeletedInQueryBuilder(
              selectQueryBuilder,
              entityFindQuery[key] as boolean
            );
            break;
          case 'pagination':
            this.populatePaginationInQueryBuilder(
              selectQueryBuilder,
              entityFindQuery[key]
            );
            break;
          case 'uuid':
            this.populateUuidInQueryBuilder(
              selectQueryBuilder,
              entityFindQuery[key] as string
            );
            break;
          case 'uuids':
            this.populateUuidsInQueryBuilder(
              selectQueryBuilder,
              entityFindQuery[key] as string[]
            );
            break;
          default:
            throw new Error(`Unknown key in EntityFindQuery "${key}"`);
        }
      }
    });

    return selectQueryBuilder;
  }

  private populateIdInQueryBuilder(
    selectQueryBuilder: SelectQueryBuilder<TEntityDb>,
    id: number
  ): SelectQueryBuilder<TEntityDb> {
    selectQueryBuilder = selectQueryBuilder
      .setParameter('id', id)
      .andWhere(`${this.EntityDbConstructor.name}.id = :id`);

    return selectQueryBuilder;
  }

  private populateIdsInQueryBuilder(
    selectQueryBuilder: SelectQueryBuilder<TEntityDb>,
    ids: number[]
  ): SelectQueryBuilder<TEntityDb> {
    selectQueryBuilder = selectQueryBuilder
      .setParameter('ids', ids)
      .andWhere(`${this.EntityDbConstructor.name}.id IN (...:ids)`);

    return selectQueryBuilder;
  }

  private populateIsDeletedInQueryBuilder(
    selectQueryBuilder: SelectQueryBuilder<TEntityDb>,
    isDeleted: boolean
  ): SelectQueryBuilder<TEntityDb> {
    selectQueryBuilder = selectQueryBuilder.andWhere(
      `${this.EntityDbConstructor.name}.deleted_at IS ${
        isDeleted === true ? 'NOT NULL' : 'NULL'
      }`
    );

    return selectQueryBuilder;
  }

  private populatePaginationInQueryBuilder(
    selectQueryBuilder: SelectQueryBuilder<TEntityDb>,
    paginationQuery: PaginationQuery
  ): SelectQueryBuilder<TEntityDb> {
    selectQueryBuilder = selectQueryBuilder
      .skip(paginationQuery.offset)
      .take(paginationQuery.limit);

    return selectQueryBuilder;
  }

  private populateUuidInQueryBuilder(
    selectQueryBuilder: SelectQueryBuilder<TEntityDb>,
    uuid: string
  ): SelectQueryBuilder<TEntityDb> {
    selectQueryBuilder = selectQueryBuilder
      .setParameter('uuid', uuid)
      .andWhere(`${this.EntityDbConstructor.name}.uuid = :uuid`);

    return selectQueryBuilder;
  }

  private populateUuidsInQueryBuilder(
    selectQueryBuilder: SelectQueryBuilder<TEntityDb>,
    uuids: string[]
  ): SelectQueryBuilder<TEntityDb> {
    selectQueryBuilder = selectQueryBuilder
      .setParameter('uuids', uuids)
      .andWhere(`${this.EntityDbConstructor.name}.uuid IN (...:uuid)`);

    return selectQueryBuilder;
  }
}
