import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsNumber()
  @IsNotEmpty()
  doctorId: number;

  @IsDateString()
  @IsNotEmpty()
  availableAppointmentId: number;

  @IsNumber()
  @IsNotEmpty()
  patientId: number;
}

export class UpdateAppointmentDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsOptional()
  @IsDateString()
  dateTime?: Date;
}
