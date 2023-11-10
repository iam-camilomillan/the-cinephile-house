/* TRPC Api imports */
import { createTRPCRouter } from "~/server/api/trpc";

/* Routers imports */
import { tmdbRouter } from "~/server/api/routers/tmdb";
import { itemRouter } from "~/server/api/routers/item";
import { userRouter } from "~/server/api/routers/user";

export const appRouter = createTRPCRouter({
  tmdb: tmdbRouter,
  item: itemRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
