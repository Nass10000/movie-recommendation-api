import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movies.entity';
// Update the import path if your DTOs are in a different file, for example:
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
// Or, if you don't have these files, create them in the 'dto' folder and export the DTO classes.

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepo: Repository<Movie>,
  ) {}

  create(dto: CreateMovieDto) {
    const movie = this.movieRepo.create(dto);
    return this.movieRepo.save(movie);
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
