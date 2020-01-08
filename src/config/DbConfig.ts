import { inject, injectable } from 'inversify';

import { DbType } from '../common/enums/DbType';
import { DATASOURCE_TYPES } from '../dependency-injection/types/DATASOURCE_TYPES';
import { EnvDatasource } from '../datasources/EnvDatasource';
import { Env } from '../common/models/Env';

@injectable()
export class DbConfig {
  public readonly username: string;
  public readonly password: string;
  public readonly host: string;
  public readonly port: number;
  public readonly dbName: string;
  public readonly dbType: DbType;
  public readonly entities: string[];

  constructor (
    @inject(DATASOURCE_TYPES.ENV)
    envDatasource: EnvDatasource
  ) {
    const env: Env = envDatasource.env;

    this.username = env.DB_USERNAME;
    this.password = env.DB_PASSWORD;
    this.host = env.DB_HOST;
    this.port = env.DB_PORT;
    this.dbName = env.DB_NAME;
    this.dbType = env.DB_TYPE;
    this.entities = env.DB_ENTITIES;
  }
}
