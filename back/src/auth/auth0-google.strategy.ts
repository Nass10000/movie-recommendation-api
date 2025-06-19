// src/auth/auth0-google.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptionsWithRequest, Profile } from 'passport-auth0';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Auth0GoogleStrategy extends PassportStrategy(
  Strategy,
  'auth0-google',
) {
  constructor(private readonly config: ConfigService) {
    super({
      domain:       config.get<string>('AUTH0_DOMAIN'),
      clientID:     config.get<string>('AUTH0_CLIENT_ID'),
      clientSecret: config.get<string>('AUTH0_CLIENT_SECRET'),
      callbackURL:  config.get<string>('AUTH0_CALLBACK_URL'),
      scope:        'openid profile email',
      state:        false,
    } as StrategyOptionsWithRequest);

    console.log('✅ Google Strategy initialized:', {
      domain:      config.get<string>('AUTH0_DOMAIN'),
      callbackURL: config.get<string>('AUTH0_CALLBACK_URL'),
    });
  }

  authorizationParams(): Record<string, string> {
    return { connection: 'google-oauth2' };
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    extraParams: any,
    profile: Profile,
  ): Promise<any> {
    console.log('🔵 Perfil recibido en validate:', profile);
    return profile;
  }
}
