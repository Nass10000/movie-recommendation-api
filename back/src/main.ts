import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter()); // 👈 se aplica globalmente
  app.useGlobalPipes(new ValidationPipe()); // 👈 agrega esta línea

  await app.listen(3000);
}
bootstrap();
