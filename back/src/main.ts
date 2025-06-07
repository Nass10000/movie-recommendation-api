import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpAdapterHost } from '@nestjs/core';
import { AllExceptionsFilter } from './common/all-exceptions.filter';
import { AppDataSource } from './common/data-source';

async function bootstrap() {
  // Inicializa el DataSource antes de arrancar Nest.
  await AppDataSource.initialize();

  const app = await NestFactory.create(AppModule);
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  await app.listen(3000);
}

bootstrap();
