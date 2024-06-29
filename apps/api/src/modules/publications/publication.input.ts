import { Field, ID, InputType } from '@nestjs/graphql';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { MediaInput } from '../media/media.input';
import { PublicationVisibility } from './publication.entity';

@InputType()
export class PublicationInput {
  @Field(() => ID)
  @IsString()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  tag?: string;

  @Field(() => String)
  @IsString()
  title: string;

  @Field()
  @IsString()
  description: string;

  @Field(() => ID, { nullable: true })
  @IsString()
  listingId?: string;

  @Field(() => [MediaInput], { nullable: true })
  @IsArray()
  media?: MediaInput[];

  @Field(() => PublicationVisibility)
  @IsEnum(PublicationVisibility)
  visibility: PublicationVisibility;
}
