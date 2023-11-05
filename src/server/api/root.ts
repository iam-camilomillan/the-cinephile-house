/* TRPC Api imports */
import { createTRPCRouter } from "~/server/api/trpc";

/* Routers imports */
import { tmdbRouter } from "~/server/api/routers/tmdb";

export const appRouter = createTRPCRouter({
  tmdb: tmdbRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
