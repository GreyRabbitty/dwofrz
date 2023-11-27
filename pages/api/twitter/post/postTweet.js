// import Twitter from "twitter-lite";
import { getSession } from "next-auth/client";
import { getToken } from "next-auth/jwt";
import { TwitterApi } from 'twitter-api-v2';
import OAuth from "oauth-1.0a";
import { createHmac } from "crypto";
import request from "request";

const oauth = new OAuth({
  consumer: {
    key: process.env.TWITTER_CONSUMER_KEY,
    secret: process.env.TWITTER_CONSUMER_SECRET,
  },
  signature_method: "HMAC-SHA1",
  hash_function(base_string, key) {
    return createHmac("sha1", key).update(base_string).digest("base64");
  },
});

const request_data = {
  url: "https://api.twitter.com/2/tweets",
  method: "POST",
};

export default async (req, res) => {
  const body = JSON.parse(req.body);
  const { replay } = body;

  // const session = await getSession({ req });
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log("token ===========>", token);

  const tokenByUser = {
    key: token.twitter.accessToken,
    secret: token.twitter.refreshToken,
  }

  console.log("tokenByUser ===========>", tokenByUser);

  try {

    const result = await new Promise((resolve, reject) => {
      request(
        {
          url: "https://api.twitter.com/2/tweets",
          method: request_data.method,
          headers: {
          ...oauth.toHeader(oauth.authorize(request_data, tokenByUser)),
          "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: "Good afternoon",
          }),
        },
        function (error, response, body) {
          if (!error && (response.statusCode === 200 || response.statusCode === 201)) {
            console.log("Tweet posted!");
            console.log("Body: ", body);
            resolve(JSON.parse(body));
          } else {
            console.log("tweetWithImage Error: ", error);
            console.log("Status code: ", response.statusCode);
            console.log("Body: ", body); // Print the response
            reject(error || new Error(`Status code: ${response.statusCode}`));
          }
        }
      );
    });
    console.log("====>>>>", result);

    res.send(result);
  } catch (e) {
    console.log('post error ==> ', e);
    return res.status(400).json({
      status: e.message,
    });
  }
};