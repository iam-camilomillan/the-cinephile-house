/* TRPC imports */
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

/* Zod imports */
import { z } from "zod";

export const dataRouter = createTRPCRouter({
  getItem: protectedProcedure
    .input(z.object({ tmdbId: z.number() }))
    .query(async ({ ctx, input }) => {
      const item = await ctx.db.item.findFirst({
        where: {
          tmdbId: `${input.tmdbId}`,
          userId: ctx.session.user.id,
        },
        include: {
          lists: true,
        },
      });

      return item;
    }),

  addToList: protectedProcedure
    .input(
      z.object({
        listId: z.string(),
        listTitle: z.string().or(z.literal("New list")),
        listEditable: z.boolean().or(z.literal(true)),
        itemId: z.string(),
        tmdbId: z.number(),
        type: z.enum(["movie", "tv"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      /* Checks if the list exists */
      const list = await ctx.db.list.findFirst({
        where: {
          id: input.listId,
          userId: ctx.session.user.id,
        },
      });

      if (list) {
        /* If the list exist updates it and connect the item or creates it */
        const itemAddedToList = await ctx.db.list.update({
          where: {
            id: input.listId,
          },
          data: {
            items: {
              connectOrCreate: {
                where: {
                  id: input.itemId,
                  userId: ctx.session.user.id,
                },
                create: {
                  tmdbId: `${input.tmdbId}`,
                  type: input.type,
                  userId: ctx.session.user.id,
                },
              },
            },
          },
          include: {
            items: true,
          },
        });

        return itemAddedToList;
      } else {
        /* Creates the list if it does not exist */
        const itemAddedToList = await ctx.db.list.create({
          data: {
            id: input.listId,
            title: input.listTitle,
            editable: input.listEditable,
            userId: ctx.session.user.id,
            items: {
              connectOrCreate: {
                where: {
                  id: input.itemId,
                  userId: ctx.session.user.id,
                },
                create: {
                  tmdbId: `${input.tmdbId}`,
                  type: input.type,
                  userId: ctx.session.user.id,
                },
              },
            },
          },
          include: {
            items: true,
          },
        });

        return itemAddedToList;
      }
    }),
});
