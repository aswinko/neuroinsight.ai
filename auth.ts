import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
// import { PrismaAdapter } from "@auth/prisma-adapter";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Credentials from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import { db } from "./db";
// import { saltAndHashPassword } from "./src/utils/helper";
import {
  accounts,
  db,
  sessions,
  users,
  verificationTokens,
} from "./src/lib/db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  // session: { strategy: "jwt" },
  providers: [
    Github({ allowDangerousEmailAccountLinking: true }),
    Google({ allowDangerousEmailAccountLinking: true }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "aswin@neuroinsight.ai",
        },
        password: { label: "Password", type: "password" },
      },
      // authorize: async (credentials) => {
      //   if (!credentials || !credentials.email || !credentials.password) {
      //     return null;
      //   }

      //   console.log(credentials.email);

      //   const email = credentials.email as string;
      //   const hash = saltAndHashPassword(credentials.password as string);

      //   let user: any = await db.user.findUnique({
      //     where: {
      //       email,
      //     },
      //   });

      //   if (!user) {
      //     user = await db.user.create({
      //       data: {
      //         email,
      //         hashedPassword: hash,
      //       },
      //     });
      //   } else {
      //     const isMatch = bcrypt.compareSync(
      //       credentials.password as string,
      //       user.hashedPassword
      //     );

      //     if (!isMatch) throw new Error("Incorrect password!");
      //   }

      //   return user;
      // },
    }),
  ],
});
