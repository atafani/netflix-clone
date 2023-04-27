import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connectMongoDb, connectToDatabase } from "../libs";
import { User } from "../models";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    Credentials({
      name: "Email and Password",
      credentials: {},
      async authorize(credentials: any) {
        await connectToDatabase(); // Your database connection function
        const { email, phone } = credentials;
        const user = await User.findOne({ $or: [{ email }, { phone }] });

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
  adapter: MongoDBAdapter(connectMongoDb()),
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin";
      return token;
    },
    async session({ session, token, user }) {
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: true,
};

export default NextAuth(authOptions);
