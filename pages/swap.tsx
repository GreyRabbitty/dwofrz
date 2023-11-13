import Head from "next/head";
import React from "react";
import SwapSections from "../components/SwapSections/SwapSections";

const Swap = () => {
  return (
    <>
      <Head>
        <title>Dworfz | Swap</title>
        <link rel="rel" href="/favicon.ico" />
      </Head>
      <SwapSections />
    </>
  );
};

export default Swap;
