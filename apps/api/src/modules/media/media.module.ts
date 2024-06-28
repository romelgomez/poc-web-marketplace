import { Module } from '@nestjs/common';
import { MediaRepository } from './media.repository';
import { MediaResolver } from './media.resolver';
import { MediaService } from './media.service';

@Module({
  providers: [MediaService, MediaResolver, MediaRepository],
})
export class MediaModule {}
