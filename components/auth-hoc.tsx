"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

export const withAuth = <P extends object>(
  Component: React.ComponentType<P>
): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<unknown>> => {
  const ForwardedComponent = React.forwardRef<unknown, P>((props, ref) => (
    <SessionProvider>
      <Component {...(props as P)} ref={ref} />
    </SessionProvider>
  ));

  ForwardedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;

  return ForwardedComponent;
};

export default withAuth;
