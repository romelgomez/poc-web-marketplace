import { Injectable } from '@nestjs/common';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { PrismaService } from '../prisma/prisma.service';
import type { Listing } from './listing.entity';
import type { ListingInput } from './listing.input';

@Injectable()
export class ListingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ListingInput) {
    return this.prisma.listing.create({
      data,
    });
  }

  async update(data: ListingInput) {
    const { id, ...rest } = data;

    return this.prisma.listing.update({
      where: { id },
      data: {
        ...rest,
        modified: new Date(),
      },
    });
  }

  async remove(id: string) {
    return this.prisma.listing.delete({
      where: { id },
    });
  }

  async findAll() {
    return this.prisma.listing.findMany();
  }

  async findOne(id: string): Promise<Listing | null> {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
    });

    return listing;
  }
}
