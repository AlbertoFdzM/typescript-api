import { Entity } from './Entity';

export class EntityList<TEntity extends Entity> {
  private static readonly DEFAULT_OFFSET: number = 0;
  private static readonly DEFAULT_LIMIT: number = 0;

  public readonly offset!: number;
  public readonly limit!: number;
  public readonly total!: number;

  constructor (
    public readonly items: TEntity[],
    offset: number | null = null,
    limit: number | null = null,
    total: number | null = null
  ) {
    this.offset = offset ?? EntityList.DEFAULT_OFFSET;
    this.limit = limit ?? EntityList.DEFAULT_LIMIT;
    this.total = total ?? items.length;
  }
}
