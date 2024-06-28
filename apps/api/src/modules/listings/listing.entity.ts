import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum ListingVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

// Register the ListingVisibility enum with GraphQL
registerEnumType(ListingVisibility, {
  name: 'ListingVisibility',
});

@ObjectType()
export class Listing {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  name: string | null;

  @Field(() => ListingVisibility)
  visibility: ListingVisibility | string;

  @Field(() => ID, { nullable: true })
  accountId: string | null;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => ID, { nullable: true })
  tag: string | null;

  @Field(() => Date, { nullable: true })
  created: Date | null;

  @Field(() => Date, { nullable: true })
  modified?: Date | null;

  @Field(() => Date, { nullable: true })
  deleted: Date | null;
}
