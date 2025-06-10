import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

import * as bcrypt from 'bcrypt';
import { User } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    console.log('🔍 Buscando usuario:', username);
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      console.error('❌ Usuario no encontrado:', username);
      throw new UnauthorizedException('Invalid credentials');
    }
    const match = await bcrypt.compare(password, user.password);
    console.log('🔑 Contraseña coincide:', match);
    if (!match) {
      console.error('❌ Contraseña incorrecta para:', username);
      throw new UnauthorizedException('Invalid credentials');
    }
    // remove password before returning
    console.log('✅ Usuario validado, retornando:', { ...user, password: '***' });
    delete (user as any).password;
    return user;
  }

  async login(user: User): Promise<{ access_token: string }> {
    try {
      const payload = { username: user.username, sub: user.id, role: user.role };
      console.log('📋 Payload para JWT:', payload);
      const token = this.jwtService.sign(payload);
      console.log('✅ Token generado correctamente:', token);
      return {
        access_token: token,
      };
    } catch (err) {
      console.error('JWT sign error:', err);
      throw new InternalServerErrorException('Could not generate token');
    }
  }
}