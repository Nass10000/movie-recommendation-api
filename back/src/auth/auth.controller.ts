import { Controller, Post, UseGuards, Body, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    console.log('POST /auth/login', req.user); // 👈 log para debug
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() createUserDto: RegisterDto) {
    console.log('POST /auth/register', createUserDto); // 👈 log para debug
    return this.authService.register(createUserDto);
  }
}