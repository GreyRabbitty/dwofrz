import Head from "next/head";
import React from "react";
import Tweets from "../components/twitter/tweets";

export default function twitter() {
  return (
    <div className=" pl-[3px] md:pl-[70px] overflow-x-hidden">
      <Head>
        <title>Tweets</title>
        <link rel="rel" href="/favicon.ico" />
      </Head>
      <Tweets />
    </div>
  );
}
