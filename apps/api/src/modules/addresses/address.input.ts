import { Field, ID, InputType, registerEnumType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

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

@InputType()
export class AddressInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  id: string | null;

  @Field(() => String)
  location: string;

  @Field(() => String)
  district: string;

  @Field(() => AddressType)
  type: AddressType;

  @Field({ nullable: true })
  tag: string | null;
}
