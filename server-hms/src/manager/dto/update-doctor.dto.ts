import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-doctor.dto';
import {
  IsString,
  MinLength,
  IsEmail,
  MaxLength,
  Matches,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class UpdateDoctorDto {
  @IsString()
  @MinLength(4)
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(4)
  address: string;
  @IsString()
  @Matches(/^[0-9]{11}$/)
  phone: string;
  @IsNumber()
  department_id: number;
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
