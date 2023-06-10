import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { LoginAttempt } from './LoginAttempt';
import { AccountStatus } from 'src/enums/AccountStatus';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: '100' })
  email: string;

  @Column({ unique: true, length: '50' })
  username: string;

  @Column()
  password: string;

  @Column({ length: '20' })
  phone: string;

  @Column({ name: 'first_name', length: '50' })
  firstName: string;

  @Column({ name: 'last_name', length: '50' })
  lastName: string;

  @Column({
    name: 'account_status',
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.ACTIVE,
  })
  accountStatus: AccountStatus;

  @Column({
    name: 'password_reset_token',
    nullable: true,
    unique: true,
    type: 'uuid',
  })
  passwordResetToken: string;

  @OneToMany(() => LoginAttempt, (loginAttempt) => loginAttempt.user)
  loginAttempts: LoginAttempt[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}
