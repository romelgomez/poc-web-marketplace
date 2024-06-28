import type { Account } from '../accounts/accounts.entity';
import type Publication from '../publications/publication.entity';

export enum VisibilityEnum {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export interface IListing {
  id?: string;
  tag?: string;
  name?: string;
  description?: string;
  visibility?: VisibilityEnum;
  account?: Account;
  publications?: Publication[];
}

export interface IListingDTO {
  id: string;
  tag?: string;
  name: string;
  description: string;
  accountId: string;
  visibility: VisibilityEnum;
}
