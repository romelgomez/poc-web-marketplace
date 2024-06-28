import { Injectable } from '@nestjs/common';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { PrismaService } from '../prisma/prisma.service';
import type { PublicationMediaInput } from './publication-media.input';

@Injectable()
export class PublicationMediaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: PublicationMediaInput) {
    return this.prisma.publicationMedia.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.publicationMedia.findMany();
  }

  async findOne(id: string) {
    return this.prisma.publicationMedia.findUnique({
      where: { id },
    });
  }

  async update(data: PublicationMediaInput) {
    const { id, ...rest } = data;

    return this.prisma.publicationMedia.update({
      where: { id },
      data: rest,
    });
  }

  async remove(id: string) {
    return this.prisma.publicationMedia.delete({
      where: { id },
    });
  }
}
