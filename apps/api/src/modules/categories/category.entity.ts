import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Category {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  tag?: string;

  @Field(() => ID, { nullable: true })
  parentId?: string;

  @Field({ nullable: true })
  left?: number;

  @Field({ nullable: true })
  right?: number;
}
