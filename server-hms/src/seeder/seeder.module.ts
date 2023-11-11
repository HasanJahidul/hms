import { Module, forwardRef } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'src/department/entities/department.entity';
import { Service } from 'src/department/entities/service.entity';
import { Roles } from 'src/user/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { RolesSeeder } from 'src/user/seeder/roles.seeder';
import { DepartmentModule } from '../department/department.module';
import { SeederManager } from './seeder-manager'; // Import SeederManager

@Module({
  imports: [
    forwardRef(() => DepartmentModule),
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
    TypeOrmModule.forFeature([Department, Service, User, Roles]),
  ],
  providers: [SeederManager, RolesSeeder],
})
export class SeederModule {}
