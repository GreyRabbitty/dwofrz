import Head from "next/head";
import React from "react";
import Tasks from "../components/conferm/tasks";

export default function conferm() {
  return (
    <div>
      <Head>
        <title>Dworfz</title>
        <link rel="rel" href="/favicon.ico" />
      </Head>
      <Tasks />
    </div>
  );
}
