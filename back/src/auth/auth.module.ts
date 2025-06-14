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
import { Auth0Strategy } from './auth0.strategy';
import { Auth0GoogleStrategy } from './auth0-google.strategy';
import { Auth0FacebookStrategy } from './auth0-facebook.strategy';
import { LocalAuthGuard } from './local-auth.guard';
import { GoogleStrategy } from './passport-google-oauth20';

@Module({
  imports: [
    ConfigModule,
PassportModule.register({}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule,
  ],
  providers: [
    AuthService,
    LocalAuthGuard,
    Auth0GoogleStrategy,
    Auth0FacebookStrategy,
    LocalStrategy,
    JwtStrategy,
    Auth0Strategy,
    GoogleStrategy
  ],
  controllers: [AuthController],
})
export class AuthModule {
  constructor() {
    console.log('✅ AuthModule cargado');
    console.log('🔑 AUTH0_DOMAIN:', process.env.AUTH0_DOMAIN);
    console.log('🔑 AUTH0_CLIENT_ID:', process.env.AUTH0_CLIENT_ID);
    console.log('🔑 AUTH0_CALLBACK_URL:', process.env.AUTH0_CALLBACK_URL);
  }
}