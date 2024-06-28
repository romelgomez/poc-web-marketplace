import { BadRequestException, Injectable } from '@nestjs/common';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { PrismaService } from '../prisma/prisma.service';
import type { AddressInput } from './address.input';

@Injectable()
export class AddressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: AddressInput) {
    const { id, ...rest } = data;

    return this.prisma.address.create({
      data: rest,
    });
  }

  async findAll() {
    return this.prisma.address.findMany();
  }

  async findOne(id: string) {
    return this.prisma.address.findUnique({
      where: { id },
    });
  }

  async update(data: AddressInput) {
    const { id, ...rest } = data;

    if (!id) {
      throw new BadRequestException(`Account ID "${id}" is required.`);
    }

    return this.prisma.address.update({
      where: { id },
      data: rest,
    });
  }

  async remove(id: string) {
    return this.prisma.address.delete({
      where: { id },
    });
  }
}
