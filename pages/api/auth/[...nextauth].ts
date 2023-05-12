import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectToDatabase } from "../libs";
import { User } from "../models";
import { signIn } from "next-auth/react";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Email and Password",
      credentials: {},
      async authorize(credentials: any) {
        await connectToDatabase();
        const { email, phone } = credentials;
        // const user = await User.findOne({ $or: [{ email }, { phone }] });
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("No user found with that email.");
        }
        if (!user.password) {
          throw new Error("Account not set up.");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Invalid password.");
        }

        return Promise.resolve({ id: user._id, email: user.email }); // The returned object will be saved in the JWT
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // The number of seconds until the session expires (e.g., 30 days).
    updateAge: 24 * 60 * 60, // The number of seconds to wait before updating the session (e.g., 24 hours).
  },
  callbacks: {
    async session({ session, token, user }) {
      await connectToDatabase();
      const loggedUser = await User.findOne({ email: session?.user?.email });
      session.user = loggedUser;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET!,

  logger: {
    error(code, metadata) {
      console.error("error", code, metadata);
    },
    warn(code) {
      console.warn("warn", code);
    },
    debug(code, metadata) {
      console.debug("debug", code, metadata);
    },
  },
};

export default NextAuth(authOptions);
