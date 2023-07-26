import NextAuth from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"

export const authOptions = {
  providers: [
    Auth0Provider({
        clientId: process.env.AUTH0_CLIENT_ID as string,
        clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
        issuer: process.env.AUTH0_ISSUER_BASE_URL,
      })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt(token: { accessToken: any; }, user: { accessToken: any; }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session(session: { user: any; }, token: any) {
      session.user = token;
      return session;
    },
  },
}
export default NextAuth(authOptions as any);