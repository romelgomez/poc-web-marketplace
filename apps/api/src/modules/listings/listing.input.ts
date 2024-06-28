import { Field, ID, InputType, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ListingVisibility } from './listing.entity';

registerEnumType(ListingVisibility, {
  name: 'ListingVisibility',
});

@InputType()
export class ListingInput {
  @Field(() => ID)
  @IsString()
  id: string;

  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => ListingVisibility)
  @IsEnum(ListingVisibility)
  visibility: ListingVisibility;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  accountId: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description: string | null;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  tag: string | null;
}
