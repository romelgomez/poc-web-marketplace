import { Injectable, NotFoundException } from '@nestjs/common';
import type { RoleInput } from './role.input';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async create(data: RoleInput) {
    return this.roleRepository.create(data);
  }

  async findAll() {
    return this.roleRepository.findAll();
  }

  async findOne(id: string) {
    const role = await this.roleRepository.findOne(id);
    if (!role) {
      throw new NotFoundException(`Role with ID "${id}" not found`);
    }
    return role;
  }

  async update(data: RoleInput) {
    return this.roleRepository.update(data);
  }

  async remove(id: string) {
    return this.roleRepository.remove(id);
  }
}
