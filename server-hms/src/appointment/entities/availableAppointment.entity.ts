import { BaseEntity } from 'src/entities/baseEntity.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class AvailableAppointment extends BaseEntity {
  @ManyToOne(() => User, (doctor) => doctor.availableAppointments)
  doctor: User;

  @Column({ type: 'timestamp' })
  dateTime: Date;

  @Column({ default: true })
  is_available: boolean;
}
