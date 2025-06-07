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
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.usersService.register(dto);
  }

  @ApiOperation({ summary: 'Crear usuario (alias de register)' })
  @ApiResponse({ status: 201, description: 'Usuario creado correctamente.' })
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
  @ApiParam({ name: 'userId', type: 'string', description: 'ID del usuario' })
  @ApiBody({ type: CreateMovieDto })
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

  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios.' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado.' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del usuario' })
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findById(id);
  }
}
