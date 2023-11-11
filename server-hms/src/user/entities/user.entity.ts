import * as bcrypt from 'bcrypt';
import { Department } from 'src/department/entities/department.entity';
import { BaseEntity } from 'src/entities/baseEntity.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Roles } from './role.entity';
import { UserDetails } from './userDetails.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;
  @Column({ default: true })
  is_active: boolean;
  @Column()
  role_id: number;
  @ManyToOne(() => Roles, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Roles;
  @OneToOne(() => UserDetails, (details) => details.user, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  userDetails: UserDetails;
  @ManyToOne(() => Department, (department) => department.doctors)
  @JoinColumn({ name: 'department_id' })
  department: Department;
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
