import { injectable } from 'inversify';

import { Adapter } from './Adapter';

@injectable()
export class DateToUnixTimeAdapter implements Adapter<Date, number> {
  private readonly MILLISECONDS_TO_SECONDS: number = 1000;

  public async adapt(date: Date): Promise<number> {
    return Math.round(date.getTime() / this.MILLISECONDS_TO_SECONDS);
  }
}
