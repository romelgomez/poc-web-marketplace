import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Address } from './address.entity';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { AddressInput } from './address.input';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { AddressService } from './address.service';

@Resolver(() => Address)
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  @Mutation(() => Address)
  createAddress(@Args('data') data: AddressInput) {
    return this.addressService.create(data);
  }

  @Query(() => [Address])
  addresses() {
    return this.addressService.findAll();
  }

  @Query(() => Address, { nullable: true })
  address(@Args('id') id: string) {
    return this.addressService.findOne(id);
  }

  @Mutation(() => Address)
  updateAddress(@Args('data') data: AddressInput) {
    return this.addressService.update(data);
  }

  @Mutation(() => Address)
  removeAddress(@Args('id') id: string) {
    return this.addressService.remove(id);
  }
}
