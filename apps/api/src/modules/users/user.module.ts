import { Global, Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Global()
@Module({
  providers: [UserService, UserResolver, UserRepository],
  exports: [UserService],
})
export class UserModule {}
