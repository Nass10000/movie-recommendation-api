// movies.service.ts
import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movies.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { UsersService } from '../users/users.service';
import { UserRole } from '../common/role.enum';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepo: Repository<Movie>,
    private readonly usersService: UsersService,
  ) {}

  create(dto: CreateMovieDto) {
    const movie = this.movieRepo.create(dto);
    return this.movieRepo.save(movie);
  }

  async createByUser(userId: string, dto: CreateMovieDto) {
    const user = await this.usersService.findById(userId);
    if (!user || user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Solo los administradores pueden crear películas');
    }
    return this.create(dto);
  }

  findAll() {
    return this.movieRepo.find();
  }

  findOne(id: string) {
    return this.movieRepo.findOneBy({ id });
  }

  update(id: string, dto: UpdateMovieDto) {
    return this.movieRepo.update(id, dto);
  }

  remove(id: string) {
    return this.movieRepo.delete(id);
  }
}
