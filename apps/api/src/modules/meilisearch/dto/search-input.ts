import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

@InputType()
export class SearchInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  q?: string;

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  offset?: number;

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  @Field((type) => [String], { nullable: 'itemsAndList' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attributesToHighlight?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  highlightPreTag?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  highlightPostTag?: string;

  @Field((type) => [String], { nullable: 'itemsAndList' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attributesToCrop?: string[];

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  cropLength?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  cropMarker?: string;

  @Field((type) => [String], { nullable: 'itemsAndList' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filter?: string[]; // Simplified for now, might need more complex handling for deep filtering

  @Field((type) => [String], { nullable: 'itemsAndList' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sort?: string[];

  @Field((type) => [String], { nullable: 'itemsAndList' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  facets?: string[];

  @Field((type) => [String], { nullable: 'itemsAndList' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attributesToRetrieve?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  showMatchesPosition?: boolean;

  // The matchingStrategy would need to be an enum in GraphQL.
  // For simplicity, we use string here. Consider refining this.
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  matchingStrategy?: string;

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1) // Assuming you want a minimum hits per page of 1
  hitsPerPage?: number;

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1) // Assuming pages start from 1
  page?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  facetName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  facetQuery?: string;

  // Vector is a number array. This could be defined better, but for simplicity, it's like this:
  @Field((type) => [Int], { nullable: 'itemsAndList' })
  @IsOptional()
  @IsArray()
  vector?: number[];

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  showRankingScore?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  showRankingScoreDetails?: boolean;

  @Field((type) => [String], { nullable: 'itemsAndList' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attributesToSearchOn?: string[];
}
