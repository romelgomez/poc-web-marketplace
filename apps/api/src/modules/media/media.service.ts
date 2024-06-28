import { Injectable } from '@nestjs/common';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { PrismaService } from '../prisma/prisma.service';
import type { MediaInput } from './media.input';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}

  async create(data: MediaInput) {
    return this.prisma.media.create({
      data: data,
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

  async update(data: MediaInput) {
    const { id, ...rest } = data;

    return this.prisma.media.update({
      where: { id },
      data: rest,
    });
  }

  async remove(id: string) {
    return this.prisma.media.delete({
      where: { id },
    });
  }
}
