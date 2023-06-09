import { compareSync } from 'bcrypt';

export const validatePassword = (
  rawPassword: string,
  hashedPassword: string,
) => {
  if (!compareSync(rawPassword, hashedPassword)) {
    throw new Error('Usuário ou senha incorreta');
  }
  return true;
};
