/* TRPC imports */
import { initTRPC, TRPCError } from "@trpc/server";

/* Auth imports */
import { getServerAuthSession } from "~/server/auth";

/* Database imports */
import { db } from "~/server/db";

/* Zod imports */
import { ZodError } from "zod";

/* Types imports */
import { type NextRequest } from "next/server";

/* Superjson imports */
import superjson from "superjson";

/* Context interface declaration */
interface CreateContextOptions {
  headers: Headers;
}

/* Context declarations */
export const createInnerTRPCContext = async (opts: CreateContextOptions) => {
  const session = await getServerAuthSession();

  return {
    session,
    headers: opts.headers,
    db,
  };
};

export const createTRPCContext = async (opts: { req: NextRequest }) => {
  return await createInnerTRPCContext({
    headers: opts.req.headers,
  });
};

/* API initialization */

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/* Router */
export const createTRPCRouter = t.router;

/* Procedure */
export const publicProcedure = t.procedure;

/** Reusable middleware that enforces users are logged in before running the procedure. */
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

/* Protected procedure */
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
