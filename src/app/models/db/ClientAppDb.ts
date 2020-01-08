import { Entity, Column } from 'typeorm';

import { EntityDb } from '../../../common/models/EntityDb';

@Entity({
  name: 'client_apps'
})
export class ClientAppDb extends EntityDb {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true
  })
  public name: string | undefined;
}
