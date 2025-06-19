console.log('Arrancando backend...');

import { NestFactory, HttpAdapterHost } from '@nestjs/core';
console.log('DIRNAME:', __dirname);
console.log('FILENAME:', __filename);
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { AppDataSource } from './common/data-source';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Request, Response, NextFunction } from 'express';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { CommentsModule } from './comments/comments.module';

async function bootstrap() {
  console.log('==============================');
  console.log('🚀 Iniciando Movie API Backend');
  console.log('🟢 NODE_ENV:', process.env.NODE_ENV);
  console.log('🟢 DATABASE_URL:', process.env.DATABASE_URL);
  console.log('==============================');

  await AppDataSource.initialize();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Movie Recommendation API')
    .setDescription('API para recomendar películas')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [AuthModule, UsersModule, MoviesModule, CommentsModule],
  });

  SwaggerModule.setup('api', app, document);
  app.use('/swagger-json', (req: Request, res: Response) =>
    res.status(200).json(document),
  );

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port, '0.0.0.0');
  console.log('==============================');
  console.log(`🚀 Backend escuchando en puerto ${port}`);
  console.log('🔑 AUTH0_DOMAIN:', process.env.AUTH0_DOMAIN);
  console.log('🔑 AUTH0_CLIENT_ID:', process.env.AUTH0_CLIENT_ID);
  console.log('🔑 AUTH0_CALLBACK_URL:', process.env.AUTH0_CALLBACK_URL);
  console.log('==============================');
}

bootstrap();
