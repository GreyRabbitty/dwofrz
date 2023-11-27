import { getSession } from "next-auth/client";
import { getToken } from "next-auth/jwt";
import { TwitterApi } from "twitter-api-v2";

export default async (req, res) => {
  const body = JSON.parse(req.body);
  const { id } = body;

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
    accessSecret: token.twitter.refreshToken,
  });

  const twitter = second_client.readWrite;

  try {
    const rest = await twitter.v2.userTimeline(token.sub, {
      max_results: 50,
      "tweet.fields": "in_reply_to_user_id,referenced_tweets",
    });
    let replay = false;
    let retweet = false;

    rest._realData.data.map((tweet) => {
      tweet.referenced_tweets.map((type) => {
        if (type.type == "replied_to") {
          if (type.id == id) {
            replay = true;
          }
        } else if (type.type == "retweeted") {
          if (type.id == id) {
            retweet = true;
          }
        }
      });
    });
    // const results = await client.get("statuses/show", {
    //   id: id,
    //   count: 1,
    // });
    return res.status(200).json({
      status: "Ok",
      replay: replay,
      retweet: retweet,
    });
  } catch (e) {
    // console.log(e);
    return res.status(400).json({
      status: e.message,
    });
  }
};
