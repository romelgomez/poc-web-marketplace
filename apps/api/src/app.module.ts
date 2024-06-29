import { join } from 'node:path';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AccountModule } from './modules/accounts/account.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { AppConfigModule } from './modules/config/config.module';
import { AppConfigService } from './modules/config/config.service';
import { ListignsModule } from './modules/listings/listing.module';
import { MediaModule } from './modules/media/media.module';
import { MeiliSearchModule } from './modules/meilisearch/meilisearch.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PublicationMediaModule } from './modules/publication-media/publication-media.module';
import { PublicationModule } from './modules/publications/publication.module';
import { RoleModule } from './modules/roles/role.module';
import { UserModule } from './modules/users/user.module';

// TODO:
// warning @nestjs/apollo > @apollo/server-plugin-landing-page-graphql-playground@4.0.0: The use of GraphQL Playground in Apollo Server was supported in previous versions, but this is no longer the case as of December 31, 2022. This package exists for v4 migration purposes only. We do not intend to resolve security issues or other bugs with this package if they arise, so please migrate away from this to [Apollo Server's default Explorer](https://www.apollographql.com/docs/apollo-server/api/plugin/landing-pages) as soon as possible

@Module({
  imports: [
    AuthenticationModule,
    AppConfigModule,
    PrismaModule,
    AccountModule,
    ListignsModule,
    MediaModule,
    UserModule,
    RoleModule,
    PublicationModule,
    PublicationMediaModule,
    MediaModule,

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => ({
        driver: ApolloDriver,
        // TODO remove the hardcode path
        // added at .nxignore to avoid reloading
        autoSchemaFile: join(process.cwd(), 'apps/api/src/schema.gql'),
        faviconUrl: '',
      }),
    }),

    MeiliSearchModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        const { host, apiKey } = appConfigService.getMeiliConfig();

        return {
          host,
          apiKey,
        };
      },
    }),

    // AuthModule.forRootAsync(),
  ],
})
export class AppModule {}
