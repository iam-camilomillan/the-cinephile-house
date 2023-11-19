/* Superjson imports */
import superjson from "superjson";

/* Types imports */
import { type AppRouter } from "~/server/api/root";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";

/* Superjson declaration */
export const transformer = superjson;

function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getUrl() {
  return getBaseUrl() + "/api/trpc";
}

export type RouterInputs = inferRouterInputs<AppRouter>;

export type RouterOutputs = inferRouterOutputs<AppRouter>;
