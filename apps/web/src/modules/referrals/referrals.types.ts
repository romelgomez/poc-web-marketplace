export enum ReferralsEnum {
  Instagram = 'Instagram',
  Influencer = 'Influencer',
  Facebook = 'Facebook',
  TikTok = 'TikTok',
  Youtube = 'Youtube',
  ReferredBy = 'ReferredBy',
  RecommendedBy = 'RecommendedBy',
  FoundIt = 'FoundIt',
  Other = 'Other',
}

export interface IReferral {
  id?: string;
  accountId?: string;
  influencer?: string;
  recommendedBy?: string;
  otherReferrals?: string;
  previousTreatment?: string;
  referrals?: ReferralsEnum[];
}
