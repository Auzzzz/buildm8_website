
import { type Account, type DefaultSession, type NextAuthConfig, type Session, type User } from "next-auth";
// import FusionAuthProvider from "next-auth/providers/fusionauth";
import NextAuth from "next-auth";

import FusionAuthProvider from "next-auth/providers/fusionauth";




//TODO: Type safety
import { type JWT } from "next-auth/jwt";

import type { decodedIDToken_Payload } from "~/lib/types/fusionAuth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      image?: string | null;
      email?: string | null;
      test?: string;
    } & DefaultSession["user"];
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    exp: number;
    iat: number;
    test?: string;
    error?: string;
  }


}

export const authConfig: NextAuthConfig = {
  providers: [
    FusionAuthProvider({
      clientId: process.env.FUSIONAUTH_CLIENT_ID!,
      clientSecret: process.env.FUSIONAUTH_CLIENT_SECRET!,
      issuer: process.env.FUSIONAUTH_ISSUER!,
      authorization: {
        url: `${process.env.FUSIONAUTH_ISSUER}/oauth2/authorize`,
        params: {
          scope: "openid offline_access",
        },
      },
      token: {
        url: `${process.env.FUSIONAUTH_ISSUER}/oauth2/token`,
      },
      userinfo: `${process.env.FUSIONAUTH_ISSUER}/oauth2/userinfo`,
    }),
  ],

  session: {
    strategy: "jwt", // Use JWT for session management
  },

  callbacks: {

    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user?: User ;
      account?: Account | null;
    }) {
      // If signing in, add user and account info to the token
              console.log("user:", user);
        console.log("account:", account);
        console.log("token:", token);
      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at! * 1000,
          user,
        };
      }
      console.log("JWT token expires at:", account);
      if (account && Date.now() < account.expires_at!) {
        return token;
      } 

      // If the token has expired, refresh it
      return await refreshAccessToken(token);

    
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      // Add token and user info to the session
      session.user = token.user as Session["user"];
      session.accessToken = token.accessToken as string;
      session.error = 'RefreshAccessTokenError'

        console.log("session token", token);
      
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },

  debug: process.env.NODE_ENV === "development", // Enable debug logging in development
};

// Function to refresh the access token
async function refreshAccessToken(token: JWT) {
  console.log("Refreshing access token...");
  try {
    const url = `${process.env.FUSIONAUTH_ISSUER}/oauth2/token`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.FUSIONAUTH_CLIENT_ID!,
        client_secret: process.env.FUSIONAUTH_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken as string,
      }),
    });

    const refreshedTokens = await response.json() 

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Use new refresh token if provided
      user: {
        id: refreshedTokens.userId,
        // test: "test",
      }
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth(authConfig);
