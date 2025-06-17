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
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host:       config.get('DB_HOST'),
        port:       config.get<number>('DB_PORT'),
        username:   config.get('DB_USERNAME'),
        password:   config.get('DB_PASSWORD'),
        database:   config.get('DB_NAME'),
        ssl: {
          rejectUnauthorized: false
        },
        entities:   [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        synchronize: true,
        dropSchema: false,
      }),
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
    console.log('🔑 DB_HOST:', process.env.DB_HOST);
    console.log('🔑 AUTH0_DOMAIN:', process.env.AUTH0_DOMAIN);
    console.log('🔑 AUTH0_CLIENT_ID:', process.env.AUTH0_CLIENT_ID);
    console.log('🔑 AUTH0_CALLBACK_URL:', process.env.AUTH0_CALLBACK_URL);
  }
}
