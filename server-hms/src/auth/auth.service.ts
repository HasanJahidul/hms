import { HttpException, HttpStatus, Session } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserDetails } from 'src/user/entities/userDetails.entity';
import { Repository } from 'typeorm';
import { LoginDto, SignupDto } from './dto/auth.dto';

export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async getAll(): Promise<User[]> {
    return this.userRepository.find({
      select: ['id', 'email', 'password'],
      relations: ['userDetails'],
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          userDetails: 'user.userDetails',
        },
      },
    });
  }

  async login(dto: LoginDto, @Session() session): Promise<any> {
    console.log(dto);
    const user = await this.userRepository.findOneBy({
      email: dto.email,
    });
    console.log(user);
    const result = await bcrypt.compare(dto.password, user.password);
    if (result) {
      session.email = user.email;
      session.role = user.role_id;
      return true;
    } else {
      return false;
    }
  }
  async signUp(dto: SignupDto): Promise<User> {
    const validate = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (validate) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    const entity = new User();
    entity.email = dto.email;
    entity.password = dto.password;
    entity.role_id = dto.role_id;

    const userDetails = new UserDetails();

    userDetails.name = dto.name;
    userDetails.address = dto.address;
    userDetails.phone = dto.phone;

    entity.userDetails = userDetails;
    console.log(entity);
    const user = this.userRepository.create(entity);

    await this.userRepository.save(user);
    return user;
  }
  async getUserByID(id: number): Promise<any> {
    try {
      const user = this.userRepository.find({
        where: { id: id },
        relations: { userDetails: true, role: true },
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
