import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { SeederManager } from './seeder/seeder-manager';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  const seederManager = app.get(SeederManager);

  await seederManager.runSeeders();

  await app.listen(3000);
}
bootstrap();
