import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseHandler } from 'src/common/response-handler';
import { CreateDoctorDto } from 'src/manager/dto/create-doctor.dto';
import { UpdateDoctorDto } from 'src/manager/dto/update-doctor.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { DoctorMapper } from './mapper/doctor.mapper';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly doctorMapper: DoctorMapper,
  ) {}
  create(dto: CreateDoctorDto) {
    try {
      const exits = this.userRepository.findOne({
        where: { email: dto.email },
      });
      if (exits) {
        return new ResponseHandler(
          'Email Already Exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      const doctor = this.doctorMapper.dtoToEntity(dto);
      const entity = this.userRepository.create(doctor);
      this.userRepository.save(entity);
      return new ResponseHandler(
        'Doctor Created Successfully',
        HttpStatus.CREATED,
      );
    } catch (err) {
      console.log(err);
      return new ResponseHandler(
        'Error Creating Doctor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const allDoctor = await this.userRepository.find({
        where: { deleted_at: null },
        relations: {
          department: true,
          userDetails: true,
          role: true,
        },
      });
      return new ResponseHandler(allDoctor, HttpStatus.OK);
    } catch (err) {
      console.log(err);
      return new ResponseHandler(
        'Error Fetching Doctors',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    const doctor = await this.userRepository.findOne({
      where: { id: id, deleted_at: null, role_id: 3, is_active: true },
      relations: {
        department: true,
        userDetails: true,
        role: true,
      },
    });
    if (doctor) {
      return new ResponseHandler(doctor, HttpStatus.OK);
    }
    return new ResponseHandler(
      'Doctor Not Found',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async update(dto: UpdateDoctorDto) {
    try {
      const id = dto.id;
      const user = await this.userRepository.findOne({
        where: { id: id, deleted_at: null, role_id: 3, is_active: true },
      });
      if (!user) {
        return new ResponseHandler(
          'Doctor Not Found',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const doctor = this.doctorMapper.dtoToEntityForUpdate(dto, user);
      console.log(doctor);
      const entity = this.userRepository.create(doctor);
      this.userRepository.save(entity);
      return new ResponseHandler('Doctor Updated Successfully', HttpStatus.OK);
    } catch (err) {
      return new ResponseHandler(
        'Doctor Not Updated -> ' + err,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  private currentUserId: number;
  private currentUserRole: number;

  getUserByEmail(email: string): Promise<User> {
    return this.userRepository
      .findOne({
        where: {
          email: email,
        },
      })
      .then((user) => {
        return user;
      });
  }
}
