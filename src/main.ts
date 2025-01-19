import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config/env.config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('Main');

  const PORT = envs.PORT;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: PORT,
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // properties exactamente como yo digo que vengan, ninguno adicional
      forbidNonWhitelisted: true, // error si se envia un campo adicional
    }),
  );

  await app.listen();

  logger.log(`Products Microservice running on port: ${PORT}`);
}
bootstrap();
