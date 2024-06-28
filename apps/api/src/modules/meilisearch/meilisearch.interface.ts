import type {
  InjectionToken,
  ModuleMetadata,
  OptionalFactoryDependency,
  Provider,
  Type,
} from '@nestjs/common';
import type { Config } from 'meilisearch';

export interface MeiliModuleOptions {
  host: string;
  apiKey?: string;
  headers?: object;
}
export interface MeiliModuleOptionsFactory {
  createMeiliOptions(): Promise<Config> | Config;
}

export interface MeiliModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<MeiliModuleOptionsFactory>;
  useClass?: Type<MeiliModuleOptionsFactory>;
  useFactory?: (...args: unknown[]) => Promise<Config> | Config;
  inject?: (InjectionToken | OptionalFactoryDependency)[];
  extraProviders?: Provider[];
}
