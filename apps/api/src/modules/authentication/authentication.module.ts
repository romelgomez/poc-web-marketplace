import { Global, Module } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';

@Global()
@Module({
  providers: [JwtStrategy, JwtAuthGuard],
})
export class AuthenticationModule {}
