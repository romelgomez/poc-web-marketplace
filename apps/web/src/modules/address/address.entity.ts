import { Entity } from '../core/entity';
import type { IAddress } from './address.types';

export class AddressEntity extends Entity implements Partial<IAddress> {
  accountId?: IAddress['accountId'];
  location?: IAddress['location'];
  district?: IAddress['district'];
  type?: IAddress['type'];

  constructor(i: Partial<IAddress>) {
    super(i);

    this.accountId = i.accountId;
    this.location = i.location;
    this.district = i.district;
    this.type = i.type;
  }

  dto() {
    const dto: IAddress = {
      accountId: this.accountId,
      location: this.location,
      district: this.district,
      type: this.type,

      ...this._dto(),
    };

    return this.removeUndefined(dto);
  }
}
