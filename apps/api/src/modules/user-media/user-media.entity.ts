import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Media } from '../media/media.entity';
import { User } from '../users/user.entity';

@ObjectType()
export class UserMedia {
  @Field(() => ID)
  id: string;

  @Field(() => User)
  user: User;

  @Field(() => Media)
  media: Media;

  @Field({ nullable: true })
  tag?: string;
}
