import Twitter from "twitter-lite";
import { getSession } from "next-auth/client";
import { getToken } from "next-auth/jwt";
import { TwitterApi } from 'twitter-api-v2';

export default async (req, res) => {
  const body = JSON.parse(req.body);
  const { query } = body;

  const session = await getSession({ req });
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return res.status(401).json({
      status: "ERR",
      message: "you are not allowed"
    })
  } 

  const client = new Twitter({
    subdomain: "api",
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: token.twitter.accessToken,
    access_token_secret: token.twitter.refreshToken,
  });
  
  try {
    const results = await client.get("statuses/user_timeline", {
      screen_name: token.twitter.screen_name,
      count: 50,
    });
    return res.status(200).json({
      status: "Ok",
      data: results,
    });
  } catch (e) {
    return res.status(400).json({
      status: e.message,
    });
  }
};