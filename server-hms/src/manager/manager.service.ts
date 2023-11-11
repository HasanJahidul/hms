import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseHandler } from 'src/common/response-handler';
import { DoctorService } from 'src/user/doctor.service';
import { User } from 'src/user/entities/user.entity';
import { UserUpdateMapper } from 'src/user/mapper/userUpdate.mapper';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Manager } from './entities/manager.entity';

@Injectable()
export class ManagerService {
  constructor(
    private readonly userService: UserService,
    private readonly doctorService: DoctorService,
    private readonly userUpdateMapper: UserUpdateMapper,
    private readonly responseHandler: ResponseHandler,

    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createManagerDto: CreateManagerDto) {
    return 'This action adds a new manager';
  }

  findAll() {
    return `This action returns all manager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} managerqq`;
  }

  remove(id: number) {
    return `This action removes a #${id} managerrr`;
  }
  async findProfile() {
    if (this.userService.getCurrentUserRole() != 2) {
      return 'You are not a manager';
    }
    return await this.userService.getManagerProfile();
  }
  async update(dto: UpdateManagerDto) {
    try {
      const id = this.userService.getCurrentUserId();
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['userDetails'],
      });
      const entity = this.userUpdateMapper.dtoToEntity(dto, user);
      return new ResponseHandler(
        await this.userRepository.save(entity),
        HttpStatus.OK,
      );
    } catch (e) {
      console.log(e);
      return new ResponseHandler(e, HttpStatus.BAD_REQUEST);
    }
  }
  async createDoctor(dto: CreateDoctorDto) {
    try {
      return this.doctorService.create(dto);
    } catch (e) {
      console.log(e);
    }
  }
  findAllDoctor() {
    return this.doctorService.findAll();
  }
  findOneDoctor(id: number) {
    return this.doctorService.findOne(id);
  }
  updateDoctor(updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(updateDoctorDto);
  }
}
