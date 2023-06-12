import { Button } from "./layout/Button";
import graphic from "../assets/graphic.svg";
import { Aside } from "./layout/Aside";

export function TestInfo() {
  return (
    <Aside>
      <div className="flex flex-col gap-8 justify-center items-center">
        <div className="w-full">
          <h1 className="font-title text-3xl text-white">
            Teste de
            <br />
            requisitos
          </h1>
          <p className="font-info text-sm text-white">
            Teste seus acessos a câmera, microfone e velocidade da internet.
          </p>
        </div>
        <img src={graphic} alt="sound waves" className="w-full" />
        <Button variant="secondary">Realizar Teste</Button>
      </div>
    </Aside>
  );
}
