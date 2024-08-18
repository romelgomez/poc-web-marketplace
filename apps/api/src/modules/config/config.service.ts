import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { BadRequestException, Injectable } from '@nestjs/common';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { ConfigService } from '@nestjs/config';
import type { EnvironmentConfig } from './config.types';

import {
  DatabaseTypeEnum,
  EnvironmentEnum,
  ProcessEnvEnum,
} from './config.types';

@Injectable()
export class AppConfigService {
  private environmentConfig: EnvironmentConfig;

  constructor(private config: ConfigService) {
    const environment =
      (this.getEnvVal(ProcessEnvEnum.NODE_ENV) as EnvironmentEnum) ||
      EnvironmentEnum.Development;

    this.environmentConfig = {
      environment,
      port: Number.parseInt(this.getEnvVal(ProcessEnvEnum.PORT), 10) || 3001,
      database: {
        type: DatabaseTypeEnum.Postgres,
        host: this.getEnvVal(ProcessEnvEnum.PGHOST),
        port: Number.parseInt(this.getEnvVal(ProcessEnvEnum.PGPORT), 10),
        username: this.getEnvVal(ProcessEnvEnum.PGUSER),
        password: this.getEnvVal(ProcessEnvEnum.PGPASSWORD),
        database: this.getEnvVal(ProcessEnvEnum.PGDATABASE),
        synchronize: environment === EnvironmentEnum.Development,
        autoLoadEntities: true,
      },
      meili: {
        host: this.getEnvVal(ProcessEnvEnum.MEILI_HOST),
        apiKey: this.getEnvVal(ProcessEnvEnum.MEILI_KEY),
      },
      clerk: {
        issuerURL: this.getEnvVal(ProcessEnvEnum.CLERK_ISSUER_URL),
      },
    };
  }

  public getEnvVal(key: ProcessEnvEnum): string {
    const secretPath = join('/run/secrets', key);
    if (existsSync(secretPath)) {
      return readFileSync(secretPath, 'utf8').trim();
    }

    const value = this.config.get<string>(key);
    if (!value) {
      throw new BadRequestException(
        `Environment variable ${key} is not defined`,
      );
    }
    return value;
  }

  public getPort(): number {
    return this.environmentConfig.port;
  }

  public getEnvironmentConfig(): EnvironmentConfig {
    return this.environmentConfig;
  }

  public getDatabaseConfig() {
    return this.environmentConfig?.database;
  }

  public getMeiliConfig() {
    return this.environmentConfig?.meili;
  }
}
