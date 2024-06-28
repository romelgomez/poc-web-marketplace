import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PublicationMedia } from './publication-media.entity';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { PublicationMediaInput } from './publication-media.input';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { PublicationMediaService } from './publication-media.service';

@Resolver(() => PublicationMedia)
export class PublicationMediaResolver {
  constructor(
    private readonly publicationMediaService: PublicationMediaService,
  ) {}

  @Mutation(() => PublicationMedia)
  createPublicationMedia(
    @Args('data')
    data: PublicationMediaInput,
  ) {
    return this.publicationMediaService.create(data);
  }

  @Query(() => [PublicationMedia])
  publicationMedias() {
    return this.publicationMediaService.findAll();
  }

  @Query(() => PublicationMedia, { nullable: true })
  publicationMedia(@Args('id') id: string) {
    return this.publicationMediaService.findOne(id);
  }

  @Mutation(() => PublicationMedia)
  updatePublicationMedia(
    @Args('data')
    data: PublicationMediaInput,
  ) {
    return this.publicationMediaService.update(data);
  }

  @Mutation(() => PublicationMedia)
  removePublicationMedia(@Args('id') id: string) {
    return this.publicationMediaService.remove(id);
  }
}
