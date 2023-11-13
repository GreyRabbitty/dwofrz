import Head from "next/head";
import Image from "next/image";
import React from "react";
import coming_soon from "../public/coming_soon.png";
import Backkk from "../public/Backkk.png";
import Link from "next/link";
import { useRouter } from "next/router";

export default function pandora() {
  const router = useRouter();
  return (
    <div
      className="grid place-items-center w-full h-[90vh]"
      onClick={() => router.push("/")}
    >
      <Head>
        <title>Dworfz | Fall Arena</title>
        <title>
          <link rel="rel" href="/favicon.ico" />
        </title>
      </Head>
      <div className="">
        <Image
          src={
            "https://media.discordapp.net/attachments/1030474275662082098/1045009502069600348/pink-blue-crystal-badge.gif"
          }
          width={500}
          height={200}
          alt=""
        />
      </div>
      <div className="fixed w-screen h-screen top-0 left-0 backdrop-blur-sm z-[300]">
        <div className="absolute z-[3000] sm:w-[40px] md:w-auto active:scale-105 transition-all top-[10%] right-[10%]">
          <Link href={"/"}>
            <Image src={Backkk} width={80} height={30} alt="" />
          </Link>
        </div>
        <div className="relative grid place-items-center w-full h-full">
          <Image
            className="mx-auto max-w-[90%]"
            src={coming_soon}
            width={750}
            height={200}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
