import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // 1) Loguea la excepción completa y su stack
    console.error('❌ Exception thrown:', exception);

    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<Request>();

    // 2) Determina el status y el mensaje
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : { error: (exception as any).message || exception };

    // 3) Responde al cliente con cuerpo detallado
    httpAdapter.reply(
      response,
      {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      },
      status,
    );
  }
}
