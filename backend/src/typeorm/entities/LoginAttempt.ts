import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { User } from './User';
import { LoginStatus } from 'src/enums/LoginStatus';

@Entity({ name: 'login_attempts' })
export class LoginAttempt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.loginAttempts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'enum', enum: LoginStatus })
  status: LoginStatus;

  @Column({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @BeforeInsert()
  fixDate() {
    this.createdAt = new Date();
  }
}
