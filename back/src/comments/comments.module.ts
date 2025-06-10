import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comments.entity';
import { Movie } from '../movies/movies.entity';
import { User } from '../users/users.entity';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { UsersModule } from '../users/users.module';
import { MoviesModule } from '../movies/movies.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Movie, User]),
    forwardRef(() => UsersModule),
    forwardRef(() => MoviesModule),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
