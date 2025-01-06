"use client";

import * as React from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "components/toast";

export function Providers(props: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {props.children}
      <Toaster />
    </SessionProvider>
  );
}
