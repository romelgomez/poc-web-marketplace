import type { Listing } from '../listings/listings.entity';
import type { User } from '../user/user.entity';

export interface IAccount {
  name?: string;
  disabled: boolean;
  owner: User;
  listings: Listing[];
}
