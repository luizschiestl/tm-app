import { Main } from "../components/layout/Main";
import { PrimaryButton } from "../components/layout/PrimaryButton";
import { FormEvent, useState } from "react";
import clsx from "clsx";
import { resetPassword } from "../services/resetPassword";
import { SecondaryButton } from "../components/layout/SecondaryButton";
import { useNavigate } from "react-router-dom";

export function PasswordReset() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  const handleChangePassword = (e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const handleChangeConfirmPassword = (e: FormEvent<HTMLInputElement>) => {
    setConfirmPassword(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("As senhas devem ser iguais");
    } else {
      setError("");
      resetPassword(token || "", password)
        .then()
        .catch((error) => {
          setError(error.response.data.message);
        });
    }
  };

  return (
    <Main>
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1 className="font-title text-3xl">Redefinição de senha</h1>
        <form
          className="flex flex-col mt-8 gap-4 justify-around items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="password"
            placeholder="Nova senha"
            value={password}
            onChange={handleChangePassword}
          />
          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
          />
          <p
            className={clsx("text-sm text-danger transition-transform", {
              "scale-y-0 invisible": !error,
              "scale-y-100 visible": error,
            })}
          >
            {error}
          </p>
          <PrimaryButton type="submit" className="w-60">
            Redefinir senha
          </PrimaryButton>
          <SecondaryButton className="w-60" onClick={() => navigate("/")}>
            Cancelar
          </SecondaryButton>
        </form>
      </div>
    </Main>
  );
}
