import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const url = config.get<string>('DATABASE_URL');
        return {
          type: 'postgres',
          url,
          ssl: { rejectUnauthorized: false },
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          migrations: [__dirname + '/migrations/*{.ts,.js}'],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    MoviesModule,
    CommentsModule,
  ],
})
export class AppModule {
  constructor() {
    console.log('✅ AppModule cargado');
    console.log('🔑 DATABASE_URL:', process.env.DATABASE_URL);
    console.log('🔑 AUTH0_DOMAIN:', process.env.AUTH0_DOMAIN);
    console.log('🔑 AUTH0_CLIENT_ID:', process.env.AUTH0_CLIENT_ID);
    console.log('🔑 AUTH0_CALLBACK_URL:', process.env.AUTH0_CALLBACK_URL);
  }
}
