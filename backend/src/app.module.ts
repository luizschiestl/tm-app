import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { LoginAttempt } from './typeorm/entities/LoginAttempt';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PasswordModule } from './password/password.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'dev',
      password: 'password',
      database: 'dbtopmed',
      entities: [User, LoginAttempt],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    PasswordModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
