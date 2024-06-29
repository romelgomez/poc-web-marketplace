import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { RoleType } from '@prisma/client';

// Register the RoleType enum with GraphQL
registerEnumType(RoleType, {
  name: 'RoleType',
});

@ObjectType()
export class Role {
  @Field(() => ID)
  id: string;

  @Field(() => RoleType)
  role: RoleType;

  @Field(() => ID)
  userId: string;

  @Field(() => ID, { nullable: true })
  accountId?: string;

  @Field({ nullable: true })
  tag?: string;
}
