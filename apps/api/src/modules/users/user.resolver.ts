import { Args, Mutation, Resolver, registerEnumType } from '@nestjs/graphql';
import { RoleType } from '@prisma/client';
import { User } from './user.entity';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { UserInput } from './user.input';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { UserService } from './user.service';

registerEnumType(RoleType, {
  name: 'RoleType',
});

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: UserInput,
    @Args('accountId') accountId: string,
    @Args({ name: 'role2', type: () => RoleType }) role2: RoleType,
  ) {
    return this.userService.createUser(createUserInput, accountId, role2);
  }

  @Mutation(() => User)
  async updateUser(@Args('userData') userData: UserInput): Promise<User> {
    return this.userService.updateUser(userData);
  }

  @Mutation(() => User)
  removeUser(@Args('id') id: string) {
    return this.userService.remove(id);
  }
}
