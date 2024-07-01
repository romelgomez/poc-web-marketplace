import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum RoleType {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  VIEWER = 'VIEWER',
}

registerEnumType(RoleType, {
  name: 'RoleType',
});

@ObjectType()
export class Role {
  @Field(() => ID)
  id: string;

  @Field(() => RoleType)
  role: typeof RoleType;

  @Field(() => ID)
  userId: string;

  @Field(() => ID, { nullable: true })
  accountId?: string;

  @Field({ nullable: true })
  tag?: string;
}
