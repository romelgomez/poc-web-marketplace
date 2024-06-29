import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../users/user.entity';
import { Listing } from '../listings/listing.entity';

@ObjectType()
export class Account {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  name: string | null;

  @Field(() => ID, { nullable: true })
  ownerId: string | null;

  @Field(() => String, { nullable: true })
  slug: string | null;

  @Field(() => ID, { nullable: true })
  tag: string | null;

  @Field({ nullable: true })
  created: Date;

  @Field(() => User, { nullable: true })
  user: User | null;

  @Field(() => [Listing], { nullable: true })
  listings: Listing[];

  @Field({ nullable: true })
  modified: Date;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  disabled: boolean;
}
