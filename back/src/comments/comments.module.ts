import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../comments/ comments.entity';
import { Movie } from '../movies/movies.entity';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Movie]), UsersModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
