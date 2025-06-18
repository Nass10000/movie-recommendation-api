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
        const isProduction = config.get('NODE_ENV') === 'production';
        const databaseUrl = config.get<string>('DATABASE_URL');
        if (databaseUrl && isProduction) {
          return {
            type: 'postgres',
            url: databaseUrl,
            ssl: { rejectUnauthorized: false },
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            migrations: [__dirname + '/migrations/*{.ts,.js}'],
            synchronize: true,
          };
        } else {
          return {
            type: 'postgres',
            host: config.get('DB_HOST', 'localhost'),
            port: parseInt(config.get('DB_PORT', '5432')),
            username: config.get('DB_USERNAME', 'postgres'),
            password: config.get('DB_PASSWORD', 'tu_password_local'),
            database: config.get('DB_NAME', 'movie_recommender'),
            ssl: false,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            migrations: [__dirname + '/migrations/*{.ts,.js}'],
            synchronize: true,
          };
        }
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
