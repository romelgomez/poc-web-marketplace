// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import {
  createConnectionFactory,
  createAsyncProviders,
} from './meilisearch.provider';
import { MEILI_CLIENT, MEILI_MODULE_OPTIONS } from './meilisearch.constants';
import { MeiliSearchService } from './meilisearch.service';
import type {
  MeiliModuleAsyncOptions,
  MeiliModuleOptions,
} from './meilisearch.interface';

@Global()
@Module({})
// biome-ignore lint/complexity/noStaticOnlyClass: to-do
export class MeiliSearchModule {
  public static forRoot(options: MeiliModuleOptions): DynamicModule {
    const meiliOptions: Provider = {
      provide: MEILI_MODULE_OPTIONS,
      useValue: options,
    };

    const connectionProvider: Provider = {
      provide: MEILI_CLIENT,
      useFactory: async () => await createConnectionFactory(options),
    };
    return {
      module: MeiliSearchModule,
      providers: [meiliOptions, connectionProvider, MeiliSearchService],
      exports: [connectionProvider, MeiliSearchService],
    };
  }

  public static forRootAsync(options: MeiliModuleAsyncOptions): DynamicModule {
    const connectionProvider: Provider = {
      provide: MEILI_CLIENT,
      useFactory: async (meiliOptions: MeiliModuleOptions) =>
        createConnectionFactory(meiliOptions),
      inject: [MEILI_MODULE_OPTIONS],
    };

    const asyncProviders = createAsyncProviders(options);

    return {
      module: MeiliSearchModule,
      imports: options.imports || [],
      providers: [...asyncProviders, connectionProvider, MeiliSearchService],
      exports: [connectionProvider, MeiliSearchService],
    };
  }
}
