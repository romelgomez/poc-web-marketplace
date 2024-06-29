import { Entity } from '../core/entity';
import type { Listing } from '../listings/listings.entity';
import { User } from '../user/user.entity';
import type { IAccount } from './accounts.types';

export class Account extends Entity implements IAccount {
  name?: string;
  disabled: boolean;
  owner: User;
  listings: Listing[];

  constructor(i?: Partial<Account>) {
    super(i);

    this.name = i?.name;
    this.disabled = i?.disabled || false;
    this.owner = i?.owner || new User(i?.owner);
    this.listings = i?.listings || [];
  }
}
