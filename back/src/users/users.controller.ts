// users.controller.ts
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { MoviesService } from '../movies/movies.service';
import { CreateMovieDto } from '../movies/dto/create-movie.dto';
import { Roles } from '../common/roles.decorator';
import { RoleGuard } from '../common/role.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserRole } from '../common/role.enum';
import { RegisterDto } from '../auth/dto/register.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly moviesService: MoviesService,
  ) {}

  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado correctamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.usersService.register(dto);
  }

  @ApiOperation({ summary: 'Crear usuario (alias de register)' })
  @ApiResponse({ status: 201, description: 'Usuario creado correctamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @Post()
  async create(@Body() dto: RegisterDto) {
    try {
      const user = await this.usersService.register(dto);
      return { message: 'Usuario creado', user };
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Unknown error',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Crear película como admin para un usuario' })
  @ApiResponse({ status: 201, description: 'Película creada por admin.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado. Solo admin.' })
  @ApiParam({ name: 'userId', type: 'string', description: 'ID del usuario' })
  @ApiBody({ type: CreateMovieDto })
  // Solo ADMIN puede crear películas para otros usuarios
  @Post(':userId/movies')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async createMovie(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() dto: CreateMovieDto,
  ) {
    try {
      const movie = await this.moviesService.createByUser(userId, dto);
      return { message: 'Película creada por admin', movie };
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Unknown error',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  // Solo USER puede comentar películas (ejemplo)
  @Post(':userId/comments')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.USER)
  async commentMovie(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() commentDto: { movieId: string; comment: string; rating: number },
  ) {
    // Aquí iría la lógica para agregar un comentario y rating a una película
    return { message: 'Comentario agregado', ...commentDto };
  }

  // ADMIN y USER pueden ver todos los usuarios
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios.' })
  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  findAll() {
    return this.usersService.findAll();
  }

  // ADMIN y USER pueden ver usuario por ID
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado.' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del usuario' })
  @Get(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findById(id);
  }
}
