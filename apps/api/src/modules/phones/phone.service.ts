import { Injectable } from '@nestjs/common';
import type { PhoneInput } from './phone.input';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { PhoneRepository } from './phone.repository';

@Injectable()
export class PhoneService {
  constructor(private readonly phoneRepository: PhoneRepository) {}

  async create(data: PhoneInput) {
    return this.phoneRepository.create(data);
  }

  async findAll() {
    return this.phoneRepository.findAll();
  }

  async findOne(id: string) {
    return this.phoneRepository.findOne(id);
  }

  async update(data: PhoneInput) {
    return this.phoneRepository.update(data);
  }

  async remove(id: string) {
    return this.phoneRepository.remove(id);
  }
}
