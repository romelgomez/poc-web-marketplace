import { BadRequestException, Injectable } from '@nestjs/common';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { PrismaService } from '../prisma/prisma.service';
import { RoleType } from '../roles/role.entity';
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

  async create(data: UserInput) {
    const user = await this.userService.createNewUserOrFail(data);

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

    // Create role for the user
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

    // Update the account with the new role
    await this.prisma.account.update({
      where: { id: account.id },
      data: {
        roles: {
          connect: { id: role.id },
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
