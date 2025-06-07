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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../common/role.guard';
import { Roles } from '../common/roles.decorator';
import { UserRole } from '../common/role.enum';

@UseGuards(JwtAuthGuard)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() dto: CreateMovieDto) {
    console.log('POST /movies', dto); // 👈 log para debug
    return this.moviesService.create(dto);
  }

  @Get()
  findAll() {
    console.log('GET /movies'); // 👈 log para debug
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(`GET /movies/${id}`); // 👈 log para debug
    return this.moviesService.findOne(id);
  }

  @Get(':id/rating')
  async getAverageRating(@Param('id') id: string) {
    console.log(`GET /movies/${id}/rating`); // 👈 log para debug
    return { averageRating: await this.moviesService.getAverageRating(id) };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMovieDto) {
    console.log(`PUT /movies/${id}`, dto); // 👈 log para debug
    return this.moviesService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    console.log(`DELETE /movies/${id}`); // 👈 log para debug
    return this.moviesService.remove(id);
  }
}
