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
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { MoviesService } from '../movies/movies.service';
import { CreateMovieDto } from '../movies/dto/create-movie.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly moviesService: MoviesService,
  ) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
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

  @Post(':userId/movies')
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

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findById(id);
  }
}
