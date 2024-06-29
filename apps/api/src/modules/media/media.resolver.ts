import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Media } from './media.entity';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { MediaInput } from './media.input';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { MediaService } from './media.service';

@Resolver(() => Media)
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @Query(() => Media, { nullable: true })
  media(@Args('id') id: string) {
    return this.mediaService.findOne(id);
  }

  @Mutation(() => Media)
  updateMedia(@Args('data') data: MediaInput) {
    return this.mediaService.update(data);
  }

  @Mutation(() => Media)
  removeMedia(@Args('id') id: string) {
    return this.mediaService.remove(id);
  }
}
