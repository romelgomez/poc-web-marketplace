import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Listing } from '../listings/listing.entity';
import type { PublicationMedia } from '../publication-media/publication-media.entity';

export enum PublicationVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

registerEnumType(PublicationVisibility, {
  name: 'AddressType',
});

@ObjectType()
export class Publication {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  tag: string | null;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => ID, { nullable: true })
  listingId: string | null;

  @Field(() => PublicationVisibility)
  visibility: PublicationVisibility | string;

  // NOTE: to hide this field
  // @Field((type) => [PublicationMedia], { nullable: 'itemsAndList' })
  publicationMedia?: PublicationMedia[];

  @Field(() => Listing, { nullable: true })
  listing: Listing | null;

  @Field(() => Date, { nullable: true })
  created: Date | null;

  @Field(() => Date, { nullable: true })
  modified?: Date | null;

  @Field(() => Date, { nullable: true })
  deleted: Date | null;
}
