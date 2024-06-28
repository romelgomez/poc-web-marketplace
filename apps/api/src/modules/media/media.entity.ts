import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Media {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  type: string;

  @Field(() => Number)
  size: number;

  @Field(() => Number)
  version: number;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  tag: string | null;

  // Include additional fields and relations as necessary
  // For instance, if you have a version or URL field in your Prisma schema, you can include them here
  // @Field({ nullable: true })
  // version?: number;

  // @Field({ nullable: true })
  // url?: string;

  @Field(() => Date, { nullable: true })
  created: Date | null;

  @Field(() => Date, { nullable: true })
  deleted: Date | null;
}
