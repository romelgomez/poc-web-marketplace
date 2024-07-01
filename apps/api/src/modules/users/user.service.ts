import { Injectable, NotFoundException } from '@nestjs/common';
import type { RoleType } from '../roles/role.entity';
import type { UserInput } from './user.input';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async updateUser(user: UserInput) {
    return this.userRepository.updateUser(user);
  }

  async remove(id: string) {
    return this.userRepository.remove(id);
  }

  async createUser(
    userData: UserInput,
    accountId: string,
    roleType: RoleType,
  ): Promise<User> {
    return this.userRepository.createUser(userData, accountId, roleType);
  }

  async createNewUserOrFail(userData: UserInput) {
    return await this.userRepository.createNewUserOrFail(userData);
  }
}
