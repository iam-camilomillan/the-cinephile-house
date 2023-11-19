/* Api router imports */
import { createTRPCRouter } from "~/server/api/trpc";

/* Routers imports */
import { tmdbRouter } from "~/server/api/routers/tmdb";
import { dataRouter } from "~/server/api/routers/data";

export const appRouter = createTRPCRouter({
  tmdb: tmdbRouter,
  data: dataRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
