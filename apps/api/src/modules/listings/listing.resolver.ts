import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Listing } from './listing.entity';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { ListingInput } from './listing.input';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { ListingService } from './listing.service';

@Resolver(() => Listing)
export class ListingResolver {
  private readonly logger = new Logger(ListingResolver.name);
  constructor(private readonly listingService: ListingService) {}

  @Mutation(() => Listing)
  async createListing(@Args('data') data: ListingInput) {
    try {
      return await this.listingService.create(data);
    } catch (error) {
      this.logger.error(
        `Failed to create listing with data: ${JSON.stringify(data)}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to create listing');
    }
  }

  @Query(() => [Listing])
  async listings() {
    try {
      return await this.listingService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch listings');
    }
  }

  @Query(() => Listing)
  async listing(@Args('id') id: string) {
    try {
      const listing = await this.listingService.findOne(id);
      if (!listing) {
        throw new NotFoundException(`Listing with ID ${id} not found`);
      }
      return listing;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch listing');
    }
  }

  @Mutation(() => Listing)
  async updateListing(@Args('data') data: ListingInput) {
    try {
      const listing = await this.listingService.update(data);
      if (!listing) {
        throw new NotFoundException('Listing not found for update');
      }
      return listing;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update listing');
    }
  }

  @Mutation(() => Listing)
  async removeListing(@Args('id') id: string) {
    try {
      const listing = await this.listingService.remove(id);
      if (!listing) {
        throw new NotFoundException(
          `Listing with ID ${id} not found for removal`,
        );
      }
      return listing;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to remove listing');
    }
  }
}
