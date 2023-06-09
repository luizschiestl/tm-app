import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { LoginAttempt } from 'src/typeorm/entities/LoginAttempt';
import { User } from 'src/typeorm/entities/User';
import { LoginUserDto } from 'src/users/dtos/LoginUser.dto';
import { UsersService } from 'src/users/users.service';
import { validatePassword } from './utils/validatePassword';
import { LoginStatus } from 'src/enums/LoginStatus';
import { getDateFromMinutesAgo } from './utils/dateUtils';
import { AccountStatus } from 'src/enums/AccountStatus';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(LoginAttempt)
    private loginAttemptRepository: Repository<LoginAttempt>,
  ) {}

  async login(user: LoginUserDto) {
    const payload = { username: user.username };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async storeAttempt(user: User, status: LoginStatus) {
    const attempt = this.loginAttemptRepository.create({
      user,
      status,
    });
    await this.loginAttemptRepository.save(attempt);
  }

  async checkAttempts(userId: string) {
    const results = await this.loginAttemptRepository.find({
      where: {
        user: { id: userId },
        createdAt: MoreThan(getDateFromMinutesAgo(2)),
      },
      order: { createdAt: 'desc' },
      take: 3,
    });
    if (
      results.length === 3 &&
      results.every((result) => result.status === LoginStatus.FAILURE)
    ) {
      await this.userService.update(
        { id: userId },
        {
          accountStatus: AccountStatus.LOCKED,
        },
      );
      throw new UnauthorizedException('Conta bloqueada');
    }
  }

  async validateUser({ username, password }: LoginUserDto) {
    let user: User;
    try {
      user = await this.userService.findOne({ username });
    } catch (error) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    if (user.accountStatus === AccountStatus.LOCKED) {
      throw new UnauthorizedException('Conta bloqueada');
    }

    try {
      validatePassword(password, user.password);
      await this.storeAttempt(user, LoginStatus.SUCCESS);
    } catch (error) {
      await this.storeAttempt(user, LoginStatus.FAILURE);
      await this.checkAttempts(user.id);
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    return user;
  }
}
