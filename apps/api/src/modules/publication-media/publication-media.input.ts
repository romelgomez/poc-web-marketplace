import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class PublicationMediaInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  publicationId: string;

  @Field(() => ID)
  mediaId: string;

  @Field({ nullable: true })
  tag?: string;
}
