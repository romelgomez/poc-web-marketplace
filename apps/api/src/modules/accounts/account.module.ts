import { Global, Module } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { AccountResolver } from './account.resolver';
import { AccountService } from './account.service';

@Global()
@Module({
  imports: [],
  providers: [AccountRepository, AccountResolver, AccountService],
  exports: [AccountService],
})
export class AccountModule {}
