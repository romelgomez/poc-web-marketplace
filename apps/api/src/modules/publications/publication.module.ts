import { Module } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';
import { PublicationResolver } from './publication.resolver';
import { PublicationService } from './publication.service';

@Module({
  providers: [PublicationService, PublicationResolver, PublicationRepository],
})
export class PublicationModule {}
