import { PaginationQuery } from './PaginationQuery';

export abstract class EntityFindQuery {
  constructor(
    public readonly id: number | null = null,
    public readonly ids: number[] | null = null,
    public readonly uuid: string | null = null,
    public readonly uuids: string[] | null = null,
    public readonly isDeleted: boolean | null = null,
    public readonly pagination: PaginationQuery
  ) {}
}
