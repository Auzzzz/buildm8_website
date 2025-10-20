import { type DefaultSession, type NextAuthConfig } from "next-auth";
import { type JWT } from "next-auth/jwt";
//TODO: NEW | fix refresh token not 'refreshing'
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
      email: string;
      name: string;
      image: string;
    } & DefaultSession["user"];
    accessToken?: string;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    error?: string;
    userId: string;
  }
}

/**
 * Custom FusionAuth Provider Configuration
 */
const FusionAuthProvider = {
  id: "fusionauth",
  name: "FusionAuth",
  type: "oauth" as const,
  clientId: process.env.FUSIONAUTH_CLIENT_ID,
  clientSecret: process.env.FUSIONAUTH_CLIENT_SECRET,
  issuer: process.env.FUSIONAUTH_ISSUER,
  authorization: {
    url: `${process.env.FUSIONAUTH_ISSUER}/oauth2/authorize`,
    params: {
      scope: "openid profile email",
      response_type: "code",
    },
  },
  token: `${process.env.FUSIONAUTH_ISSUER}/oauth2/token`,
  userinfo: `${process.env.FUSIONAUTH_ISSUER}/oauth2/userinfo`,
  jwks: `${process.env.FUSIONAUTH_ISSUER}/.well-known/jwks.json`,
  profile(profile: {
    sub: string;
    name?: string;
    preferred_username?: string;
    email?: string;
    picture?: string;
  }) {
    return {
      id: profile.sub,
      name: profile.name ?? profile.preferred_username,
      email: profile.email,
      image: profile.picture,
    };
  },
};

/**
 * Refresh access token using refresh token
 */
async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const url = `${process.env.FUSIONAUTH_ISSUER}/oauth2/token`;
    
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: new URLSearchParams({
        client_id: process.env.FUSIONAUTH_CLIENT_ID!,
        client_secret: process.env.FUSIONAUTH_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken!,
      }),
    });

    const refreshedTokens: {
      access_token: string;
      expires_in: number;
      refresh_token?: string;
    } = await response.json() as {
      access_token: string;
      expires_in: number;
      refresh_token?: string;
    };

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    FusionAuthProvider,
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at ? account.expires_at * 1000 : Date.now() + 60 * 60 * 1000,
          userId: account.providerAccountId, // Use the FusionAuth user ID from account
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires ?? 0)) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (token.error) {
        session.error = token.error;
      }
      
      return {
        ...session,
        user: {
          ...session.user,
          id: (token.userId ?? token.sub) as string, // Use the stored FusionAuth user ID, fallback to sub
        },
        accessToken: token.accessToken,
      };
    },
  },
  pages: {
    signIn: "/auth/signin",
    // error: "/auth/error",
  },
} satisfies NextAuthConfig;
