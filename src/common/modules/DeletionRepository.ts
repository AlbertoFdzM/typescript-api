import { Entity } from '../models/Entity';
import { EntityDeletionQuery } from '../models/EntityDeletionQuery';

export interface DeletionRepository<TEntity extends Entity> {
  delete(deletionQuery: EntityDeletionQuery<TEntity>): Promise<TEntity | null>;
}
