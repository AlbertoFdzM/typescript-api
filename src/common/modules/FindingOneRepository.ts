import { Entity } from '../models/Entity';
import { EntityFindQuery } from '../models/EntityFindQuery';

export interface FindingOneRepository<TEntity extends Entity> {
  findOne(findQuery: EntityFindQuery): Promise<TEntity>;
}
