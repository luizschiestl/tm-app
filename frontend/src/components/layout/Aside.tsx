import { ReactNode } from "react";

export function Aside({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-r bg-primary flex-shrink max-w-[40%] shadow-inset p-8">
      {children}
    </div>
  );
}
