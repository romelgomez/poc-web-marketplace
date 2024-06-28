import { Injectable } from '@nestjs/common';
import type { PublicationMediaInput } from './publication-media.input';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { PublicationMediaRepository } from './publication-media.repository';

@Injectable()
export class PublicationMediaService {
  constructor(
    private readonly publicationMediaRepository: PublicationMediaRepository,
  ) {}

  async create(data: PublicationMediaInput) {
    return this.publicationMediaRepository.create(data);
  }

  async findAll() {
    return this.publicationMediaRepository.findAll();
  }

  async findOne(id: string) {
    return this.publicationMediaRepository.findOne(id);
  }

  async update(data: PublicationMediaInput) {
    return this.publicationMediaRepository.update(data);
  }

  async remove(id: string) {
    return this.publicationMediaRepository.remove(id);
  }
}
