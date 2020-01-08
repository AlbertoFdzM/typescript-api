import express from 'express';
import { injectable } from 'inversify';

@injectable()
export abstract class Router {
  public get middleware(): express.Handler {
    return this.router;
  }

  protected readonly router: express.Router;

  constructor() {
    this.router = express.Router();
  }

  protected abstract init(): void;
}
