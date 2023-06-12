import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { ForgotPasswordDto } from 'src/users/dtos/ForgotPassword.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(options: FindOptionsWhere<User> | FindOptionsWhere<User>[]) {
    try {
      return await this.userRepository.findOneByOrFail(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(query: FindOptionsWhere<User>, data: Partial<User>) {
    const user = await this.userRepository.findOneByOrFail(query);
    this.userRepository.merge(user, data);
    return await this.userRepository.save(user);
  }

  async passwordRecovery({ email }: ForgotPasswordDto) {
    try {
      const { email: userEmail } = await this.userRepository.findOneBy({
        email,
      });
      return userEmail;
    } catch (error) {
      return error.message;
    }
  }
}
