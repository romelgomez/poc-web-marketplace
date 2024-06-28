import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from './role.entity';
import type { RoleInput } from './role.input';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { RoleService } from './role.service';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => Role)
  createRole(@Args('data') data: RoleInput) {
    return this.roleService.create(data);
  }

  @Query(() => [Role])
  roles() {
    return this.roleService.findAll();
  }

  @Query(() => Role, { nullable: true })
  role(@Args('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Mutation(() => Role)
  updateRole(@Args('data') data: RoleInput) {
    return this.roleService.update(data);
  }

  @Mutation(() => Role)
  removeRole(@Args('id') id: string) {
    return this.roleService.remove(id);
  }
}
