import { publicProcedure, router } from "@/server/trpc";

export const appRouter = router({
  getPopularMovies: publicProcedure.query(() => {
    return ["pelicula"];
  }),
});

export type AppRouter = typeof appRouter;
