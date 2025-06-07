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
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // remove password before returning
    delete (user as any).password;
    return user;
  }

  async login(user: User): Promise<{ access_token: string }> {
    try {
      const payload = { username: user.username, sub: user.id, role: user.role };
      console.log('📋 Payload para JWT:', payload);
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (err) {
      console.error('JWT sign error:', err);
      throw new InternalServerErrorException('Could not generate token');
    }
  }
}