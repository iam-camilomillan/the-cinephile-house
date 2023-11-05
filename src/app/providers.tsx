"use client";

/* NextUI imports */
import { NextUIProvider } from "@nextui-org/react";

export function NextUIProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
