import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-auth0';
import { Profile } from 'passport';

@Injectable()
export class Auth0FacebookStrategy extends PassportStrategy(Strategy, 'auth0-facebook') {
  constructor() {
    super({
      domain:       process.env.AUTH0_DOMAIN,
      clientID:     process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL:  process.env.AUTH0_CALLBACK_URL,
      scope:        'openid profile email',
      connection:   'facebook',
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    extraParams: any,
    profile: Profile,
    done: Function
  ) {
    console.log('✅ User profile:', profile);
    done(null, profile);
  }
}
