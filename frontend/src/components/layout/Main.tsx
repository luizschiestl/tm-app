import { ReactNode } from "react";
import { Footer } from "./Footer";

export function Main({ children }: { children: ReactNode }) {
  return (
    <main className="m-8 flex-1 bg-clear">
      {children}
      <Footer />
    </main>
  );
}
