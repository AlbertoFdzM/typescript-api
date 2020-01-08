import { injectable, inject } from 'inversify';
import {
  Connection,
  createConnection,
  ConnectionOptions,
  getConnection,
  Repository
} from 'typeorm';

import { CONFIG_TYPES } from '../dependency-injection/types/CONFIG_TYPES';
import { DbConfig } from '../config/DbConfig';

@injectable()
export class DbDatasource {

  constructor (
    @inject(CONFIG_TYPES.DB)
    private readonly config: DbConfig
  ) {}

  public async createConnection(): Promise<Connection> {
    const options: ConnectionOptions = await this.getConnectionOptions();

    return createConnection(options);
  }

  public async getConnection(): Promise<Connection> {
    return getConnection();
  }

  public getRepository<TRepo>(TRepo: new () => TRepo): Repository<TRepo> {
    const connection: Connection = getConnection();
    const repository: Repository<TRepo> = connection.getRepository(TRepo);

    return repository;
  }

  private async getConnectionOptions(): Promise<ConnectionOptions> {
    const options: ConnectionOptions = {
      type: this.config.dbType,
      host: this.config.host,
      port: this.config.port,
      database: this.config.dbName,
      username: this.config.username,
      password: this.config.password,
      entities: this.config.entities
    };

    return options;
  }
}
