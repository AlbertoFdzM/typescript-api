import { DbType } from '../enums/DbType';

export interface Env {
  readonly DB_USERNAME: string;
  readonly DB_PASSWORD: string;
  readonly DB_HOST: string;
  readonly DB_PORT: number;
  readonly DB_NAME: string;
  readonly DB_TYPE: DbType;
  readonly DB_ENTITIES: string[];
}
