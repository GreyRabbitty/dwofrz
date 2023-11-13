import { getToken } from "next-auth/jwt";
import { TwitterApi } from 'twitter-api-v2';

export default async (req, res) => {
  const body = JSON.parse(req.body);
  const { name } = body;


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

  if (!token) {
    return res.status(401).json({
      status: "ERR",
      message: "you are not allowed"
    })
  }

  // console.log(name);

  try {
    const twitter = second_client.readWrite

    const result = await twitter.v2.following(token.sub, {
      max_results: 300
    });
    // console.log(result.data.length);

    // console.log(result);
    let follow = false;
    result.data.map((_twitter) => {
      if (name == _twitter.name) {
        follow = true;
      }
    })

    // const results = await client.get("users/show", {
    //   screen_name: query,
    //   //   count: 10,
    // });
    // console.log(follow);

    return res.status(200).json({
      status: "Ok",
      follow: follow,
    });
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      status: "ERR",
    });
  }
};