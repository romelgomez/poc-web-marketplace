import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserMedia } from './user-media.entity';
import type { UserMediaInput } from './user-media.input';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { UserMediaService } from './user-media.service';

@Resolver(() => UserMedia)
export class UserMediaResolver {
  constructor(private readonly userMediaService: UserMediaService) {}

  @Mutation(() => UserMedia)
  createUserMedia(@Args('data') data: UserMediaInput) {
    return this.userMediaService.create(data);
  }

  @Query(() => [UserMedia])
  userMedias() {
    return this.userMediaService.findAll();
  }

  @Query(() => UserMedia, { nullable: true })
  userMedia(@Args('id') id: string) {
    return this.userMediaService.findOne(id);
  }

  @Mutation(() => UserMedia)
  updateUserMedia(@Args('data') data: UserMediaInput) {
    return this.userMediaService.update(data);
  }

  @Mutation(() => UserMedia)
  removeUserMedia(@Args('id') id: string) {
    return this.userMediaService.remove(id);
  }
}
