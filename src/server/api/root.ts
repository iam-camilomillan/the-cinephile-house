import { createTRPCRouter } from "~/server/api/trpc";

/* Routers */
import { tmdbRouter } from "~/server/api/routers/tmdb";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  tmbd: tmdbRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
