import { Field, ID, InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class CategoryInput {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  slug: string;

  @Field({ nullable: true })
  tag: string;

  @Field()
  @IsInt()
  left: number;

  @Field()
  @IsInt()
  right: number;

  @Field({ nullable: true })
  parentId: string;
}
