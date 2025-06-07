import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...userObj } = user; // 👈 así excluyes password
      return userObj;
    }
    return null;
  }

  async login(user: any) {
    console.log('LOGIN USER:', user);
    const payload = { username: user.username, sub: user.id, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(dto: CreateUserDto) {
    return this.usersService.register(dto);
  }
}