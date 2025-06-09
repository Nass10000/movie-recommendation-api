import { Controller, Post, Body, UseGuards, Request, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado correctamente.' })
  @ApiBody({ type: RegisterDto })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    console.log('📥 Datos recibidos en /auth/register:', registerDto);
    return this.usersService.create(registerDto);
  }

  @ApiOperation({ summary: 'Login de usuario' })
  @ApiResponse({ status: 201, description: 'Login exitoso, retorna JWT.' })
  @ApiBody({ type: LoginDto })
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

  @ApiOperation({ summary: 'Redirige a Auth0 para login social (selector)' })
  @ApiResponse({ status: 200, description: 'Redirección a Auth0.' })
  @Get('auth0')
  @UseGuards(AuthGuard('auth0'))
  auth0Login() {
    // redirige a selector social
    console.log('🔔 Auth0 login genérico');
  }

  @ApiOperation({ summary: 'Callback de Auth0 (genérico)' })
  @ApiResponse({ status: 200, description: 'Usuario autenticado por Auth0.' })
  @Get('auth0/callback')
  @UseGuards(AuthGuard('auth0'))
  auth0Callback(@Req() req: any) {
    console.log('🎉 Callback genérico, user:', req.user);
    return req.user;
  }

  @ApiOperation({ summary: 'Login directo con Google (Auth0)' })
  @ApiResponse({ status: 200, description: 'Redirección a Google login.' })
  @Get('login/google')
  @UseGuards(AuthGuard('auth0-google'))
  googleLogin() {}

  @ApiOperation({ summary: 'Login directo con Facebook (Auth0)' })
  @ApiResponse({ status: 200, description: 'Redirección a Facebook login.' })
  @Get('login/facebook')
  @UseGuards(AuthGuard('auth0-facebook'))
  facebookLogin() {}

  @ApiOperation({ summary: 'Callback general para login social' })
  @ApiResponse({ status: 200, description: 'Usuario autenticado por login social.' })
  @Get('callback')
  @UseGuards(AuthGuard('auth0'))
  socialCallback(@Req() req: any) {
    console.log('✅ Social login completado, user:', req.user);
    return req.user;
  }
}
