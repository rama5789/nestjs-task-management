import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as config from 'config';

import { AppModule } from './app.module';
import { parseBoolean } from './shared/utils';

async function bootstrap() {
  // console.log('process.env: ', process.env);
  console.log('NODE_ENV: ', process.env.NODE_ENV);
  console.log('config: ', config);
  console.log('SERVER PORT: ', process.env.PORT);
  console.log('POSTGRES DB HOST: ', process.env.RDS_HOSTNAME);
  console.log('SWAGGER UI: ', process.env.SWAGGER_UI);

  const serverConfig = config.get('server');
  const swaggerConfig = config.get('swagger');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('/v1/api');

  // cross-origin support
  if (process.env.NODE_ENV === 'production') {
    app.enableCors({ origin: serverConfig.origin });
    logger.log(`Accepting requests from origin "${serverConfig.origin}"`);
  } else {
    app.enableCors();
  }

  // swagger-ui support
  const activateSwaggerUI: boolean =
    parseBoolean(process.env.SWAGGER_UI) || swaggerConfig.activateUI;
  if (activateSwaggerUI) {
    // generate swagger doc
    const swaggerOptions = new DocumentBuilder()
      .setTitle('Nestjs Task Management')
      .setDescription('The nestjs-task-management API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('api/swagger', app, swaggerDocument);
    logger.log(`SwaggerUI path: /api/swagger`);
  }

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
  logger.log(`Application Url: ${await app.getUrl()}`);
}
bootstrap();
