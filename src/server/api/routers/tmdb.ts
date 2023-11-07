import { z } from "zod";

/* TRPC imports */
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

/* Env variables imports */
import { env } from "~/env.mjs";

/* Types imports */
import type {
  TMDBGenresRequest,
  TMDBMovieRequest,
  TMDBTVShowRequest,
} from "types";

/* TMDB base url */
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

  discoverMovies: publicProcedure
    .input(
      z.object({
        page: z.number(),
        genres: z.array(z.string()),
        ratingFrom: z.number(),
        ratingTo: z.number(),
        voteCountFrom: z.number(),
        voteCountTo: z.number(),
        releaseDateFrom: z.number(),
        releaseDateTo: z.number(),
        orderBy: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const genresFormatted = input.genres.join("%2C");

      const request = await fetch(
        `${baseURL}/discover/movie?api_key=${env.TMDB_API_KEY}&include_adult=false&include_video=false&language=en-US&page=${input.page}&primary_release_date.gte=${input.releaseDateFrom}&primary_release_date.lte=${input.releaseDateTo}&vote_average.gte=${input.ratingFrom}&vote_average.lte=${input.ratingTo}&vote_count.gte=${input.voteCountFrom}&vote_count.lte=${input.voteCountTo}&with_genres=${genresFormatted}&sort_by=${input.orderBy}`,
      );

      const data = (await request.json()) as TMDBMovieRequest;

      return data;
    }),

  discoverTVShows: publicProcedure
    .input(
      z.object({
        page: z.number(),
        genres: z.array(z.string()),
        ratingFrom: z.number(),
        ratingTo: z.number(),
        voteCountFrom: z.number(),
        voteCountTo: z.number(),
        releaseDateFrom: z.number(),
        releaseDateTo: z.number(),
        orderBy: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const genresFormatted = input.genres.join("%2C");

      const request = await fetch(
        `${baseURL}/discover/tv?api_key=${env.TMDB_API_KEY}&include_adult=false&include_video=false&language=en-US&page=${input.page}&first_air_date.gte=${input.releaseDateFrom}&first_air_date.lte=${input.releaseDateTo}&vote_average.gte=${input.ratingFrom}&vote_average.lte=${input.ratingTo}&vote_count.gte=${input.voteCountFrom}&vote_count.lte=${input.voteCountTo}&with_genres=${genresFormatted}&sort_by=${input.orderBy}`,
      );

      const data = (await request.json()) as TMDBTVShowRequest;

      return data;
    }),

  getGenres: publicProcedure
    .input(
      z.object({
        type: z.enum(["movie", "tv"]),
      }),
    )
    .query(async ({ input }) => {
      const request = await fetch(
        `${baseURL}/genre/${input.type}/list?api_key=${env.TMDB_API_KEY}&language=en-US`,
      );

      const data = (await request.json()) as TMDBGenresRequest;

      return data.genres;
    }),

  /* create: protectedProcedure
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
  }), */
});
