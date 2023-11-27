import React from "react";
import Featured from "./featured/featured";
import Hot from "./hot/hot";
import Tweets from "./tweets/tweets";
import { useEffect, useState, useMemo } from "react";
import Games from "./games/games";
import Gamestasks from "./games/gamestask";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useWeb3React } from "@web3-react/core";
import { getSession } from "next-auth/client";

export default function Homepage() {
  const [hot_tweets, setHotTweets] = useState([]);
  const [featured_tweets, setFeaturedTweets] = useState([]);
  const [tweets, setTweets] = useState(null);
  const [get_entries, setEntries] = useState();
  const AnchorWallet = useAnchorWallet();

  const { active, account } = useWeb3React();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      let arr = [];
      if (!tweets) {
        const result = await fetch(
          `/api/database?database=tweets&collection=tweets`,
          {
            signal: signal,
          }
        );
        const json = await result.json();

        // console.log('tweets fetch result ===========> ', json);

        arr = json;
        setTweets(json);
        setHotTweets(json);
        setFeaturedTweets(json);
      } else {
        arr = tweets;
      }
      const session = await getSession();
      if (!session) return;
      let twitter_id;

      const twitter_id_resp = await fetch("/api/twitter/get_session");
      twitter_id = (await twitter_id_resp.json()).twitter_id;

      const entires_resp = await fetch(
        `/api/database?database=user_raffle&collection=${twitter_id}`,
        {
          signal: signal,
        }
      );
      const entries = await entires_resp.json();

      if (entries && entries.length > 0) {
        setEntries(entries);
      }

      check_mark(arr, entries);
    })();

    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  }, [AnchorWallet, active]);

  // const calculation = useMemo(() => tweets && get_entries && check_mark(), [get_entries, tweets]);

  async function check_mark(tweet_availbe, user_entries) {
    if (tweet_availbe && user_entries) {
      const arr = tweet_availbe;
      tweet_availbe.map((tweet, i) => {
        user_entries.map((entries, j) => {
          if (entries.twitter_id == tweet.twitter_id) {
            arr[i].done = true;
          }
        });
      });
      setTweets(arr);
      return arr;
    }
    return tweets;
  }

  return (
    <div>
      {featured_tweets && <Featured tweets={featured_tweets} />}
      {hot_tweets && <Hot tweets={hot_tweets} />}
      {tweets && <Tweets tweets={tweets} />}
      <Games />
      <Gamestasks />
    </div>
  );
}
