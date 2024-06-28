import { Injectable } from '@nestjs/common';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { PrismaService } from '../prisma/prisma.service';
import type { UserMediaInput } from './user-media.input';

@Injectable()
export class UserMediaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: UserMediaInput) {
    return this.prisma.userMedia.create({
      data: data,
    });
  }

  async findAll() {
    return this.prisma.userMedia.findMany();
  }

  async findOne(id: string) {
    return this.prisma.userMedia.findUnique({
      where: { id },
    });
  }

  async update(data: UserMediaInput) {
    const { id, ...rest } = data;

    return this.prisma.userMedia.update({
      where: { id },
      data: rest,
    });
  }

  async remove(id: string) {
    return this.prisma.userMedia.delete({
      where: { id },
    });
  }
}
