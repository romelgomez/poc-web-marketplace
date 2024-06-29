import { Injectable } from '@nestjs/common';
import type { PublicationInput } from './publication.input';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { PublicationRepository } from './publication.repository';

@Injectable()
export class PublicationService {
  constructor(private readonly publicationRepository: PublicationRepository) {}

  async create(data: PublicationInput) {
    return this.publicationRepository.create(data);
  }

  async findOne(id: string) {
    return this.publicationRepository.findOne(id);
  }

  async update(data: PublicationInput) {
    return await this.publicationRepository.update(data);
  }

  async remove(id: string) {
    return this.publicationRepository.remove(id);
  }

  async deleteMedia(id: string) {
    return this.publicationRepository.deleteMedia(id);
  }

  async count(listingId: string) {
    let count = 0;

    try {
      count = await this.publicationRepository.count(listingId);
    } catch (error) {
      console.error(error.message);
    }

    return count;
  }
}
