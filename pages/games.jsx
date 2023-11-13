import Head from "next/head";
import React from "react";
import Gamess from "../components/games/games";
import Backkk from "../public/Backkk.png";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

export default function games() {
  return (
    <div className="md:pl-20 sm:pl-0 overflow-x-hidden">
      <Head>
        <title>Games</title>
        <link rel="rel" href="/favicon.ico" />
      </Head>
      <div className="w-[90%] xl:w-[80%] mx-auto flex justify-end mt-4">
        <Link href={"/"}>
          <Image src={Backkk} width={60} height={30} alt="" />
        </Link>
      </div>
      <Gamess />
    </div>
  );
}
