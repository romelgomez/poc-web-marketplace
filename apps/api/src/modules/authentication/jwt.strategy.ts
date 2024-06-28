import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { AppConfigService } from '../config/config.service';
import { ProcessEnvEnum } from '../config/config.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(protected appConfigService: AppConfigService) {
    const issuerURL = appConfigService.getEnvVal(
      ProcessEnvEnum.CLERK_ISSUER_URL,
    );

    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 20,
        jwksUri: `${issuerURL}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: `${issuerURL}`,
      algorithms: ['RS256'],
    });

    console.log('JwtStrategy initialized');
  }

  validate(payload: unknown): unknown {
    // payload {
    //   azp: 'http://localhost:3000',
    //   email: 'bmxandcode@gmail.com',
    //   exp: 1708902992,
    //   firstName: 'Romel',
    //   iat: 1708902932,
    //   iss: 'https://hardy-weasel-66.clerk.accounts.dev',
    //   jti: '07939acbc8ed86e1bed8',
    //   lastName: 'Gomez',
    //   nbf: 1708902927,
    //   sub: 'user_2clqVtEFXVvFhrvmZgDo31yTbWD'
    // }

    // This one is really useful to check the jwt payload!
    // console.log('Validating payload:', payload);
    return payload;
  }
}
