import Head from "next/head";
import React, { useEffect, useState } from "react";
import Allfeatured from "../components/home/featured/allfeatured";
import { ScaleLoader, MoonLoader, CircleLoader } from "react-spinners";
import { getSession } from "next-auth/client";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useWeb3React } from "@web3-react/core";

export default function featured() {
  const [tweets, setTweets] = useState(null);
  const [get_entries, setEntries] = useState();
  const AnchorWallet = useAnchorWallet();
 

  const {
    active,
    account,
  } = useWeb3React();


  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      let arr = []
      if (!tweets) {
      const result = await fetch(
        `/api/database?database=tweets&collection=tweets`,
        {
          signal: signal,
        }
      );
      const json = await result.json();
      arr = json;
      setTweets(json);
      } else {
        arr = tweets
      }
    const session = await getSession();
    if (!session) return;
    let twitter_id;
  
    const twitter_id_resp = await fetch("/api/twitter/get_session");
    twitter_id = (await twitter_id_resp.json()).twitter_id;


      const entires_resp = await fetch(`/api/database?database=user_raffle&collection=${twitter_id}`, {
        signal: signal
      })
      const entries = await entires_resp.json();

      
      if (entries && entries.length > 0) {
        setEntries(entries)
      }

      check_mark(arr, entries)

    })()

    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };

  }, [AnchorWallet, active])

  // const calculation = useMemo(() => tweets && get_entries && check_mark(), [get_entries, tweets]);


  async function check_mark(tweet_availbe, user_entries) {
    if (tweet_availbe && user_entries) {
      const arr = tweet_availbe;
      tweet_availbe.map((tweet, i) => {
        user_entries.map((entries, j) => {
          if (entries.twitter_id == tweet.twitter_id) {
            arr[i].done = true;
          }
        })
      })
      setTweets(arr);
      return arr;
    }
    return tweets;
  }
  return (
    <div>
      <Head>
        <title>All Featured</title> <link rel="rel" href="/favicon.ico" />
      </Head>
      {tweets ? (
        <Allfeatured tweets={tweets} />
      ) : (
        <div className=" h-[90vh] grid place-items-center">
          <div className="md:-ml-[5vw]">
            <CircleLoader size={70} color="#ffa800" />
          </div>
        </div>
      )}
    </div>
  );
}
