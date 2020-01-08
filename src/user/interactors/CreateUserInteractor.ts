import { Interactor } from '../../common/modules/Interactor';
import { UserCreationQuery } from '../models/domain/UserCreationQuery';
import { User } from '../models/domain/User';
import { CreationRepository } from '../../common/modules/CreationRepository';
import { injectable, inject } from 'inversify';
import { REPOSITORY_TYPES } from '../../dependency-injection/types/REPOSITORY_TYPES';

@injectable()
export class CreateUserInteractor implements Interactor<UserCreationQuery, User> {

  constructor (
    @inject(REPOSITORY_TYPES.USER)
    private readonly repository: CreationRepository<User, UserCreationQuery>
  ) {}

  public async interact(creationQuery: UserCreationQuery): Promise<User> {
    const user: User = await this.repository.create(creationQuery);

    return user;
  }

}
