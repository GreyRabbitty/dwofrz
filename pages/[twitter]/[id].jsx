import React, { useEffect, useState } from "react";
import Twittter from "../../components/twitter/twittter";
import Head from "next/head";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { CircleLoader } from "react-spinners";
 
export default function twitter() {
  const [data, setData] = useState(null);
  const [twitter_name, setTwitterName] = useState(null);
  const [twitter_id, setTwitterId] = useState(null);
  const [found, setFound] = useState(null);
  const [session, setSession] = useState(null);

  const router = useRouter();
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (router.query.id) {
      get_info(signal);
    }
    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  }, [router.query]);

  async function get_info(signal) {
    try {
    const session1 = await getSession();
    setSession(session1);
    const tweet_id = router.query.id;
    setTwitterId(tweet_id);
    const twitter_name = router.query.twitter;
    setTwitterName(twitter_name);
    if (twitter_name && tweet_id) {
      const result = await fetch(
        `/api/database/tweet?collection=tweets&database=tweets&twitter_id=${tweet_id}`,
        {
          signal: signal,
        })
        const result_json = await result.json()
        if (result_json) {
          setData(result_json)
        }
      }
    } catch(e) {}
  }

  return (
    <div className="sm-pl-0 md:pl-20">
      <Head>
        <title>Twitter</title>
      </Head>
      {data !== null ? (
        <Twittter
          twitter_session={session}
          tweet_id={twitter_id}
          twitter_name={twitter_name}
          data={data}
        />
      ) : (
        <div className=" h-[90vh] grid place-items-center">
          <div className="md:-ml-[5vw] dark:hidden">
            <CircleLoader size={70} color="#ffa800" />
          </div>
          <div className="md:-ml-[5vw] hidden dark:block">
            <CircleLoader size={70} color="#222" />
          </div>
        </div>
      )}
    </div>
  );
}
