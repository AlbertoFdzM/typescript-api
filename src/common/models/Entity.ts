export abstract class Entity {
  constructor (
    public readonly id: number,
    public readonly uuid: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly deletedAt: Date | null = null
  ) {}
}
