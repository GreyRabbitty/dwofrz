import { getSession } from "next-auth/client";
import { getToken } from "next-auth/jwt";
import { TwitterApi } from 'twitter-api-v2';
import Twitter from "twitter-lite";

export default async (req, res) => {
  // const body = JSON.parse(req.body);
  const screen_name = req.body.name;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const second_client = new TwitterApi({
    appKey: process.env.TWITTER_CONSUMER_KEY,
    appSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessToken: token.twitter.accessToken,
    accessSecret: token.twitter.refreshToken
  })

  const twitter = second_client.readWrite;

  if (!token) {
    return res.status(401).json({
      status: "ERR",
      message: "you are not allowed"
    })
  } 


  try {

    
    const rest = await twitter.v2.usersByUsernames(screen_name)

    // .users({
    //     screen_name: screen_name
    //   })
    // const rest = await twitter.v1.users({
    //     screen_name: screen_name
    //   })

    return res.status(200).json({
      status: "Ok",
      // result: rest[0].id_str
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "ERR", 
      message: error
      });
  }
};
