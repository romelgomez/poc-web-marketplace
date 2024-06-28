import { Injectable, NotFoundException } from '@nestjs/common';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { MeiliSearchService } from '../meilisearch/meilisearch.service';
import type { ListingInput } from './listing.input';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { ListingRepository } from './listing.repository';

@Injectable()
export class ListingService {
  constructor(
    private readonly listingRepository: ListingRepository,
    private readonly meiliSearchService: MeiliSearchService,
  ) {}

  async create(data: ListingInput) {
    const listing = await this.listingRepository.create(data);

    await this.meiliSearchService.initializeIndex(data.id);

    console.log(`Listing index ${data.id} created.`);

    return listing;
  }

  async findAll() {
    return this.listingRepository.findAll();
  }

  async findOne(id: string) {
    const listing = await this.listingRepository.findOne(id);
    if (!listing) {
      throw new NotFoundException(`Listing with ID "${id}" not found`);
    }
    return listing;
  }

  async update(data: ListingInput) {
    return this.listingRepository.update(data);
  }

  async remove(id: string) {
    return this.listingRepository.remove(id);
  }
}
