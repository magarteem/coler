"use client";
import { ReactNode } from "react";
import { ModalProvider } from "./ModalProvider";
import { SessionProvider } from "next-auth/react";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <ModalProvider>{children}</ModalProvider>
    </SessionProvider>
  );
};
