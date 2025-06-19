// back/src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users/users.entity';
import { UsersModule } from '../users/users.module';

import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { Auth0GoogleStrategy } from './auth0-google.strategy';
import { LocalAuthGuard } from './local-auth.guard';
import { GoogleStrategy } from './passport-google-oauth20';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET')!,
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    Auth0GoogleStrategy,
    GoogleStrategy,
    LocalAuthGuard,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {
  constructor(private readonly configService: ConfigService) {
    console.log('✅ AuthModule cargado');
    console.log('🔑 AUTH0_DOMAIN:', this.configService.get<string>('AUTH0_DOMAIN'));
    console.log('🔑 AUTH0_CLIENT_ID:', this.configService.get<string>('AUTH0_CLIENT_ID'));
    console.log('🔑 AUTH0_CALLBACK_URL:', this.configService.get<string>('AUTH0_CALLBACK_URL'));
  }
}
