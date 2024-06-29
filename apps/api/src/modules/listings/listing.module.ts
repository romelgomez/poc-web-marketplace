import { Global, Module } from '@nestjs/common';
import { ListingRepository } from './listing.repository';
import { ListingResolver } from './listing.resolver';
import { ListingService } from './listing.service';

@Global()
@Module({
  imports: [],
  providers: [ListingResolver, ListingService, ListingRepository],
  exports: [ListingService],
})
export class ListignsModule {}
