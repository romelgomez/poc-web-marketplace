// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { AppConfigService } from '../config/config.service';
import { PrismaClient } from '@prisma/client';
import { ProcessEnvEnum } from '../config/config.types';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(protected appConfigService: AppConfigService) {
    const host = appConfigService.getEnvVal(ProcessEnvEnum.PGHOST);
    const port = appConfigService.getEnvVal(ProcessEnvEnum.PGPORT);
    const user = appConfigService.getEnvVal(ProcessEnvEnum.PGUSER);
    const password = appConfigService.getEnvVal(ProcessEnvEnum.PGPASSWORD);
    const databaseName = appConfigService.getEnvVal(ProcessEnvEnum.PGDATABASE);

    const databaseUrl = `postgresql://${user}:${password}@${host}:${port}/${databaseName}?schema=public`;

    super({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
