import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({

  providers: [
    Providers.Twitter({
      clientId: 'EpKtxyByzbkcGGTWoQjecgzRH',
      clientSecret: 'mWbvLSHbZ9z7Vf0mXTwvqHuKez44kqsOt4x0v4zhg0YD2R3eMF',
    }),
    // Providers.Discord({
    //   clientId: process.env.DISCORD_ID,
    //   clientSecret: process.env.DISCORD_PUBLIC_KEY,
    //   scope: "guilds"
    // }),
  ],

  callbacks: {
    async signIn(user, account, profile) {
      return true
    },
    async session(session, user) {
      session.user = user
      return session
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (user) {
        token.id = user.id
      }
      return token
    }
  },

  secret: '3xUCasMVNlM0scpZ6Pe1ecmswHASaXrX4OwgnwgbpezPg',
});
