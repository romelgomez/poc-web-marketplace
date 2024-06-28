import { Entity } from '../core/entity';
import type { IReferral } from './referrals.types';

export class ReferralEntity extends Entity implements Partial<IReferral> {
  accountId?: IReferral['accountId'];
  influencer?: IReferral['influencer'];
  recommendedBy?: IReferral['recommendedBy'];
  otherReferrals?: IReferral['otherReferrals'];
  previousTreatment?: IReferral['previousTreatment'];
  referrals?: IReferral['referrals'];

  constructor(i: Partial<IReferral>) {
    super(i);

    this.accountId = i.accountId;
    this.influencer = i.influencer;
    this.recommendedBy = i.recommendedBy;
    this.otherReferrals = i.otherReferrals;
    this.previousTreatment = i.previousTreatment;
    this.referrals = i.referrals;
  }

  dto(): IReferral {
    const dto: IReferral = {
      accountId: this.accountId,
      influencer: this.influencer,
      recommendedBy: this.recommendedBy,
      otherReferrals: this.otherReferrals,
      previousTreatment: this.previousTreatment,
      referrals: this.referrals,

      ...this._dto(),
    };

    return this.removeUndefined(dto);
  }
}
