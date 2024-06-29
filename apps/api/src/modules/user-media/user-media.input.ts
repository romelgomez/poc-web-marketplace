import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UserMediaInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  mediaId: string;

  @Field({ nullable: true })
  tag?: string;
}
