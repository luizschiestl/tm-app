import { ReactNode } from "react";

export function Card({ children }: { children?: ReactNode }) {
  return (
    <div className="rounded bg-clear absolute top-1/3 left-1/2 -translate-y-1/3 -translate-x-1/2 shadow flex">
      {children}
    </div>
  );
}
