import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from './dto/appointment.dto';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}
  getAllAppointments() {
    return this.appointmentRepository.find();
  }

  getAppointmentById(id: number) {
    return this.appointmentRepository.findOne({
      where: { id },
      relations: ['service', 'doctor', 'patient'],
    });
  }

  createAppointment(createAppointmentDto: CreateAppointmentDto) {
    const newAppointment =
      this.appointmentRepository.create(createAppointmentDto);
    return this.appointmentRepository.save(newAppointment);
  }

  updateAppointment(updateAppointmentDto: UpdateAppointmentDto) {
    const id = updateAppointmentDto.id;
    return this.appointmentRepository.update(id, updateAppointmentDto);
  }

  async deleteAppointment(id: number) {
    const appointment = await this.getAppointmentById(id);
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return this.appointmentRepository.remove(appointment);
  }
}
