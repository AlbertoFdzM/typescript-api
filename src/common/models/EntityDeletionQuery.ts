import { DeletionType } from './DeletionType';
import { Entity } from './Entity';

export class EntityDeletionQuery<TEntity extends Entity> {
  constructor(
    public readonly entity: TEntity,
    public readonly type: DeletionType
  ) {}
}
