import { Link } from "react-router-dom";
import { Main } from "./layout/Main";
import { Button } from "./layout/Button";
import { FormEvent, useState } from "react";
import { login } from "../services/login";
import { Message } from "./layout/Message";
import { Input } from "./layout/Input";
import user from "../assets/user.svg";
import lock from "../assets/lock.svg";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChangeUsername = (e: FormEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const handleChangePassword = (e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    login(username, password)
      .then()
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <Main>
      <div className="flex flex-col gap-4 justify-center items-center">
        <div className="w-full">
          <h1 className="font-title text-3xl">Bem vindo,</h1>
          <p className="font-info text-sm text-detail-darker">
            Faça o login para continuar.
          </p>
        </div>
        <form
          className="flex flex-col mt-8 gap-4 justify-around items-center"
          onSubmit={handleSubmit}
        >
          <Input
            iconSrc={user}
            type="text"
            placeholder="Usuário"
            onChange={handleChangeUsername}
          />
          <Input
            iconSrc={lock}
            type="password"
            placeholder="Senha"
            onChange={handleChangePassword}
          />
          <Message type="error" message={error} show={!!error} />
          <Button type="submit">Entrar</Button>
        </form>
        <Link
          className="font-display text-secondary text-xs text-center w-full hover:text-secondary-light transition-colors"
          to="/forgot-password"
        >
          Esqueceu sua senha?
        </Link>
      </div>
    </Main>
  );
}
