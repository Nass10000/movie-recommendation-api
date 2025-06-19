// back/src/auth/auth0.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  Profile,
  StrategyOptionsWithRequest,
} from 'passport-auth0';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Auth0StrategyHandler extends PassportStrategy(Strategy, 'auth0') {
  constructor(private readonly configService: ConfigService) {
    super({
      domain:       configService.get<string>('AUTH0_DOMAIN')!,
      clientID:     configService.get<string>('AUTH0_CLIENT_ID')!,
      clientSecret: configService.get<string>('AUTH0_CLIENT_SECRET')!,
      callbackURL:  configService.get<string>('AUTH0_CALLBACK_URL')!,
    } as StrategyOptionsWithRequest);
    console.log('✅ [Auth0Strategy] initialized');
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    extraParams: any,
    profile: Profile,
  ): Promise<any> {
    console.log('🔵 [Auth0Strategy] profile:', profile);
    return {
      id: profile.id,
      email: profile.emails?.[0]?.value,
      name: profile.displayName,
    };
  }
}
