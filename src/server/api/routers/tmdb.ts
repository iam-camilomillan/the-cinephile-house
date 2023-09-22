import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { env } from "~/env.mjs";

const baseUrl = "https://api.themoviedb.org/3";

export const tmdbRouter = createTRPCRouter({
  // API Requests
  fetchTMDB: publicProcedure
    .input(z.object({ categorie: z.string(), header: z.string() }))
    .query(async ({ input }) => {
      const movies = await fetch(
        `${baseUrl}/${input.categorie}/${input.header}?api_key=${env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`,
      );

      return movies.json();
    }),

  // API Requests
  videos: publicProcedure
    .input(z.object({ categorie: z.string(), id: z.number() }))
    .query(async ({ input }) => {
      const movies = await fetch(
        `${baseUrl}/${input.categorie}/${input.id}/videos?api_key=${env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`,
      );

      return movies.json();
    }),

  // Movies or TV Shows providers
  providers: publicProcedure
    .input(z.object({ categorie: z.string(), id: z.number() }))
    .query(async ({ input }) => {
      const movies = await fetch(
        `${baseUrl}/${input.categorie}/${input.id}/watch/providers?api_key=${env.NEXT_PUBLIC_TMDB_API_KEY}`,
      );

      return movies.json();
    }),
});
