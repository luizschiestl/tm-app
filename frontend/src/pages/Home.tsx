import { LoginForm } from "../components/LoginForm";
import { TestInfo } from "../components/TestInfo";

export function Home() {
  return (
    <div className="flex min-w-[400px]">
      <LoginForm />
      <TestInfo />
    </div>
  );
}
