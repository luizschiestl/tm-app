import { Link, useNavigate } from "react-router-dom";
import { Main } from "./layout/Main";
import { Button } from "./layout/Button";
import { useState } from "react";
import { forgotPassword } from "../services/forgotPasword";
import mail from "../assets/mail.svg";
import mailIcon from "../assets/mail-icon.svg";
import { Input } from "./layout/Input";

export function ForgotForm() {
  const [email, setEmail] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const navigate = useNavigate();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    forgotPassword(email).finally(() => {
      setRequestSent(true);
    });
  };

  return (
    <Main>
      <div className="flex flex-col gap-4 justify-center items-center w-[300px]">
        {requestSent ? (
          <>
            <div className="w-full">
              <h1 className="font-title text-3xl">E-mail enviado!</h1>
              <p className="font-info text-sm text-detail-darker">
                Verifique sua caixa de entrada e acesso o link para redefinição
                de senha.
              </p>
            </div>
            <img src={mail} alt="mail" className="w-20 my-4" />
            <Button onClick={() => navigate("/")}>Login</Button>
          </>
        ) : (
          <>
            <div className="w-full">
              <h1 className="font-title text-3xl">Esqueceu sua senha?</h1>
              <p className="font-info text-sm text-detail-darker">
                Informe o endereço de e-mail cadastrado para receber o link de
                redefinição de senha.
              </p>
            </div>
            <form
              className="flex flex-col mt-8 gap-4 justify-around items-center"
              onSubmit={handleSubmit}
            >
              <Input
                iconSrc={mailIcon}
                type="email"
                placeholder="Email"
                onChange={handleChangeEmail}
              />
              <Button type="submit">Enviar</Button>
            </form>
            <Link
              className="font-display text-secondary text-xs text-center w-full hover:text-secondary-light transition-colors"
              to="/"
            >
              Voltar
            </Link>
          </>
        )}
      </div>
    </Main>
  );
}
