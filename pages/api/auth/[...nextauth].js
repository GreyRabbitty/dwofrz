import { CoPresentOutlined } from "@mui/icons-material";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({

  providers: [
    Providers.Twitter({
      clientId: process.env.TWITTER_CONSUMER_KEY,
      clientSecret: process.env.TWITTER_CONSUMER_SECRET,
      // clientId: 'ETm3Dy9ruO8Q1BIEAwz3p6Xm5',
      // clientSecret: 'rjBrBIopIW7ZzkRyStLdtuOaLmxHvOMZ9tuxWr2sNlH8TdqAxk',
      // authorization: {
      //   params: { scope: "tweet.read users.read  tweet.write" },
      // },
    }),
    
    // Providers.Discord({
    //   clientId: process.env.DISCORD_ID,
    //   clientSecret: process.env.DISCORD_PUBLIC_KEY,
    //   scope: "guilds"
    // }),
    
  ],

  callbacks: {
    async signIn(user, account, profile) {
      // console.log('account in sigiIn ===> ', account);
      return true
    },
    async session(session, user) {
      session.user = user
      return session
    },
    async jwt(token, user, account, profile, isNewUser) {
      // console.log('account in jwt ===> ', account);
      // console.log('token in jwt ===> ', token);
      if (user) {
        token.id = user.id
      }
      if(account) {
        console.log('account ===> ', account);
        token.twitter = account;
        console.log('token after ====> ', token);
      }

      
      return token
    }
    
  },

  secret: process.env.NEXTAUTH_SECRET,
});
