import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import line from "../public/Lines.png";

export default function err() {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Error</title>
      </Head>
      <div className="w-full h-[75vh] overflow-x-hidden grid place-items-center">
        <div className="text-center">
          <div className="text-[160px] w-fit h-[200px] mx-auto newstyle font-semibold relative">
            <div className="absolute -right-12 -top-[9%]">
              <Image src={line} width={100} height={20} alt="" />
            </div>
            404
          </div>
          <div className="text-2xl text-[var(--dwtwo)] dark:text-gray-800">
            Whoops... Page Not Found !!!
          </div>
          <div
            onClick={() => router.push("/")}
            className="mt-5 connect w-fit mx-auto px-8 py-2 font-normal cursor-pointer border border-[var(--dwtop)] dark:border-gray-800 dark:bg-gray-200 rounded-xl bg-[var(--dwtrakc)] text-center text-sm"
          >
            Go Home
          </div>
        </div>
      </div>
    </div>
  );
}
