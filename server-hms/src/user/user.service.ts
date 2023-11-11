import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
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

  setCurrentUserId(userId: number): void {
    this.currentUserId = userId;
  }

  getCurrentUserId(): number {
    return this.currentUserId;
  }
  setCurrentUserRole(roleId: number): void {
    this.currentUserRole = roleId;
  }
  getCurrentUserRole(): number {
    return this.currentUserRole;
  }

  getManagerProfile() {
    return this.userRepository.findOne({
      where: { id: this.getCurrentUserId() },
      relations: ['userDetails'],
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          userDetails: 'user.userDetails',
        },
      },
    });
  }
}
