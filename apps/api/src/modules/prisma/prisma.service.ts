// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { AppConfigService } from 'src/modules/config/config.service';
import { PrismaClient } from '@prisma/client';
import { ProcessEnvEnum } from 'src/modules/config/config.types';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(protected appConfigService: AppConfigService) {
    const host = appConfigService.getEnvVal(ProcessEnvEnum.DATABASE_HOST);
    const port = appConfigService.getEnvVal(ProcessEnvEnum.DATABASE_PORT);
    const user = appConfigService.getEnvVal(ProcessEnvEnum.DATABASE_USER);
    const password = appConfigService.getEnvVal(
      ProcessEnvEnum.DATABASE_PASSWORD,
    );
    const databaseName = appConfigService.getEnvVal(
      ProcessEnvEnum.DATABASE_NAME,
    );

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
