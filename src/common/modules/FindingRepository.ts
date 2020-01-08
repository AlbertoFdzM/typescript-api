import { Entity } from '../models/Entity';
import { EntityFindQuery } from '../models/EntityFindQuery';
import { EntityList } from '../models/EntityList';

export interface FindingRepository<TEntity extends Entity> {
  find(findQuery: EntityFindQuery): Promise<EntityList<TEntity>>;
}
