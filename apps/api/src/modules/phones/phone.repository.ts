import { Injectable } from '@nestjs/common';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { PrismaService } from '../prisma/prisma.service';
import type { PhoneInput } from './phone.input';

@Injectable()
export class PhoneRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: PhoneInput) {
    return this.prisma.phone.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.phone.findMany();
  }

  async findOne(id: string) {
    return this.prisma.phone.findUnique({
      where: { id },
    });
  }

  async update(data: PhoneInput) {
    const { id, ...rest } = data;

    return this.prisma.phone.update({
      where: { id },
      data: rest,
    });
  }

  async remove(id: string) {
    return this.prisma.phone.delete({
      where: { id },
    });
  }
}
