import { BadRequestException, Injectable } from '@nestjs/common';
import { RoleType } from '@prisma/client';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { PrismaService } from '../prisma/prisma.service';
import type { UserInput } from '../users/user.input';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { UserService } from '../users/user.service';
import type { Account } from './account.entity';
import type { AccountInput } from './account.input';

@Injectable()
export class AccountRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  // stage 1 - create user
  // stage 2 - create account
  // stage 3 - create role, link with user, link with account
  // stage 4 - link the account with role
  // stage 5 - create the default listing

  // create USER or FAIL
  // create ACCOUNT
  // link ACCOUNT with USER
  // create ROLE
  // link ROLE with USER
  // link ROLE with ACCOUNT
  // link ACCOUNT with ROLE
  // create LISTING
  // link LISTING with ACCOUNT

  async create(data: UserInput) {
    // stage 1 - create user
    const user = await this.userService.createNewUserOrFail(data);

    // stage 2 - create account
    const account = await this.prisma.account.create({
      data: {
        name: `${user.firstName} account`,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    // stage 3 - create role, link with user, link with account
    const role = await this.prisma.role.create({
      data: {
        role: RoleType.OWNER,
        assigned: new Date(),
        user: {
          connect: {
            id: user.id,
          },
        },
        account: {
          connect: {
            id: account.id,
          },
        },
      },
    });

    // stage 4 - link the account with role
    await this.prisma.account.update({
      where: { id: account.id },
      data: {
        roles: {
          connect: { id: role.id },
        },
      },
    });

    // stage 5 - create the default listing
    await this.prisma.listing.create({
      data: {
        account: {
          connect: {
            id: account.id,
          },
        },
      },
    });

    return account;
  }

  async findAll() {
    return this.prisma.account.findMany();
  }

  async findOne(id: string) {
    return this.prisma.account.findUnique({
      where: { id },
    });
  }

  async update(updateAccountDto: AccountInput) {
    const { id, ...rest } = updateAccountDto;

    if (!id) {
      throw new BadRequestException(`Account ID "${id}" is required.`);
    }

    await this.prisma.account.findFirstOrThrow({
      where: {
        id,
      },
    });

    return this.prisma.account.update({
      where: { id },
      data: rest,
    });
  }

  async remove(id: string) {
    return this.prisma.account.delete({
      where: { id },
    });
  }

  async findForUserEmail(email: string): Promise<Account | null> {
    const account = await this.prisma.account.findFirst({
      where: {
        user: {
          email: email,
        },
      },
      include: {
        user: true,
        listings: true,
      },
    });

    return account;
  }
}
