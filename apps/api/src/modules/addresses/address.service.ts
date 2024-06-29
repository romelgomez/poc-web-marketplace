import { Injectable } from '@nestjs/common';
import type { AddressInput } from './address.input';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { AddressRepository } from './address.repository';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  async create(data: AddressInput) {
    return this.addressRepository.create(data);
  }

  async findAll() {
    return this.addressRepository.findAll();
  }

  async findOne(id: string) {
    return this.addressRepository.findOne(id);
  }

  async update(data: AddressInput) {
    return this.addressRepository.update(data);
  }

  async remove(id: string) {
    return this.addressRepository.remove(id);
  }
}
