import { TwitterApi } from 'twitter-api-v2';
import { getToken } from "next-auth/jwt";

export default async (req, res) => {
  const body = JSON.parse(req.body);
  const { status, in_reply_to_status_id, auto_populate_reply_metadata } = body;

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
  });

  const twitter = second_client.readWrite;

  try {

    console.log('second_client ==>', second_client);
    const rest = await twitter.v2.reply(status, in_reply_to_status_id)

    console.log('Comment is success ===>')

    return res.status(200).json({
      status: "Ok",
    });

  } catch (e) {
    console.log('error in comment ===>', e);
    return res.status(500).json({
      status: "ERR",
      message: e
      });
  }
};
