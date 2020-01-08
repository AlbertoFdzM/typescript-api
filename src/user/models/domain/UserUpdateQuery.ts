import { EntityUpdateQuery } from '../../../common/models/EntityUpdateQuery';
import { User } from './User';
import { UserUpdateQueryValues } from './UserUpdateQueryValues';

export class UserUpdateQuery extends EntityUpdateQuery<User, UserUpdateQueryValues> {}
