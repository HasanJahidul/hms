import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionGuard } from 'src/auth/auth.guards';
import { ResponseHandler } from 'src/common/response-handler';
import { BaseEntity } from 'src/entities/baseEntity.entity';
import { Roles } from 'src/user/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { UserDetails } from 'src/user/entities/userDetails.entity';
import { UserModule } from 'src/user/user.module';
import { Manager } from './entities/manager.entity';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';

@Module({
  controllers: [ManagerController],
  providers: [ManagerService, SessionGuard, BaseEntity, ResponseHandler],
  imports: [
    TypeOrmModule.forFeature([User, UserDetails, Roles, BaseEntity, Manager]),
    forwardRef(() => UserModule),
  ],
})
export class ManagerModule {}
