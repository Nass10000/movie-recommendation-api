import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { AppDataSource } from './common/data-source';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Request, Response } from 'express';

// Importa los módulos que definen rutas para Swagger
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

  // Pipes y filtros globales
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
    deepScanRoutes: true,
  });

  // Monta Swagger UI en /docs y JSON en /swagger-json
  SwaggerModule.setup('docs', app, document);
  app.use('/swagger-json', (req: Request, res: Response) => res.send(document));

  await app.listen(3000);
}
bootstrap();
