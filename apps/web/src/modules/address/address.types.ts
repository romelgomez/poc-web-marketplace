import type { Time } from '../../shared.types';

enum AddressTypeEnum {
  Residential = 'residential',
  Business = 'business',
  Shipping = 'shipping',
  Billing = 'billing',
  Other = 'other',
}

export interface IAddress {
  id?: string;
  accountId?: string;
  location?: string;
  district?: string;
  type?: AddressTypeEnum;
  created?: Time;
  modified?: Time;
  deleted?: Time;
}
