import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Media } from '../media/media.entity';

@ObjectType()
export class PublicationMedia {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  publicationId: string;

  @Field(() => ID)
  mediaId: string;

  @Field(() => Media)
  media: Media;

  @Field(() => ID, { nullable: true })
  tag: string | null;

  @Field(() => Date, { nullable: true })
  created: Date | null;

  @Field(() => Date, { nullable: true })
  modified?: Date | null;

  @Field(() => Date, { nullable: true })
  deleted: Date | null;
}
