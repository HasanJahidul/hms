import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateManagerDto } from './create-manager.dto';

export class UpdateManagerDto extends OmitType(PartialType(CreateManagerDto), [
  'password',
  'role_id',
]) {}
