import Head from "next/head";
import React from "react";
import Gamess from "../components/home/games/gametasks";

export default function gametaskes() {
  return (
    <div className="md:pl-[70px] sm:pl-[5px] overflow-x-hidden">
      <Head>
        <title>Dworfs | Games</title>
        <link rel="rel" href="/favicon.ico" />
      </Head>
      <Gamess />
    </div>
  );
}
