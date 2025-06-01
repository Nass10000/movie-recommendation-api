import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './ comments.entity';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Movie } from '../movies/movies.entity';
import { UsersService } from '../users/users.service';
// Update the import path below if the actual location is different
import { UserRole } from '../common/role.enum';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,
    @InjectRepository(Movie)
    private movieRepo: Repository<Movie>,
    private readonly usersService: UsersService,
  ) {}

  async create(dto: CreateCommentDto): Promise<Comment> {
    const movie = await this.movieRepo.findOneBy({ id: dto.movieId });
    if (!movie) {
      throw new Error('Movie not found');
    }

    const user = await this.usersService.findById(dto.userId);
    if (!user || user.role !== UserRole.USER) {
      throw new ForbiddenException('Solo los usuarios pueden comentar');
    }

    const comment = this.commentRepo.create({ ...dto, movie });
    return this.commentRepo.save(comment);
  }

  findAll(): Promise<Comment[]> {
    return this.commentRepo.find({ relations: ['movie'] });
  }
 async updateSentiment(id: string, sentiment: string) {
  const comment = await this.commentRepo.findOneBy({ id });
  if (!comment) throw new NotFoundException('Comentario no encontrado');

  comment.sentiment = sentiment;
  return this.commentRepo.save(comment);
}

  async update(id: string, dto: UpdateCommentDto): Promise<Comment> {
    await this.commentRepo.update(id, dto);
    const updatedComment = await this.commentRepo.findOne({ where: { id }, relations: ['movie'] });
    if (!updatedComment) {
      throw new Error('Comment not found');
    }
    return updatedComment;
  }
}
