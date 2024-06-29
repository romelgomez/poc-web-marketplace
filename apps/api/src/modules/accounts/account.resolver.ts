import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { UserInput } from '../users/user.input';
import { Account } from './account.entity';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { AccountInput } from './account.input';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { AccountService } from './account.service';

@Resolver(() => Account)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Query(() => Account, { nullable: true })
  async getAccount(@Args('email') email: string): Promise<Account | null> {
    const account = await this.accountService.findForUserEmail(email);

    return account;
  }

  @Mutation(() => Account)
  async createAccount(@Args('data') data: UserInput) {
    return this.accountService.create(data);
  }

  @Query(() => Account)
  async account(@Args('id') id: string) {
    return this.accountService.findOne(id);
  }

  @Mutation(() => Account)
  async updateAccount(@Args('data') data: AccountInput) {
    return this.accountService.update(data);
  }

  @Mutation(() => Account)
  async removeAccount(@Args('id') id: string) {
    return this.accountService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => String)
  protectedPingAccount(@Args('id') id: string) {
    return `Protected Ping #${id}!`;
  }

  @Query(() => String)
  openPingAccount(@Args('id') id: string) {
    return `Open Ping #${id}!`;
  }
}
