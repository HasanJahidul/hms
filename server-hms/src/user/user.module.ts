import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseHandler } from 'src/common/response-handler';
import { DoctorService } from './doctor.service';
import { Roles } from './entities/role.entity';
import { User } from './entities/user.entity';
import { UserDetails } from './entities/userDetails.entity';
import { DoctorMapper } from './mapper/doctor.mapper';
import { UserUpdateMapper } from './mapper/userUpdate.mapper';
import { RolesSeeder } from './seeder/roles.seeder';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserDetails, Roles])],
  controllers: [UserController],
  providers: [
    UserService,
    DoctorService,
    UserUpdateMapper,
    RolesSeeder,
    DoctorMapper,
    ResponseHandler,
  ],
  exports: [
    UserService,
    UserUpdateMapper,
    RolesSeeder,
    DoctorService,
    DoctorMapper,
  ],
})
export class UserModule {}
