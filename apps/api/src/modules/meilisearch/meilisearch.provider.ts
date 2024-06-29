import type { Provider, Type } from '@nestjs/common';
import { MeiliSearch } from 'meilisearch';
import { MEILI_MODULE_OPTIONS } from './meilisearch.constants';
import type {
  MeiliModuleAsyncOptions,
  MeiliModuleOptions,
  MeiliModuleOptionsFactory,
} from './meilisearch.interface';

export function createConnectionFactory(options: MeiliModuleOptions) {
  return new MeiliSearch(options);
}

export function createAsyncProviders(
  options: MeiliModuleAsyncOptions,
): Provider[] {
  if (options.useExisting || options.useFactory) {
    return [createAsyncOptionsProvider(options)];
  }
  const useClass = options.useClass as Type<MeiliModuleOptionsFactory>;
  return [
    createAsyncOptionsProvider(options),
    {
      provide: useClass,
      useClass,
    },
  ];
}

export function createAsyncOptionsProvider(
  options: MeiliModuleAsyncOptions,
): Provider {
  if (options.useFactory) {
    return {
      provide: MEILI_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }

  return {
    provide: MEILI_MODULE_OPTIONS,
    useFactory: async (optionsFactory: MeiliModuleOptionsFactory) =>
      await optionsFactory.createMeiliOptions(),
    inject: [
      (options.useClass ||
        options.useExisting) as Type<MeiliModuleOptionsFactory>,
    ],
  };
}
