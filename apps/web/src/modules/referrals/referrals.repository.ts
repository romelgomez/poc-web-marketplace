import { Entity } from '../core/entity';
import type { IReferral } from './referrals.types';

export class ReferralEntity extends Entity implements Partial<IReferral> {
  accountId?: IReferral['accountId'];

  constructor(i: Partial<IReferral>) {
    super(i);

    this.accountId = i.accountId;
  }

  dto(): IReferral {
    return {
      accountId: this.accountId,
      ...this._dto(),
    };
  }
}
