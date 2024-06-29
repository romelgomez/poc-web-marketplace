import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class AccountInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  id: string | null;

  @Field(() => String, { nullable: true })
  @IsString()
  name: string | null;

  @Field(() => ID, { nullable: true })
  ownerId: string | null;

  @Field(() => String, { nullable: true })
  slug: string | null;

  @Field(() => ID, { nullable: true })
  tag: string | null;
}
