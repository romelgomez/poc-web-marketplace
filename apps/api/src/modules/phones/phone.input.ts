import { Field, ID, InputType } from '@nestjs/graphql';

import { IsEnum, IsString } from 'class-validator';

export enum PhoneType {
  LANDLINE = 'LANDLINE',
  CELLULAR = 'CELLULAR',
  OTHER = 'OTHER',
}

@InputType()
export class PhoneInput {
  @Field(() => ID)
  id: string;

  @Field()
  @IsString()
  number: string;

  @Field(() => PhoneType)
  @IsEnum(PhoneType)
  type: PhoneType;

  @Field({ nullable: true })
  tag: string | null;
}
