/* API imports */
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

/* Zod imports */
import { z } from "zod";

/* Env variables imports */
import { env } from "~/env.mjs";

/* Types imports */
import {
  type VideoRequest,
  type DiscoverMovieRequest,
  type SearchRequest,
  type DiscoverTVShowRequest,
  type Genre,
} from "types";

interface GenresRequest {
  genres: Genre[];
}

export const tmdbRouter = createTRPCRouter({
  /* Search items by query */
  search: publicProcedure
    .input(
      z.object({
        query: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const request = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${env.TMDB_API_KEY}&query=${input.query}&include_adult=false&language=en-US&page=1`,
      );

      const data = (await request.json()) as SearchRequest;

      return data.results;
    }),

  /* Discover movie by params */
  discoverMovies: publicProcedure
    .input(
      z.object({
        page: z.number().default(1),
        genres: z.array(z.string()).default([""]),
        ratingFrom: z.number().min(1).max(10).default(1),
        ratingTo: z.number().min(1).max(10).default(10),
        voteCountFrom: z.number().default(0),
        releaseTypes: z
          .array(z.enum(["1", "2", "3", "4", "5", "6"]))
          .default([]),
        releaseDateFrom: z.string().default(""),
        releaseDateTo: z.string().default(""),
        orderBy: z
          .enum(["popularity.desc", "vote_average.desc"])
          .default("popularity.desc"),
      }),
    )
    .query(async ({ input }) => {
      const releaseTypes = input.releaseTypes.join("|");
      const genres = input.genres.join("%2C");

      const request = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${env.TMDB_API_KEY}&include_adult=false&include_video=false&language=en-US&page=${input.page}&primary_release_date.gte=${input.releaseDateFrom}&primary_release_date.lte=${input.releaseDateTo}&vote_average.gte=${input.ratingFrom}&vote_average.lte=${input.ratingTo}&vote_count.gte=${input.voteCountFrom}&with_release_type=${releaseTypes}&with_genres=${genres}&sort_by=${input.orderBy}`,
      );

      const data = (await request.json()) as DiscoverMovieRequest;

      return data;
    }),

  /* Discover tv shows by params */
  discoverTVShows: publicProcedure
    .input(
      z.object({
        page: z.number().default(1),
        genres: z.array(z.string()).default([""]),
        ratingFrom: z.number().min(1).max(10).default(1),
        ratingTo: z.number().min(1).max(10).default(10),
        voteCountFrom: z.number().default(0),
        releaseDateFrom: z.string().default(""),
        releaseDateTo: z.string().default(""),
        airDateFrom: z.string().default(""),
        airDateTo: z.string().default(""),
        orderBy: z
          .enum(["popularity.desc", "vote_average.desc"])
          .default("popularity.desc"),
      }),
    )
    .query(async ({ input }) => {
      const genres = input.genres.join("%2C");

      const request = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${env.TMDB_API_KEY}&include_adult=false&include_video=false&language=en-US&page=${input.page}&first_air_date.gte=${input.releaseDateFrom}&first_air_date.lte=${input.releaseDateTo}&air_date.gte=${input.airDateFrom}&air_date.lte=${input.airDateTo}&vote_average.gte=${input.ratingFrom}&vote_average.lte=${input.ratingTo}&vote_count.gte=${input.voteCountFrom}&with_genres=${genres}&sort_by=${input.orderBy}`,
      );

      const data = (await request.json()) as DiscoverTVShowRequest;

      return data;
    }),

  /* Gets item related videos */
  videos: publicProcedure
    .input(
      z.object({
        type: z.enum(["movie", "tv"]),
        itemId: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const request = await fetch(
        `https://api.themoviedb.org/3/${input.type}/${input.itemId}/videos?api_key=${env.TMDB_API_KEY}&language=en-US`,
      );

      const data = (await request.json()) as VideoRequest;

      return data;
    }),

  genres: publicProcedure
    .input(
      z.object({
        type: z.enum(["movie", "tv"]),
      }),
    )
    .query(async ({ input }) => {
      const request = await fetch(
        `https://api.themoviedb.org/3/genre/${input.type}/list?api_key=${env.TMDB_API_KEY}&language=en-US`,
      );

      const data = (await request.json()) as GenresRequest;

      return data.genres;
    }),
});
