import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class MediaInput {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  type: string;

  @Field(() => Int)
  size: number;

  @Field(() => Int)
  version: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  tag?: string;
}
