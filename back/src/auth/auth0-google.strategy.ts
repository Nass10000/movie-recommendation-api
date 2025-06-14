import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-auth0';
import { Profile } from 'passport';

@Injectable()
export class Auth0GoogleStrategy extends PassportStrategy(Strategy, 'auth0-google') {
  constructor() {
    super({
      domain:       process.env.AUTH0_DOMAIN,
      clientID:     process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL:  process.env.AUTH0_CALLBACK_URL,
      scope:        'openid profile email',
      state:        false,
    });
    console.log('✅ Google Strategy initialized:', {
      domain:      process.env.AUTH0_DOMAIN,
      callbackURL: process.env.AUTH0_CALLBACK_URL
    });
  }

  // Fuerza la conexión Google
  authorizationParams(): Record<string, string> {
    return { connection: 'google-oauth2' };
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    extraParams: any,
    profile: Profile
  ): Promise<any> {
    // Imprime el perfil completo para depuración
    console.log('🔵 Perfil recibido en validate:', JSON.stringify(profile, null, 2));
    return profile; // Devuelve el perfil completo
  }
}
