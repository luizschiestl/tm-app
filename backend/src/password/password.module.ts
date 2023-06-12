import { Module } from '@nestjs/common';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { MailerModule } from '@nestjs-modules/mailer';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    MailerModule.forRoot({
      transport: {
        host: 'mailhog',
        port: 1025,
      },
      defaults: {
        from: 'forgot@topmed.com',
      },
    }),
  ],
  controllers: [PasswordController],
  providers: [PasswordService],
})
export class PasswordModule {}
