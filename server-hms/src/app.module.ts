import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DepartmentModule } from './department/department.module';
import { ManagerModule } from './manager/manager.module';
import { SeederModule } from './seeder/seeder.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    SeederModule,
    UserModule,
    ManagerModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      schema: process.env.DB_SCHEMA,
      autoLoadEntities: true,
      synchronize: true,
    }),
    DepartmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
