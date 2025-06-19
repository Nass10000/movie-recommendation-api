import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { AppDataSource } from './common/data-source';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import express from 'express'; // Importación corregida

async function bootstrap() {
  console.log('==============================');
  console.log('🚀 Iniciando Movie API Backend');
  console.log('🟢 NODE_ENV:', process.env.NODE_ENV);
  console.log('🟢 DATABASE_URL:', process.env.DATABASE_URL?.substring(0, 25) + '...');
  console.log('==============================');

  try {
    await AppDataSource.initialize();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  }

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

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  const expressApp = app.getHttpAdapter().getInstance();

  // Solución al error: usa tipo primitivo number
  const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  
  await app.listen(port, '0.0.0.0');
  
  console.log('==============================');
  console.log(`🚀 Backend escuchando en puerto ${port}`);
  console.log('==============================');
}

bootstrap().catch(err => {
  console.error('❌ Bootstrap failed:', err);
  process.exit(1);
});