import Head from "next/head";
import React from "react";
import Gameview from "../../components/home/games/gameview";

export default function game() {
  return (
    <div className="md:pl-[70px] mt-4 sm:pl-0 overflow-x-hidden">
      <Head>
        <title>Dworfz | Game</title>
      </Head>
      <Gameview />
    </div>
  );
}
