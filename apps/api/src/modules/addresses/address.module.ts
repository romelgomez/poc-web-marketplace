import { Module } from '@nestjs/common';
import { AddressRepository } from './address.repository';
import { AddressResolver } from './address.resolver';
import { AddressService } from './address.service';

@Module({
  providers: [AddressService, AddressResolver, AddressRepository],
})
export class AddressModule {}
