import { z } from "zod";

/* TRPC imports */
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

/* bcrypt imports */
import bcryp from "bcrypt";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        confirmPassword: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.password !== input.confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      const exist = await ctx.db.user.findFirst({
        where: {
          email: input.email,
        },
      });

      if (exist) {
        throw new Error("The user already exist.");
      }

      const hashedPassword = await bcryp.hash(input.password, 10);

      const user = await ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          hashedPassword,
        },
      });

      return user;
    }),
});
