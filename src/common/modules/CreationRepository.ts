import { Entity } from '../models/Entity';

export interface CreationRepository<TEntity extends Entity, TCreationQuery> {
  create(creationQuery: TCreationQuery): Promise<TEntity>;
}
