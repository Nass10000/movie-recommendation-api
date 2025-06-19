// back/src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(JwtStrategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    // 1️⃣ Extrae el secreto JWT antes de llamar a super()
    const secret = configService.get<string>('JWT_SECRET');

    // 2️⃣ Prepara las opciones para la estrategia (sin anotación de tipo explícita)
    const opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    };

    // 3️⃣ Inicializa la estrategia con las opciones
    super(opts);

    console.log('✅ [JwtAuthStrategy] initialized with secret:', secret);
  }

  // 4️⃣ Método validate que devuelve el payload decodificado
  async validate(payload: any) {
    console.log('🔵 [JwtAuthStrategy] payload:', payload);
    return {
      userId: payload.sub,
      username: payload.username,
    };
  }
}
