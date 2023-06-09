import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.findOne({ id });
  }

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.store(createUserDto);
  }
}
