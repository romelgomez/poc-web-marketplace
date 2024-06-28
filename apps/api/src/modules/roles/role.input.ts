import { Field, ID, InputType, registerEnumType } from '@nestjs/graphql';
import { RoleType } from '@prisma/client';
import { IsEnum } from 'class-validator';

registerEnumType(RoleType, {
  name: 'RoleType',
});

@InputType()
export class RoleInput {
  @Field(() => ID)
  id: string;

  @Field(() => RoleType)
  @IsEnum({
    type: 'enum',
    enum: RoleType,
    default: RoleType.VIEWER,
  })
  role: RoleType;

  @Field(() => ID)
  userId: string;

  @Field(() => ID, { nullable: true })
  accountId?: string;

  @Field({ nullable: true })
  tag?: string;

  @Field()
  assigned: Date;
}
