import Head from "next/head";
import React from "react";
import Tasks from "../components/games/gametask";

export default function gametask() {
  return (
    <div className="md:pl-20 sm:pl-0 overflow-x-hidden">
      <Head>
        <title>Gaming Rewards</title>
        <link rel="rel" href="/favicon.ico" />
      </Head>
      <Tasks />
    </div>
  );
}
