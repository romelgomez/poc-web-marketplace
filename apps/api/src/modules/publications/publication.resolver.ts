import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import type { SearchParams } from 'meilisearch';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { Media } from '../media/media.entity';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { Hit, Search } from '../meilisearch/dto/meili.dto';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { SearchInput } from '../meilisearch/dto/search-input';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { MeiliSearchService } from '../meilisearch/meilisearch.service';
import { Publication } from './publication.entity';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { PublicationInput } from './publication.input';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { PublicationService } from './publication.service';

@Resolver(() => Publication)
export class PublicationResolver {
  constructor(
    private readonly publicationService: PublicationService,
    private readonly meiliSearchService: MeiliSearchService,
  ) {}

  //
  // TODO: extend the query with meta data
  // - query if the index exist
  // - query if the index has publications
  // - save query meta data
  //
  @Query(() => Search)
  async search(
    @Args('input') input: SearchInput,
    @Args('index') index: string,
  ): Promise<Search> {
    const serarchParams: SearchParams = {
      facets: [],
      filter: input.filter || '',
      page: input.page || 1,
    };

    const publication: Search = {
      hits: [],
      processingTimeMs: 0,
      query: input.q || '',
    };

    try {
      const meiliresult = await this.meiliSearchService.search(
        index,
        input.q || '',
        serarchParams,
      );

      publication.hitsPerPage = meiliresult.hitsPerPage;
      publication.page = meiliresult.page;
      publication.totalPages = meiliresult.totalPages;
      publication.totalHits = meiliresult.totalHits;

      publication.hits = meiliresult.hits.map((h) => {
        return {
          id: h.id,
          tag: h.tag,
          title: h.title,
          description: h.description,
          listingId: h.listingId,
          created: h.created,
          modified: h.modified,
          deleted: h.deleted,
          media: h.media,
        } as Hit;
      });

      publication.count = await this.publicationService.count(index);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('An unknown error occurred');
      }
    }

    return publication;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Publication)
  createPublication(
    @Args('data')
    data: PublicationInput,
  ) {
    return this.publicationService.create(data);
  }

  @Query(() => Publication, { nullable: true })
  publication(@Args('id') id: string) {
    return this.publicationService.findOne(id);
  }

  @Mutation(() => Publication)
  async updatePublication(
    @Args('data')
    data: PublicationInput,
  ) {
    return await this.publicationService.update(data);
  }

  @Mutation(() => Publication)
  removePublication(@Args('id') id: string) {
    return this.publicationService.remove(id);
  }

  @Mutation(() => Publication)
  async deletePublicationMedia(
    @Args('mediaId')
    mediaId: string,
  ) {
    const publication = await this.publicationService.deleteMedia(mediaId);

    if (!publication) {
      return null;
    }

    return publication;
  }

  @ResolveField(() => [Media])
  async media(@Root() publication: Publication) {
    const media = publication.publicationMedia?.map((pm) => pm.media);

    return media;
  }
}
