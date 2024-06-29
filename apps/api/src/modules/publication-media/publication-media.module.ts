import { Module } from '@nestjs/common';
import { PublicationMediaRepository } from './publication-media.repository';
import { PublicationMediaResolver } from './publication-media.resolver';
import { PublicationMediaService } from './publication-media.service';

@Module({
  providers: [
    PublicationMediaService,
    PublicationMediaResolver,
    PublicationMediaRepository,
  ],
})
export class PublicationMediaModule {}
