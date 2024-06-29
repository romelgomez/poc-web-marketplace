import { Injectable } from '@nestjs/common';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { PrismaService } from '../prisma/prisma.service';
import type { MediaInput } from './media.input';

@Injectable()
export class MediaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMediaDto: MediaInput) {
    return this.prisma.media.create({
      data: createMediaDto,
    });
  }

  async findAll() {
    return this.prisma.media.findMany();
  }

  async findOne(id: string) {
    return this.prisma.media.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateMediaDto: MediaInput) {
    return this.prisma.media.update({
      where: { id },
      data: updateMediaDto,
    });
  }

  async remove(id: string) {
    return this.prisma.media.delete({
      where: { id },
    });
  }
}
