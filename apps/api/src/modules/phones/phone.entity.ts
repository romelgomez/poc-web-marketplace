import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum PhoneType {
  LANDLINE = 'LANDLINE',
  CELLULAR = 'CELLULAR',
  OTHER = 'OTHER',
}

registerEnumType(PhoneType, {
  name: 'PhoneType',
});

@ObjectType()
export class Phone {
  @Field(() => ID)
  id: string;

  @Field()
  number: string;

  @Field(() => PhoneType)
  type: PhoneType;

  @Field({ nullable: true })
  tag?: string;
}
