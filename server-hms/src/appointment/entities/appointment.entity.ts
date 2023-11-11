import { Service } from 'src/department/entities/service.entity';
import { BaseEntity } from 'src/entities/baseEntity.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Appointment extends BaseEntity {
  @ManyToOne(() => Service, (service) => service.appointments)
  service: Service;

  @ManyToOne(() => User, (doctor) => doctor.appointments)
  doctor: User;

  @Column()
  dateTime: Date;
}
