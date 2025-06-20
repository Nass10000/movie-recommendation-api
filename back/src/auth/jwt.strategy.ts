// back/src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as JwtPassportStrategy } from 'passport-jwt';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(JwtPassportStrategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET')!;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
    console.log('✅ [JwtAuthStrategy] initialized with secret:', secret);
  }

  async validate(payload: any) {
    console.log('🔵 [JwtAuthStrategy] payload:', payload);
    return { sub: payload.sub, username: payload.username, role: payload.role }; // <-- AGREGA role
  }
}

// Este alias satisface el import:
//   import { JwtStrategy } from './jwt.strategy';
export { JwtAuthStrategy as JwtStrategy };
