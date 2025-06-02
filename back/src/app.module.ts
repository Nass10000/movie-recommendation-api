import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';
import { Movie } from './movies/movies.entity';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/ comments.entity';

import 'dotenv/config';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Movie, Comment,User],
      synchronize: true, // Solo en dev
    }),
    UsersModule,
    MoviesModule,
    CommentsModule,
  ],
})
export class AppModule {}
