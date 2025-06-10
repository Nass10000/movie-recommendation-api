// movies.service.ts
import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm'; // 👈 importa DataSource
import { Movie } from './movies.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { UsersService } from '../users/users.service';
import { UserRole } from '../common/role.enum';
import { CommentsService } from '../comments/comments.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepo: Repository<Movie>,
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource, // 👈 inyecta DataSource
    private readonly commentsService: CommentsService, // <--- agrega esto
  ) {}

  async create(dto: CreateMovieDto) {
    console.log("🎬 DTO recibido:", dto);
    try {
      const movie = this.movieRepo.create(dto);
      const saved = await this.movieRepo.save(movie);
      console.log("✅ Película guardada:", saved);
      return saved;
    } catch (error) {
      if (error instanceof Error) {
        console.log("❌ Error al crear movie:", error.message);
      } else {
        console.log("❌ Error al crear movie:", error);
      }
      throw new Error("Error interno al guardar la película");
    }
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

  async getAverageRating(movieId: string): Promise<number | null> {
    const result = await this.dataSource
      .getRepository('Comment')
      .createQueryBuilder('comment')
      .select('AVG(comment.rating)', 'avg')
      .where('comment.movieId = :movieId', { movieId })
      .andWhere('comment.rating IS NOT NULL')
      .getRawOne();

    return result && result.avg !== null ? parseFloat(result.avg) : null;
  }

  async addComment(movieId: string, userId: string, commentDto: { content: string; rating: number }) {
    // Llama al servicio de comentarios para guardar el comentario
    return this.commentsService.create(
      {
        content: commentDto.content, // <-- usa 'content'
        rating: commentDto.rating,
        movieId,
      },
      userId
    );
  }
}
