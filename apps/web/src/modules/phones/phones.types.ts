import type { Time } from '../../shared.types';

export enum PhoneTypeEnum {
  Landline = 'landline',
  Cellular = 'cellular',
  Other = 'other',
}

export interface IPhone {
  id?: string;
  accountId?: string;
  number?: string;
  type?: PhoneTypeEnum;
  created?: Time;
  updated?: Time;
  deleted?: Time;
}
