import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import * as path from 'path';
import { AppModule } from './app.module';
import { SeederManager } from './seeder/seeder-manager';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 300000,
      },
    }),
  );
  app.enableCors();
  const seederManager = app.get(SeederManager);

  await seederManager.runSeeders();
  app.useStaticAssets(path.join(__dirname, '../upload'));

  await app.listen(3000);
}
bootstrap();
