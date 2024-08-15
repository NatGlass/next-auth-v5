"use client";

import type { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

function Providers({children}: PropsWithChildren) {
  return <SessionProvider>
    {children}
  </SessionProvider>;
}

export default Providers;
