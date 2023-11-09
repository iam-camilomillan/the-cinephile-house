/* NextAuth imports */
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

/* NextAuth providers imports */
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

/* Database imports */
import { db } from "~/server/db";

/* Bcrypt imports */
import bcrypt from "bcrypt";

/* Env variables imports */
import { env } from "~/env.mjs";

interface Credentials {
  email: string;
  password: string;
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      type: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials as Credentials;

        if (email.length < 1) {
          throw new Error("Email shouldn't be empty.");
        }

        if (password.length < 6) {
          throw new Error("Password should be at least 6 characters long.");
        }

        const user = await db.user.findUnique({ where: { email } });

        if (!user) {
          throw new Error("User doesn't exist.");
        }

        if (user.hashedPassword) {
          const passwordsMatch = await bcrypt.compare(
            password,
            user.hashedPassword,
          );

          if (!passwordsMatch) {
            throw new Error("Passwords doesn't match.");
          }
        }

        return user;
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
