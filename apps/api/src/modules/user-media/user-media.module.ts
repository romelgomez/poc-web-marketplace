import { Module } from '@nestjs/common';
import { UserMediaRepository } from './user-media.repository';
import { UserMediaResolver } from './user-media.resolver';
import { UserMediaService } from './user-media.service';

@Module({
  providers: [UserMediaService, UserMediaResolver, UserMediaRepository],
})
export class UserMediaModule {}
