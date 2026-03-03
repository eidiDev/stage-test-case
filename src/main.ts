import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { logger } from 'handlebars';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });

  // Define uso do validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      forbidUnknownValues: true,
    }),
  );

  // Define default httpFilter

  // Default documentation from swagger
  const options = new DocumentBuilder()
    .setTitle('Stage Test')
    .setDescription('Stage Test API')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const port = parseInt(process.env.PORT, 10) || 3000;
  await app.listen(port);

  const logger = new Logger(AppController.name);
  //
  logger.log('Starting server at port: ' + port);
}
bootstrap();
