import { Item } from "@prisma/client";
import { Movie, TVShow } from "types";
import { z } from "zod";
import { env } from "~/env.mjs";

/* TRPC imports */
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { api } from "~/trpc/server";

export const itemRouter = createTRPCRouter({
  getItem: protectedProcedure
    .input(z.object({ tmdbId: z.number() }))
    .query(async ({ ctx, input }) => {
      const item = await ctx.db.item.findFirst({
        where: {
          tmdbId: `${input.tmdbId}`,
          userId: ctx.session.user.id,
        },
      });

      return item;
    }),

  getItemsInList: protectedProcedure
    .input(
      z.object({
        list: z.enum(["inFavorites", "inWatchLater", "inBookmarks"]),
      }),
    )
    .query(async ({ ctx, input }) => {
      const results: (Movie | TVShow)[] = [];

      const dbItems: Item[] = await ctx.db.item.findMany({
        where: {
          [input.list]: true,
          userId: ctx.session.user.id,
        },
      });

      for (const item of dbItems) {
        const request = await fetch(
          `https://api.themoviedb.org/3/${item.type}/${item.tmdbId}?api_key=${env.TMDB_API_KEY}&language=en-US`,
        );

        const data =
          item.type === "movie"
            ? ((await request.json()) as Movie)
            : ((await request.json()) as TVShow);

        results.push(data);
      }

      return results;
    }),

  getItemsInWatchLater: protectedProcedure.query(async ({ ctx }) => {
    const item = await ctx.db.item.findMany({
      where: {
        inWatchLater: true,
        userId: ctx.session.user.id,
      },
    });

    return item;
  }),

  getItemsInBookmarks: protectedProcedure.query(async ({ ctx }) => {
    const item = await ctx.db.item.findMany({
      where: {
        inBookmarks: true,
        userId: ctx.session.user.id,
      },
    });

    return item;
  }),

  addToFavorites: protectedProcedure
    .input(
      z.object({
        tmdbId: z.number(),
        type: z.enum(["movie", "tv"]),
        inFavorites: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const addedToFavorites = await ctx.db.item.create({
        data: {
          tmdbId: `${input.tmdbId}`,
          type: input.type,
          inFavorites: input.inFavorites,
          userId: ctx.session.user.id,
        },
      });

      return addedToFavorites;
    }),

  addToWatchLater: protectedProcedure
    .input(
      z.object({
        tmdbId: z.number(),
        type: z.enum(["movie", "tv"]),
        inWatchLater: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const addedToWatchLater = await ctx.db.item.create({
        data: {
          tmdbId: `${input.tmdbId}`,
          type: input.type,
          inWatchLater: input.inWatchLater,
          userId: ctx.session.user.id,
        },
      });

      return addedToWatchLater;
    }),

  addToBookmarks: protectedProcedure
    .input(
      z.object({
        tmdbId: z.number(),
        type: z.enum(["movie", "tv"]),
        inBookmarks: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const addedToBookmarks = await ctx.db.item.create({
        data: {
          tmdbId: `${input.tmdbId}`,
          type: input.type,
          inBookmarks: input.inBookmarks,
          userId: ctx.session.user.id,
        },
      });

      return addedToBookmarks;
    }),
});
