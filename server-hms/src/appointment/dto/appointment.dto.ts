import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsNumber()
  @IsNotEmpty()
  serviceId: number;

  @IsNumber()
  @IsNotEmpty()
  doctorId: number;

  @IsDateString()
  @IsNotEmpty()
  dateTime: Date;
}

export class UpdateAppointmentDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsOptional()
  @IsDateString()
  dateTime?: Date;
}
