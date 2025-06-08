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

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'auth0' }), // 👈 aquí agregas el defaultStrategy
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
  ],
  controllers: [AuthController],
})
export class AuthModule {}