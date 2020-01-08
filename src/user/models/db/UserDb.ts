import { Entity, Column } from 'typeorm';

import { EntityDb } from '../../../common/models/EntityDb';

@Entity({
  name: 'users'
})
export class UserDb extends EntityDb {
  @Column({
    name: 'username',
    type: 'varchar',
    length: 50,
    nullable: false
  })
  public username: string | undefined;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 254,
    nullable: false,
    unique: true
  })
  public email: string | undefined;
}
