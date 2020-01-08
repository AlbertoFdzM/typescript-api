import path from 'path';
import { injectable } from 'inversify';
import dotenv from 'dotenv';

import { Env } from '../common/models/Env';
import { stringToDbTypeMap } from '../common/maps/stringToDbTypeMap';

@injectable()
export class EnvDatasource {
  public readonly env: Env;

  private get envPath (): string {
    return path.join(
      process.cwd(),
      this.configPath,
      `${this.configName}.env`
    );
  }

  private readonly defaultConfigName: string = 'local';
  private readonly defaultConfigPath: string = '/config';
  private readonly configName: string;
  private readonly configPath: string;

  constructor() {
    this.configName = process.env.CONFIG_NAME ?? this.defaultConfigName;
    this.configPath = process.env.CONFIG_PATH ?? this.defaultConfigPath;

    this.env = this.loadEnv();
  }

  public populateEnv (): void {
    const envPath: string = this.envPath;

    console.log(`Populating env with file ${envPath}`);

    const dotenvOptions: dotenv.DotenvConfigOptions = {
      path: envPath,
      debug: process.env.DEBUG !== undefined
    };

    dotenv.config(dotenvOptions);
  }

  private loadEnv(): Env {
    const envPath: string = this.envPath;

    console.log(`Loading env file ${envPath}`);

    const dotenvOptions: dotenv.DotenvConfigOptions = {
      path: envPath,
      debug: process.env.DEBUG !== undefined
    };

    const output: dotenv.DotenvConfigOutput = dotenv.config(dotenvOptions);

    const env: Env = {
      DB_USERNAME: output.parsed?.DB_USERNAME ?? '',
      DB_PASSWORD: output.parsed?.DB_PASSWORD ?? '',
      DB_HOST: output.parsed?.DB_HOST ?? '',
      DB_PORT: parseInt(output.parsed?.DB_PORT ?? ''),
      DB_NAME: output.parsed?.DB_NAME ?? '',
      DB_TYPE: stringToDbTypeMap[output.parsed?.DB_TYPE ?? ''],
      DB_ENTITIES: JSON.parse(output.parsed?.DB_ENTITIES ?? '')
    };

    return env;
  }
}
