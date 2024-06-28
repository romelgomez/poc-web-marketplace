import { Injectable, NotFoundException } from '@nestjs/common';
import type { UserInput } from '../users/user.input';
import type { AccountInput } from './account.input';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { AccountRepository } from './account.repository';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async create(data: UserInput) {
    return await this.accountRepository.create(data);
  }

  async findOne(id: string) {
    const account = await this.accountRepository.findOne(id);
    if (!account) {
      throw new NotFoundException(`Account with ID "${id}" not found`);
    }
    return account;
  }

  async update(data: AccountInput) {
    return this.accountRepository.update(data);
  }

  async remove(id: string) {
    return this.accountRepository.remove(id);
  }

  async findForUserEmail(email: string) {
    return await this.accountRepository.findForUserEmail(email);
  }
}
