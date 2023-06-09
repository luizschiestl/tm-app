import { Link } from "react-router-dom";
import { Main } from "./layout/Main";
import { PrimaryButton } from "./layout/PrimaryButton";
import { FormEvent, useState } from "react";
import { login } from "../services/login";
import clsx from "clsx";

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
          <input
            type="text"
            placeholder="Usuário"
            onChange={handleChangeUsername}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={handleChangePassword}
          />
          <p
            className={clsx("text-sm text-danger transition-transform", {
              "scale-y-0 invisible": !error,
              "scale-y-100 visible": error,
            })}
          >
            {error}
          </p>
          <PrimaryButton type="submit">Entrar</PrimaryButton>
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
