/* TRPC imports */
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

/* API imports */
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

/* Env variables imports */
import { env } from "~/env.mjs";

/* Types imports */
import { type NextRequest } from "next/server";

/* Router handler */
const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ req }),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,
  });

export { handler as GET, handler as POST };
