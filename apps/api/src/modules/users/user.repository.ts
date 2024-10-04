import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { RoleType, User } from '@prisma/client';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { PrismaService } from '../prisma/prisma.service';
import type { UserInput } from './user.input';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(user: UserInput) {
    const { id, ...rest } = user;

    if (!id) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return this.prisma.user.update({
      where: { id },
      data: rest,
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async updateUser(user: UserInput): Promise<User> {
    const { id, ...rest } = user;

    if (!id) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    // Check if the user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID "${existingUser}" not found`);
    }

    // Update user details
    return this.prisma.user.update({
      where: { id },
      data: rest,
    });
  }

  // - search USER by email
  // - if user exist FAIL the request
  // create USER

  async createNewUserOrFail(userData: UserInput) {
    const { id, ...restUserData } = userData;

    // Check if the user already exists
    const existingUser = await this.prisma.user.findFirst({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // Create new user
    const user = await this.prisma.user.create({ data: restUserData });

    return user;
  }

  // this stand for create a new user for the account
  async createUser(
    userData: UserInput,
    accountId: string,
    roleType: RoleType,
  ): Promise<User> {
    const { id, ...restUserData } = userData;

    // Ensure valid account
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new BadRequestException('Invalid account ID');
    }

    // Check if the user already exists
    const existingUser = await this.prisma.user.findFirst({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // Create new user
    const user = await this.prisma.user.create({ data: restUserData });

    // Create role for the user
    const role = await this.prisma.role.create({
      data: {
        userId: user.id,
        accountId,
        role: roleType,
        assigned: new Date(),
      },
    });

    // Update the account with the new role
    await this.prisma.account.update({
      where: { id: accountId },
      data: {
        roles: {
          connect: { id: role.id }, // Assuming 'roles' is a relation field in 'Account'
        },
      },
    });

    await this.prisma.listing.create({
      data: {
        account: {
          connect: {
            id: account.id,
          },
        },
      },
    });

    return user;
  }
}
