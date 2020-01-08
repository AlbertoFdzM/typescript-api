export abstract class EntityApi {
  constructor (
    public readonly id: string,
    public readonly created_at: number,
    public readonly updated_at: number,
    public readonly deleted_at: number | null = null
  ) {}
}
