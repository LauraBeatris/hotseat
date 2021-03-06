import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import Appointment from '@domains/appointments/infra/typeorm/entities/Appointment';
import { STATIC_FILES_ROUTE } from '@shared/constants/upload';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  avatar: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column('boolean')
  is_provider: boolean;

  @OneToMany(() => Appointment, appointment => appointment.customer)
  appointments: Appointment[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    return this.avatar
      ? `${process.env.SERVER_URL}${STATIC_FILES_ROUTE}/${this.avatar}`
      : this.avatar;
  }
}

export default User;
