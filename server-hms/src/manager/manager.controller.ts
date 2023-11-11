import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SessionGuard } from 'src/auth/auth.guards';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { RoleGuard } from './manager.guard';
import { ManagerService } from './manager.service';

@Controller('manager')
@UseGuards(SessionGuard)
@UseGuards(RoleGuard)
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Get('profile')
  findProfile() {
    console.log('findProfile');
    return this.managerService.findProfile();
  }
  @Put()
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managerService.update(updateManagerDto);
  }
  @Post('doctor')
  createDoctor(@Body() dto: CreateDoctorDto) {
    return this.managerService.createDoctor(dto);
  }
  @Get('doctor/list')
  findAllDoctor() {
    return this.managerService.findAllDoctor();
  }
  @Get('/doctor')
  findOneDoctor(@Query('id') id) {
    return this.managerService.findOneDoctor(+id);
  }
  @Put('doctor/profile')
  updateDoctorProfile(@Body() dto: UpdateDoctorDto) {
    return this.managerService.updateDoctor(dto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managerService.remove(+id);
  }
}
