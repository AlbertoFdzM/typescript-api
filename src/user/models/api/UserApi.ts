import { EntityApi } from '../../../common/models/EntityApi';

export class UserApi extends EntityApi {
  constructor (
    id: string,
    public readonly username: string,
    public readonly email: string,
    created_at: number,
    updated_at: number,
    deleted_at: number | null = null
  ) {
    super(
      id,
      created_at,
      updated_at,
      deleted_at
    );
  }
}
