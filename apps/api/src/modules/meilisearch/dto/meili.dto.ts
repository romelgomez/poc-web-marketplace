import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { PublicationVisibility } from 'src/modules/publications/publication.entity';

@ObjectType()
class MediaOutputDto {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  size: number;

  @Field()
  type: string;

  @Field()
  version: number;

  @Field({ nullable: true })
  deleted?: string;
}

@ObjectType()
export class Hit {
  @Field()
  id: string;

  @Field()
  tag: string;

  @Field()
  listingId: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => PublicationVisibility, {
    defaultValue: PublicationVisibility.PUBLIC,
  })
  visiblility: PublicationVisibility;

  @Field()
  created: string;

  @Field()
  modified: string;

  @Field({ nullable: true })
  deleted?: string;

  @Field(() => [MediaOutputDto], { nullable: true })
  media?: MediaOutputDto[];
}

@ObjectType()
class FacetStat {
  @Field()
  min: number;

  @Field()
  max: number;
}

@ObjectType()
export class Search {
  @Field(() => [Hit])
  hits: Hit[];

  @Field()
  processingTimeMs: number;

  @Field()
  query: string;

  // Error: Cannot determine a GraphQL output type for the "facetDistribution". Make sure your class is decorated with an appropriate decorator.
  // @Field(() => GraphQLJSON, { nullable: true })
  // facetDistribution?: {
  //   [key: string]: {
  //     [key: string]: number;
  //   };
  // };

  @Field(() => FacetStat, { nullable: true })
  facetStats?: FacetStat;

  @Field(() => [Number], { nullable: true })
  vector?: number[];

  @Field({ nullable: true })
  totalHits?: number;

  @Field({ nullable: true })
  hitsPerPage?: number;

  @Field({ nullable: true })
  page?: number;

  @Field({ nullable: true })
  totalPages?: number;

  @Field({ nullable: true })
  offset?: number;

  @Field({ nullable: true })
  limit?: number;

  @Field({ nullable: true })
  estimatedTotalHits?: number;

  @Field({ nullable: true })
  count?: number;
}
