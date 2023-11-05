import { TMDBMovieRequest, TMDBTVShowRequest } from "types";
import { z } from "zod";
import { env } from "~/env.mjs";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const baseURL = "https://api.themoviedb.org/3";

export const tmdbRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        type: z.enum(["movie", "tv"]),
        header: z.string(),
        page: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const request = await fetch(
        `${baseURL}/${input.type}/${input.header}?api_key=${env.TMDB_API_KEY}&language=en-US&page=${input.page}`,
      );

      const data =
        input.type === "movie"
          ? ((await request.json()) as TMDBMovieRequest)
          : ((await request.json()) as TMDBTVShowRequest);

      return data.results;
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
