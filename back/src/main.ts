import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { AppDataSource } from './common/data-source';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Request, Response, NextFunction } from 'express';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

// Importa los módulos que definen rutas para la documentación Swagger
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
  // app.useStaticAssets(join(__dirname, '..', '..', 'front', 'dist'));
  // console.log('🟢 Sirviendo estáticos desde', join(__dirname, '..', '..', 'front', 'dist'));

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

  // --- SPA Fallback: Soluciona rutas directas a tu React app ---
  // SOLO excluye rutas que DE VERDAD son solo API/documentación:
  // const expressApp = app.getHttpAdapter().getInstance() as any;
  // expressApp.get('*', (req: Request, res: Response, next: NextFunction) => {
  //   if (
  //     req.originalUrl.startsWith('/api') ||
  //     req.originalUrl.startsWith('/swagger-json')
  //   ) {
  //     return next();
  //   }
  //   res.sendFile(join(__dirname, '..', '..', 'front', 'dist', 'index.html'));
  // });

  // Usa el puerto de la variable de entorno PORT o 3000 por defecto
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
