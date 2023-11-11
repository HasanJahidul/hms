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
      host: 'localhost',
      port: 8174,
      username: 'admin',
      password: 'd0cT0rStr@ang3',
      database: 'merlin',
      schema: 'public',
      autoLoadEntities: true,
      synchronize: true,
    }),
    DepartmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
