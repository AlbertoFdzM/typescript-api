import { Request } from '../models/Request';
import { EntityApi } from '../models/EntityApi';

export interface ReqHandler<TOutput extends EntityApi> {
  handle(req: Request): Promise<TOutput>;
}
