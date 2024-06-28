import { Module } from '@nestjs/common';
import { PhoneRepository } from './phone.repository';
import { PhoneResolver } from './phone.resolver';
import { PhoneService } from './phone.service';

@Module({
  providers: [PhoneService, PhoneResolver, PhoneRepository],
})
export class PhoneModule {}
