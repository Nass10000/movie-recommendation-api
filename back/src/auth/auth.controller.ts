import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from './local-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.usersService.create(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    console.log('🔑 Login body:', req.body);
    console.log('👤 Usuario validado:', req.user);

    try {
      console.log('➡️ Llamando a AuthService.login con usuario:', req.user);
      const token = await this.authService.login(req.user);
      console.log('✅ Token generado:', token);
      return token;
    } catch (err) {
      console.error('❌ Error en AuthService.login():', err);
      throw err;
    }
  }
}
