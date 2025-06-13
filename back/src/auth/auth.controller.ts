import { Controller, Post, Body, UseGuards, Request, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';

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
  async login(@Req() req: any) {
    console.log('🔑 Login body:', req.body);
    console.log('👤 Usuario validado:', req.user);
    try {
      console.log('➡️ Llamando a AuthService.login con usuario:', req.user);
      const token = await this.authService.login(req.user);
      const user = await this.usersService.findById(req.user.id);
      const { password, ...userWithoutPassword } = user;
      return { ...token, user: userWithoutPassword };
    } catch (err) {
      console.error('❌ Error en AuthService.login():', err);
      throw err;
    }
  }

  // Inicia el flujo Auth0 - selector de social
  @ApiOperation({ summary: 'Redirige a Auth0 para login social (selector)' })
  @ApiResponse({ status: 302, description: 'Redirección a Auth0.' })
  @Get('auth0')
  @UseGuards(AuthGuard('auth0'))
  auth0Login() {
    console.log('🔔 Auth0 login genérico');
  }

  // Callback genérico de Auth0 (para login selector)
  @ApiOperation({ summary: 'Callback de Auth0 (genérico)' })
  @ApiResponse({ status: 200, description: 'Usuario autenticado por Auth0.' })
  @Get('auth0/callback')
  @UseGuards(AuthGuard('auth0'))
  auth0Callback(@Req() req: any) {
    console.log('🎉 Auth0 genérico, user:', req.user);
    return req.user;
  }

  // Login directo con Google via Auth0
  @ApiOperation({ summary: 'Login directo con Google (Auth0)' })
  @ApiResponse({ status: 302, description: 'Redirección a Google login.' })
  @Get('login/google')
  @UseGuards(AuthGuard('auth0-google'))
  googleLogin() {
    console.log('➡️ Entrando a /auth/login/google');
  }

  // Callback específico para Google
  @ApiOperation({ summary: 'Callback de Google OAuth via Auth0' })
  @ApiResponse({ status: 200, description: 'Usuario autenticado por Google.' })
  @Get('auth0/callback')
  @UseGuards(AuthGuard('auth0-google'))
  googleCallback(@Req() req: any) {
    console.log('🎯 Google OAuth callback, user:', req.user);
    return req.user;
  }

  // Login directo con Facebook via Auth0
  @ApiOperation({ summary: 'Login directo con Facebook (Auth0)' })
  @ApiResponse({ status: 302, description: 'Redirección a Facebook login.' })
  @Get('login/facebook')
  @UseGuards(AuthGuard('auth0-facebook'))
  facebookLogin() {
    console.log('➡️ Entrando a /auth/login/facebook');
  }

  @ApiOperation({ summary: 'Obtener perfil del usuario' })
  @ApiResponse({ status: 200, description: 'Información del usuario.' })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: any) {
    console.log('🟢 /auth/me llamado');
    console.log('Token user.sub:', req.user.sub);
    const user = await this.usersService.findById(req.user.sub);
    console.log('Usuario encontrado:', user);
    if (!user) return null;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
