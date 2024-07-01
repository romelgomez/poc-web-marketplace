import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { RoleType } from './role.entity';

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
