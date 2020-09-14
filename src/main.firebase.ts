import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
import * as config from 'config';

import { AppModule } from './app.module';

const expressServer = express();

const createFunction = async (expressInstance): Promise<void> => {
  // console.log('process.env: ', process.env);
  console.log('NODE_ENV: ', process.env.NODE_ENV);
  console.log('config: ', config);
  console.log('SERVER PORT: ', process.env.PORT);
  console.log('POSTGRES DB HOST: ', process.env.RDS_HOSTNAME);

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
    {
      cors: true,
    },
  );

  await app.init();
};

/* export const api = functions
  .region('us-central1')  // default region
  .https.onRequest(async (req, res) => {
    await createFunction(expressServer);
    expressServer(req, res);
  }); */

export const api = functions.https.onRequest(async (req, res) => {
  await createFunction(expressServer);
  expressServer(req, res);
});
