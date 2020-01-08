import { Entity, ManyToOne, JoinColumn, RelationId, Column } from 'typeorm';

import { EntityDb } from '../../../common/models/EntityDb';
import { AuthorizationTypeDb } from './AuthorizationTypeDb';
import { ClientAppDb } from '../../../app/models/db/ClientAppDb';
import { UserDb } from '../../../user/models/db/UserDb';

@Entity({
  name: 'authorizations'
})
export class AuthorizationDb extends EntityDb {
  @Column({
    name: 'type',
    type: 'enum',
    enum: AuthorizationTypeDb
  })
  public type: AuthorizationTypeDb | undefined;

  @ManyToOne(() => ClientAppDb, {
    nullable: false
  })
  @JoinColumn({
    name: 'client_app_uuid',
    referencedColumnName: 'uuid'
  })
  public clientApp: ClientAppDb | undefined;

  @RelationId((authorizationDb: AuthorizationDb) => authorizationDb.clientApp)
  public clientAppUuid: string | undefined;

  @ManyToOne(() => UserDb, {
    nullable: true
  })
  @JoinColumn({
    name: 'user_uuid',
    referencedColumnName: 'uuid'
  })
  public user: UserDb | undefined;

  @RelationId((authorizationDb: AuthorizationDb) => authorizationDb.user)
  public userUuid: string | undefined;
}
