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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('movies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiOperation({ summary: 'Crear una nueva película' })
  @ApiResponse({ status: 201, description: 'Película creada correctamente.' })
  @ApiBody({ type: CreateMovieDto })
  @Post()
  create(@Body() dto: CreateMovieDto) {
    console.log('POST /movies', dto); // 👈 log para debug
    return this.moviesService.create(dto);
  }

  @ApiOperation({ summary: 'Obtener todas las películas' })
  @ApiResponse({ status: 200, description: 'Lista de películas.' })
  @Get()
  findAll() {
    console.log('GET /movies'); // 👈 log para debug
    return this.moviesService.findAll();
  }

  @ApiOperation({ summary: 'Obtener una película por ID' })
  @ApiResponse({ status: 200, description: 'Película encontrada.' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID de la película' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(`GET /movies/${id}`); // 👈 log para debug
    return this.moviesService.findOne(id);
  }

  @ApiOperation({ summary: 'Obtener el rating promedio de una película' })
  @ApiResponse({ status: 200, description: 'Rating promedio obtenido.' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID de la película' })
  @Get(':id/rating')
  async getAverageRating(@Param('id') id: string) {
    console.log(`GET /movies/${id}/rating`); // 👈 log para debug
    return { averageRating: await this.moviesService.getAverageRating(id) };
  }

  @ApiOperation({ summary: 'Actualizar una película' })
  @ApiResponse({ status: 200, description: 'Película actualizada correctamente.' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID de la película' })
  @ApiBody({ type: UpdateMovieDto })
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMovieDto) {
    console.log(`PUT /movies/${id}`, dto); // 👈 log para debug
    return this.moviesService.update(id, dto);
  }

  @ApiOperation({ summary: 'Eliminar una película (solo admin)' })
  @ApiResponse({ status: 200, description: 'Película eliminada correctamente.' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID de la película' })
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    console.log(`DELETE /movies/${id}`); // 👈 log para debug
    return this.moviesService.remove(id);
  }
}
