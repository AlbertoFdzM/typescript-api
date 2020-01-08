import { Entity } from './Entity';

export class EntityUpdateQuery<TEntity extends Entity, TValues> {
  constructor(
    public readonly entity: TEntity,
    public readonly values: TValues
  ) {}
}
