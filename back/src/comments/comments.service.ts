import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comments.entity';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Movie } from '../movies/movies.entity';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { UserRole } from '../common/role.enum';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,
    @InjectRepository(Movie)
    private movieRepo: Repository<Movie>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private readonly usersService: UsersService,
  ) {}

  async create(dto: CreateCommentDto): Promise<Comment> {
    try {
      const movie = await this.movieRepo.findOneBy({ id: dto.movieId });
      if (!movie) throw new NotFoundException('Película no encontrada');

      const user = await this.usersService.findById(dto.userId);
      if (!user || user.role !== UserRole.USER) {
        throw new ForbiddenException('Solo los usuarios pueden comentar');
      }

      const comment = this.commentRepo.create({
        ...dto, // Incluye rating si viene en dto
        movie,
        user,
      });

      const saved = await this.commentRepo.save(comment);
      console.log('✅ Comentario guardado:', saved);
      return saved;
    } catch (error) {
      if (error instanceof Error) {
        console.log('❌ ERROR REAL:', error.message);
        console.log('🪵 ERROR STACK:', error.stack);
      } else {
        console.log('❌ ERROR REAL:', error);
      }
      throw error;
    }
  }

  findAll(): Promise<Comment[]> {
    return this.commentRepo.find({ relations: ['movie', 'user'] });
  }

  async findOne(id: string): Promise<Comment | null> {
    return this.commentRepo.findOne({ where: { id }, relations: ['movie', 'user'] });
  }

  async updateSentiment(id: string, sentiment: string) {
    const comment = await this.commentRepo.findOneBy({ id });
    if (!comment) throw new NotFoundException('Comentario no encontrado');

    comment.sentiment = sentiment;
    return this.commentRepo.save(comment);
  }

  async update(id: string, dto: UpdateCommentDto, userId: string): Promise<Comment> {
    const comment = await this.commentRepo.findOne({ where: { id }, relations: ['movie', 'user'] });
    if (!comment) throw new NotFoundException('Comentario no encontrado');

    // Solo el autor puede actualizar
    if (!comment.user || comment.user.id !== userId) {
      throw new ForbiddenException('No puedes editar comentarios de otros usuarios');
    }

    let movie = comment.movie;
    if (dto.movieId) {
      const foundMovie = await this.movieRepo.findOneBy({ id: dto.movieId });
      if (!foundMovie) throw new NotFoundException('Película no encontrada');
      movie = foundMovie;
    }

    this.commentRepo.merge(comment, {
      ...dto,
      movie,
    });

    return this.commentRepo.save(comment);
  }

  async remove(id: string): Promise<void> {
    const result = await this.commentRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Comentario no encontrado');
    }
  }
}
