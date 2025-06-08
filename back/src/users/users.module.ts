import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';       // ← **¡IMPORTAR Y DECLARAR!**
import { MoviesModule } from '../movies/movies.module';      // ← **¡IMPORTAR MÓDULO DE PELÍCULAS!**

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => MoviesModule),
  ],
  controllers: [UsersController],  // ← **AQUÍ**
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
