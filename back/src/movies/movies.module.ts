// movies.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movies.entity';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), forwardRef(() => UsersModule)],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService], // 👈 agrega esto

})
export class MoviesModule {}
