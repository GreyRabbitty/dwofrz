// import Twitter from "twitter-lite";
import { getSession } from "next-auth/client";
import { getToken } from "next-auth/jwt";
import { TwitterApi } from 'twitter-api-v2';

export default async (req, res) => {
  const body = JSON.parse(req.body);
  const { twitter_name } = body;

  const session = await getSession({ req });
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // const client = new Twitter({
  //   subdomain: "api",
  //   consumer_key: process.env.TWITTER_CONSUMER_KEY,
  //   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  //   access_token_key: token.twitter.accessToken,
  //   access_token_secret: token.twitter.refreshToken,
  // });

  const second_client = new TwitterApi({
    appKey: process.env.TWITTER_CONSUMER_KEY,
    appSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessToken: token.twitter.accessToken,
    accessSecret: token.twitter.refreshToken
  })


  try {
    // const results = await client.post("friendships/create", {
    //   screen_name: twitter_name,
    // });

    const twitter = second_client.readWrite
    const rest = await twitter.v2.usersByUsernames(twitter_name);
    await twitter.v2.follow(token.sub, rest.data[0].id)

    return res.status(200).json({
      status: "Ok",
    });
  } catch (e) {
    // console.log(e)
    return res.status(500).json({
      status: "ERR", 
      message: e
      });
  }
};