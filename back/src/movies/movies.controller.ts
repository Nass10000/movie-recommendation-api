import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RoleGuard } from '../common/role.guard';
import { Roles } from '../common/roles.decorator';
import { UserRole } from '../common/role.enum';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  // @UseGuards(JwtAuthGuard, RoleGuard)
  // @Roles(UserRole.ADMIN)
  create(@Body() dto: CreateMovieDto) {
    return this.moviesService.create(dto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateMovieDto) {
    return this.moviesService.update(id, dto);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
