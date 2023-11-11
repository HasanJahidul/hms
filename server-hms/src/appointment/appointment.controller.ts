import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from './dto/appointment.dto';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  getAllAppointments() {
    return this.appointmentService.getAllAppointments();
  }

  @Get(':id')
  getAppointmentById(@Query('id') id: number) {
    return this.appointmentService.getAppointmentById(id);
  }

  @Post()
  createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.createAppointment(createAppointmentDto);
  }

  @Put()
  updateAppointment(@Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentService.updateAppointment(updateAppointmentDto);
  }

  @Delete(':id')
  deleteAppointment(@Param('id') id: number) {
    return this.appointmentService.deleteAppointment(id);
  }
}
