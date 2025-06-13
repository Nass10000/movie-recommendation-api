import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { AppDataSource } from './common/data-source';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

// Importa los módulos que definen rutas para la documentación Swagger
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { CommentsModule } from './comments/comments.module';

async function bootstrap() {
  // Inicializa la conexión a la base de datos
  await AppDataSource.initialize();

  // Crea la aplicación Nest
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Filtros y configuración inicial
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Sirve archivos estáticos del frontend (Vite build) desde carpeta 'front/dist'
  app.useStaticAssets(join(__dirname, '..', '..', 'front', 'dist'));

  // Configuración de Swagger
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

  // Catch-all para servir tu SPA solo en GETs que no sean API ni Swagger
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.get('*', (req: Request, res: Response) => {
    res.sendFile(join(__dirname, '..', '..', 'front', 'dist', 'index.html'));
  });

  // Logs y arranque
  console.log('🚀 Backend arrancando en puerto 3000');
  console.log('🔑 AUTH0_DOMAIN:', process.env.AUTH0_DOMAIN);
  console.log('🔑 AUTH0_CLIENT_ID:', process.env.AUTH0_CLIENT_ID);
  console.log('🔑 AUTH0_CALLBACK_URL:', process.env.AUTH0_CALLBACK_URL);

  await app.listen(3000);
}

bootstrap();
