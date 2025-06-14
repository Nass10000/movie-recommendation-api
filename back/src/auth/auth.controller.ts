import { Controller, Post, Body, UseGuards, Req, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  // Genera un username único basado en el email
  private async generateUniqueUsername(base: string): Promise<string> {
    let username = base.split('@')[0];
    let counter = 1;

    while (await this.usersService.findOneByUsername(username)) {
      username = `${base.split('@')[0]}${counter}`;
      counter++;
    }

    return username;
  }

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
    const token = await this.authService.login(req.user);
    const user = await this.usersService.findById(req.user.id);
    const { password, ...userWithoutPassword } = user;
    return { ...token, user: userWithoutPassword };
  }

  // Inicia el flujo Auth0 - selector de social
  @ApiOperation({ summary: 'Redirige a Auth0 para login social (selector)' })
  @ApiResponse({ status: 302, description: 'Redirección a Auth0.' })
  @Get('auth0')
  @UseGuards(AuthGuard('auth0'))
  auth0Login() {
    console.log('🔔 Auth0 login genérico');
  }

  // Callback genérico de Auth0 (para login selector) con redirect
  @ApiOperation({ summary: 'Callback de Auth0 (genérico)' })
  @ApiResponse({ status: 302, description: 'Redirección al front con token.' })
  @Get('auth0/callback')
  @UseGuards(AuthGuard('auth0'))
  async auth0Callback(@Req() req: any, @Res() res: Response) {
    console.log('🎉 Auth0 genérico, user:', req.user);
    const { access_token: jwt } = await this.authService.login(req.user);
    console.log('🎯 JWT generado (genérico):', jwt);
    return res.redirect(
      `http://localhost:5173/auth/callback?token=${jwt}`
    );
  }

  // Login directo con Google via Auth0
  @ApiOperation({ summary: 'Login directo con Google (Auth0)' })
  @ApiResponse({ status: 302, description: 'Redirección a Google login.' })
  @Get('login/google')
  @UseGuards(AuthGuard('auth0-google'))
  googleLogin() {
    console.log('➡️ Entrando a /auth/login/google');
  }

  // Callback específico para Google (ruta nueva) con redirect
  @ApiOperation({ summary: 'Callback de Google OAuth via Auth0' })
  @ApiResponse({ status: 302, description: 'Redirección al front con token.' })
  @Get('login/google/callback')
  @UseGuards(AuthGuard('auth0-google'))
  async googleCallback(@Req() req: any, @Res() res: Response) {
    console.log('🎯 Google OAuth callback ejecutado, user:', req.user);

    const googleProfile = req.user;
    const email = googleProfile.emails?.[0]?.value;
    const name  = googleProfile.displayName || googleProfile.name?.givenName;

    let user = await this.usersService.findByEmail(email);
    if (!user) {
      const username = await this.generateUniqueUsername(email);
      user = await this.usersService.create({
        email,
        password: 'google-oauth',
        confirmPassword: 'google-oauth',
        fullName: name || email,
        username,
      });
    }

    const { access_token: jwt } = await this.authService.login(user);
    console.log('🎯 JWT generado (Google):', jwt);
    console.log('🎯 Redirigiendo a:', `http://localhost:5173/auth/callback?token=${jwt}`);

    return res.redirect(
      `http://localhost:5173/auth/callback?token=${jwt}`
    );
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
    const user = await this.usersService.findById(req.user.sub);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
