import { Global, Module } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { RoleService } from './role.service';

@Global()
@Module({
  imports: [],
  providers: [RoleService, RoleRepository],
  exports: [RoleService],
})
export class RoleModule {}
