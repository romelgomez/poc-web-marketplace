import { Entity } from '../core/entity';
import type { IPhone } from './phones.types';

export class Phone extends Entity implements Partial<IPhone> {
  accountId?: IPhone['accountId'];
  number?: IPhone['number'];
  type?: IPhone['type'];

  constructor(i: Partial<IPhone>) {
    super(i);

    this.accountId = i.accountId;
    this.number = i.number;
    this.type = i.type;
  }

  dto(): IPhone {
    const dto: IPhone = {
      accountId: this.accountId,
      number: this.number,
      type: this.type,

      ...this._dto(),
    };

    return this.removeUndefined(dto);
  }
}
