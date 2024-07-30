export enum EnvironmentEnum {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export enum DatabaseTypeEnum {
  Postgres = 'postgres',
}

export type EnvironmentConfig = {
  environment: EnvironmentEnum;
  port: number;
  database: {
    type: DatabaseTypeEnum;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
    synchronize: boolean;
    autoLoadEntities: boolean;
  };
  meili: {
    host: string;
    apiKey: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
  clerk: {
    issuerURL: string;
  };
};

export enum ProcessEnvEnum {
  NODE_ENV = 'NODE_ENV',
  PORT = 'PORT',

  DATABASE_HOST = 'DATABASE_HOST',
  DATABASE_PORT = 'DATABASE_PORT',
  DATABASE_USER = 'DATABASE_USER',
  DATABASE_PASSWORD = 'DATABASE_PASSWORD',
  DATABASE_NAME = 'DATABASE_NAME',

  MEILI_HOST = 'MEILI_HOST',
  MEILI_PORT = 'MEILI_PORT',
  MEILI_KEY = 'MEILI_KEY',

  JWT_SECRET = 'JWT_SECRET',
  JWT_EXPIRATION_TIME = 'JWT_EXPIRATION_TIME',

  AT_SECRET = 'AT_SECRET',
  RT_SECRET = 'RT_SECRET',

  CLERK_ISSUER_URL = 'CLERK_ISSUER_URL',
}
