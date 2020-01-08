import http from 'http';
import net from 'net';
import { injectable, inject } from 'inversify';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import { Router } from './common/modules/Router';
import { ROUTER_TYPES } from './dependency-injection/types/ROUTER_TYPES';
import { DATASOURCE_TYPES } from './dependency-injection/types/DATASOURCE_TYPES';
import { DbDatasource } from './datasources/DbDatasource';

const ERROR_EXIT_CODE: number = 1;

@injectable()
export class App {
  public readonly express: express.Express;
  public readonly server: http.Server;

  private readonly port: number = 3000;

  constructor(
    @inject(DATASOURCE_TYPES.DB)
    private readonly dbDatasource: DbDatasource,
    @inject(ROUTER_TYPES.MAIN)
    private readonly mainRouter: Router
  ) {
    this.express = express();
    this.server = http.createServer(this.express);

    this.init();
  }

  public async start(): Promise<http.Server> {
    try {
      await this.dbDatasource.createConnection();

      this.server.on('error', this.onServerError.bind(this));
      this.server.on('listening', this.onServerListening.bind(this));

      return this.server.listen(this.port);
    } catch (err) {
      console.error('Could not connect to DB');
      console.error(err);

      process.exit(ERROR_EXIT_CODE);
    }
  }

  private init(): void {
    this.configExpress();
  }

  private configExpress(): void {
    this.express.disable('x-powered-by');
    this.express.set('port', this.port);
    this.express.use(morgan('dev'));
    this.express.use(bodyParser.json());

    this.express.use(this.mainRouter.middleware);
  }

  private onServerError(err: NodeJS.ErrnoException): void {
    if (err.syscall !== 'listen') {
      throw err;
    }

    const port: string | number = this.express.get('port');
    const bind: string =
      typeof port === 'string' ? 'Pipe ' + port : `Port ${port}`;

    switch (err.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(ERROR_EXIT_CODE);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(ERROR_EXIT_CODE);
        break;
      default:
        throw err;
    }
  }

  private onServerListening(): void {
    const addr: string | net.AddressInfo | null = this.server.address();
    const bind: string =
      typeof addr === 'string'
        ? `pipe ${addr}`
        : addr !== null
        ? `port ${addr.port}`
        : '';

    console.log('Listening on ' + bind);
  }
}
