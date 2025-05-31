import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './ comments.entity';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Movie } from '../movies/movies.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,
    @InjectRepository(Movie)
    private movieRepo: Repository<Movie>,
  ) {}

  async create(dto: CreateCommentDto): Promise<Comment> {
    const movie = await this.movieRepo.findOneBy({ id: dto.movieId });
    if (!movie) {
      throw new Error('Movie not found');
    }
    const comment = this.commentRepo.create({ ...dto, movie });
    return this.commentRepo.save(comment);
  }

  findAll(): Promise<Comment[]> {
    return this.commentRepo.find({ relations: ['movie'] });
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
