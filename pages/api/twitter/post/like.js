import { getSession } from "next-auth/client";
import { getToken } from "next-auth/jwt";
import { TwitterApi } from 'twitter-api-v2';

export default async (req, res) => {
  const body = JSON.parse(req.body);
  const { tweet_id } = body;

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

  const second_client = new TwitterApi({
    appKey: process.env.TWITTER_CONSUMER_KEY,
    appSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessToken: token.twitter.accessToken,
    accessSecret: token.twitter.refreshToken
  })

  const twitter = second_client.readWrite;
  try {
    console.log('Trying to post Like to twitter')
    const result = await twitter.v2.like(token.sub ,tweet_id);
    return res.status(200).json({
      status: "Ok",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "ERR", 
      message: error
      });
  }
};
