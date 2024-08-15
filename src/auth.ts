import argon2 from "argon2";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import * as v from "valibot";
import { findUserByEmail } from "./resources/user-queries";
import { SigninSchema } from "./validators/sign-in-validator";

const nextAuth = NextAuth({
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/sign-in",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = v.safeParse(SigninSchema, credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.output;

          const user = await findUserByEmail(email);

          if (!user) return null;

          if (!user.password) return null;

          const passwordsMatch = await argon2.verify(user.password, password);

          if (passwordsMatch) {
            const { password: _, ...userWithoutPassword } = user;

            return userWithoutPassword;
          }
        }

        return null;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
});

export const { signIn, auth, signOut, handlers } = nextAuth;
