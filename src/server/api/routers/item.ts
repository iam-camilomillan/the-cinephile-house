import { z } from "zod";

/* TRPC imports */
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

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

      console.log(item);

      return item;
    }),

  addToFavorites: protectedProcedure
    .input(z.object({ tmdbId: z.number(), inFavorites: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const addedToFavorites = await ctx.db.item.create({
        data: {
          tmdbId: `${input.tmdbId}`,
          inFavorites: input.inFavorites,
          userId: ctx.session.user.id,
        },
      });

      return addedToFavorites;
    }),

  addToWatchLater: protectedProcedure
    .input(z.object({ tmdbId: z.number(), inWatchLater: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const addedToWatchLater = await ctx.db.item.create({
        data: {
          tmdbId: `${input.tmdbId}`,
          inWatchLater: input.inWatchLater,
          userId: ctx.session.user.id,
        },
      });

      return addedToWatchLater;
    }),

  addToBookmarks: protectedProcedure
    .input(z.object({ tmdbId: z.number(), inBookmarks: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const addedToBookmarks = await ctx.db.item.create({
        data: {
          tmdbId: `${input.tmdbId}`,
          inBookmarks: input.inBookmarks,
          userId: ctx.session.user.id,
        },
      });

      return addedToBookmarks;
    }),
});
