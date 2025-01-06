import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import TwitterProvider from "next-auth/providers/twitter";
import bcrypt from "bcrypt";
import { sendWelcomeEmail } from "lib/emails/send-welcome";
import { prisma } from "db/client";

//const isDev = process.env.NODE_ENV === "development";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // https://next-auth.js.org/configuration/providers/oauth
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // check to see if email and password is there
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Please enter an email and password");
        }

        // check to see if user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        // if no user was found
        if (!user || !user?.hashedPassword) {
          throw new Error("No user found");
        }

        // check to see if password matches
        const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword);

        // if password does not match
        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        return user;
      }
    }),
    GoogleProvider({
      allowDangerousEmailAccountLinking: true,
      clientId: process.env.GOOGLE_ID!!,
      clientSecret: process.env.GOOGLE_SECRET!!
    }),
    FacebookProvider({
      allowDangerousEmailAccountLinking: true,
      clientId: process.env.FACEBOOK_ID!!,
      clientSecret: process.env.FACEBOOK_SECRET!!
    }),
    TwitterProvider({
      allowDangerousEmailAccountLinking: true,
      clientId: process.env.TWITTER_ID!!,
      clientSecret: process.env.TWITTER_SECRET!!
    })
  ],
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   // Allow to sign in only
    //   //@ts-ignore
    //   const firstSignIn = Boolean(user?.createdAt);
    //   console.log('signIn callback', {
    //     user,
    //     account,
    //     profile,
    //     email,
    //     credentials
    //   });
    //   return isDev ? true : firstSignIn;
    // },
    async session({ session, user, token }): Promise<any | null> {
      if (token.error || token.exp === 0) {
        return null;
      }
      return { ...session, user: { ...session.user, id: token.sub! } };
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
    async jwt({ token, user }): Promise<any | null> {
      // Check if user exists in database on every token rotation
      if (token.sub) {
        const userExists = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { id: true }
        });

        if (!userExists) {
          return {
            ...token,
            error: "UserNotFound",
            exp: 0 // Expire the token immediately
          };
        }
      }

      return token;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60 // 24 hours
  },
  events: {
    async createUser(message) {
      const params = {
        name: message.user.name,
        email: message.user.email
      };
      await sendWelcomeEmail(params); // <-- send welcome email
    }
  },
  pages: {
    error: "/auth/error",
    signIn: "/auth/signin"
  }
  //debug: isDev
};
