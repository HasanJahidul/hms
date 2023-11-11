import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-doctor.dto';

export class UpdateDoctorDto extends OmitType(PartialType(CreateDoctorDto), [
  'password',
  'role_id',
  'department_id',
]) {
  id: number;
}
