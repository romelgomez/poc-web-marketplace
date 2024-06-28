import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum AddressType {
  RESIDENTIAL = 'RESIDENTIAL',
  BUSINESS = 'BUSINESS',
  SHIPPING = 'SHIPPING',
  BILLING = 'BILLING',
  OTHER = 'OTHER',
}

registerEnumType(AddressType, {
  name: 'AddressType',
});

@ObjectType()
export class Address {
  @Field(() => ID)
  id: string;

  @Field()
  location: string;

  @Field()
  district: string;

  @Field(() => AddressType)
  type: AddressType;

  @Field({ nullable: true })
  tag?: string;
}
