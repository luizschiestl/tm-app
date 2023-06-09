import { Body, Controller, Post } from '@nestjs/common';
import { PasswordService } from './password.service';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post('forgot')
  async forgot(@Body() body: { email: string }) {
    return await this.passwordService.sendResetPasswordEmail(body.email);
  }

  @Post('reset')
  async reset(@Body() body: { token: string; password: string }) {
    return await this.passwordService.resetPassword(body.token, body.password);
  }
}
