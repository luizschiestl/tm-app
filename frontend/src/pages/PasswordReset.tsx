import { Main } from "../components/layout/Main";
import { Button } from "../components/layout/Button";
import { FormEvent, useState } from "react";
import { resetPassword } from "../services/resetPassword";
import { useNavigate } from "react-router-dom";
import { Message } from "../components/layout/Message";
import { Input } from "../components/layout/Input";
import lock from "../assets/lock.svg";
import confirm from "../assets/confirm.svg";

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
          <Input
            iconSrc={lock}
            type="password"
            placeholder="Nova senha"
            value={password}
            onChange={handleChangePassword}
          />
          <Input
            iconSrc={confirm}
            type="password"
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
          />
          <Message type="error" message={error} show={!!error} />
          <Button type="submit" className="w-60">
            Redefinir senha
          </Button>
          <Button
            variant="secondary"
            className="w-60"
            onClick={() => navigate("/")}
          >
            Cancelar
          </Button>
        </form>
      </div>
    </Main>
  );
}
