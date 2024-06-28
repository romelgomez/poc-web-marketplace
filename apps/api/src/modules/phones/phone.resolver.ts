import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Phone } from './phone.entity';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { PhoneInput } from './phone.input';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { PhoneService } from './phone.service';

@Resolver(() => Phone)
export class PhoneResolver {
  constructor(private readonly phoneService: PhoneService) {}

  @Mutation(() => Phone)
  createPhone(@Args('data') data: PhoneInput) {
    return this.phoneService.create(data);
  }

  @Query(() => [Phone])
  phones() {
    return this.phoneService.findAll();
  }

  @Query(() => Phone, { nullable: true })
  phone(@Args('id') id: string) {
    return this.phoneService.findOne(id);
  }

  @Mutation(() => Phone)
  updatePhone(@Args('data') data: PhoneInput) {
    return this.phoneService.update(data);
  }

  @Mutation(() => Phone)
  removePhone(@Args('id') id: string) {
    return this.phoneService.remove(id);
  }
}
