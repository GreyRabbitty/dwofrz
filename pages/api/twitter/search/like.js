import { getToken } from "next-auth/jwt";
import { TwitterApi } from 'twitter-api-v2';

export default async (req, res) => {
    const body = JSON.parse(req.body);
    const { tweet_id } = body;
  
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
    let like = false;
    // const rest = await twitter.v2.userLikedTweets(token.sub, {
    //     max_results: 5,
    // })
    // const rest = await twitter.v2.tweetLikedBy(tweet_id, {
    //     max_results: 100,
    // })
    const rest = await twitter.v2.tweets(tweet_id, {

    });


    // console.log(rest)

    // console.log(tweet_id);

    rest.data.map((liked) => {
        // console.log(liked.name)
        if (liked.id == token.sub) {
            like = true;
        }
    } )


    return res.status(200).json({
      status: "Ok",
      like: like,
    });
  } catch (e) {
    console.error(e)
    return res.status(400).json({
      status: e.message,
    });
  }
};
