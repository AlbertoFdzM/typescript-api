export class UserCreationQuery {
  constructor (
    public readonly username: string,
    public readonly email: string
  ) {}
}
