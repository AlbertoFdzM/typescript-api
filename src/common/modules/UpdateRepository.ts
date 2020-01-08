import { Entity } from '../models/Entity';
import { EntityUpdateQuery } from '../models/EntityUpdateQuery';

export interface UpdateRepository<TEntity extends Entity, TUpdateQueryValues> {
  update(
    updateQuery: EntityUpdateQuery<TEntity, TUpdateQueryValues>
  ): Promise<TEntity>;
}
