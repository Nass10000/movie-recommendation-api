import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { AppDataSource } from './common/data-source';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Request, Response } from 'express';

// Importa los módulos que definen rutas para la documentación Swagger
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { CommentsModule } from './comments/comments.module';

async function bootstrap() {
  await AppDataSource.initialize();
  const app = await NestFactory.create(AppModule);
  const httpAdapterHost = app.get(HttpAdapterHost);

  // Habilita CORS
  app.enableCors();

  // Filtros y pipes globales
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Movie Recommendation API')
    .setDescription('API para recomendar películas')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  // Genera el documento incluyendo solo los módulos con rutas
  const document = SwaggerModule.createDocument(app, config, {
    include: [AuthModule, UsersModule, MoviesModule, CommentsModule],
  });

  // Monta Swagger UI en /docs
  SwaggerModule.setup('docs', app, document);

  // Expone el JSON de la spec en /swagger-json
  app.use('/swagger-json', (req: Request, res: Response) =>
    res.status(200).json(document),
  );

  // Inicia el servidor en el puerto 3000
  await app.listen(3000);
}

bootstrap();
