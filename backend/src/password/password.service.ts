import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { randomUUID } from 'node:crypto';

@Injectable()
export class PasswordService {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
  ) {}

  async sendResetPasswordEmail(email: string) {
    const token = randomUUID();

    await this.usersService.update(
      { email },
      {
        passwordResetToken: token,
      },
    );

    const frontendUrl = 'http://localhost:5173';

    await this.mailerService.sendMail({
      to: email,
      subject: 'Recuperação de senha ',
      html: `
      <html lang="pt-br">
<head>
  <link href="https://fonts.googleapis.com/css2?family=Alata&family=Almarai&family=Comfortaa&family=Roboto&display=swap"
    rel="stylesheet">
  <style>
    .main {
      width: 300px;
      display: flex;
      flex-direction: column;
    }
    .title {
      width: 100%;
      background-color: #3E9F96;
      color: white;
      font-family: Alata, sans-serif;
      padding: 20px;
    }
    h1 {
      margin-top: 60px;
      margin-bottom: 0;
      font-size: 26px;
      font-weight: 400;
    }
    .content {
      padding: 20px;
      width: 100%;
      background-color: #E1E8E7;
      font-family: Roboto, sans-serif;
      font-size: 12px
    }
  .link-container {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
    .link-container a {
      margin: 10px auto;
      background-color: #3E9F96;
      border-radius: 18px;
      color: white;
      padding: 8px 32px;
      font-family: Alata, sans-serif;
      text-transform: uppercase;
      text-decoration: none;
      font-size: 14px;
      font-weight: 400;
      box-shadow: 0px 3.49051px 3.49051px rgba(0, 0, 0, 0.25);
    }
    .small-text {
      font-size: 10px;
    }
    .image-container {
      display: flex;
    justify-content: flex-end;
    margin: 10px;
    }
  </style>
</head>
<body>
  <div class="main">
  <div class="title">
    <h1>Redefinição de senha</h1>
  </div>
  <div class="content">
    <p>Olá,</p>
    <p>Recebemos sua solicitação de redefinição de senha do Consultório Pró</p>
    <p>Clique no botão abaixo para redefinir sua senha.</p>
    <div class="link-container">
    <a href="${frontendUrl}/reset-password?token=${token}">Redefinir senha</a>
    </div>
    <div class="small-text">
      <p>Esta deve ser uma senha de acesso exclusiva do usuário, que não deve ser compartilhada com terceiros.</p>
      <p>Se necessário, a senha pode ser alterada posteriormente através do menu “Alterar minha senha” no Consultório Pró.</p>
    </div>
    <div class="image-container">
      <img src="${frontendUrl}/src/assets/topmed_logo.png" alt="topmed logo">
    </div>
  </div>
  </div>
</body>
</html>
      `,
    });

    return { message: 'Email enviado com sucesso' };
  }

  async resetPassword(token: string, password: string) {
    return await this.usersService.update(
      { passwordResetToken: token },
      { password, passwordResetToken: null },
    );
  }
}
