import Image from "next/image";
import React from "react";
import unsplash0 from "../../public/unsplash0.png";
import unsplash1 from "../../public/unsplash1.png";
import unsplash2 from "../../public/unsplash2.png";
import unsplash3 from "../../public/unsplash3.png";
import unsplash4 from "../../public/unsplash4.png";
import unsplash5 from "../../public/unsplash5.png";
import unsplash6 from "../../public/unsplash6.png";
import unsplash7 from "../../public/unsplash7.png";
import unsplash8 from "../../public/unsplash8.png";
import { FaDiscord, FaTwitter } from "react-icons/fa";

export default function games() {
  const data = [
    {
      id: 1,
      img: "https://media.discordapp.net/attachments/1085293900706627595/1086248228221104210/unsplash_-SmCKTIcH5E_8.png",
      t1: "Collecting and Trade Materials",
      t2: "Craft 2 Materials (2/2)",
      t3: "Plant 3 Bamboos ( 3/3 )",
      t4: "Other Tasks ...",
      pr: "NFT#1234",
      elicon: "",
    },
    {
      id: 2,
      img: "https://media.discordapp.net/attachments/1085293900706627595/1086248228724424705/unsplash_-SmCKTIcH5E_6.png",
      t1: "Play Team Death Match",
      t2: "Win 3 Games in a row ( 3/3 )",
      t3: "Kill 15 Players  (15/15)",
      t4: "Other Tasks ...",
      pr: "1.5 SOL$",
      elicon: "",
    },
    {
      id: 2,
      img: "https://media.discordapp.net/attachments/1085293900706627595/1086248228468559964/unsplash_-SmCKTIcH5E_7.png",
      t1: "Healing Your Dragon ( 3/3 )",
      t2: "Play 5 Matches ( 5/5 )",
      t3: "Play and Win 1 Game",
      t4: "Other Tasks ...",
      pr: "0.03 Eth$",
      elicon: "",
    },
  ];

  return (
    <div className="w-full grid place-items-center pb-4">
      <div className="grid grid-cols-1 gap-y-5 md:grid-cols-2 lg:grid-cols-3 mt-[7vh] md:gap-x-12 lg:gap-x-24 md:gap-y-28 pb-5 ">
        <div
          className="relative game rounded-2xl hover:scale-105 transition-all delay-200 cursor-not-allowed"
          title="coming soon!"
        >
          <div className="absolute grid place-items-center text-xl font-semibold top-0 left-0 w-full h-full dark:text-white">
            Coming Soon!
          </div>
          <div className="absolute flex justify-center items-center bottom-0 left-[50%] translate-x-[-50%] pb-1">
            <div className="text-lg mx-2 text-black p-[9px] rounded-full hover:scale-105 transition-all mb-1 cursor-pointer bg-white/80">
              <FaTwitter />
            </div>
            <div className="text-lg mx-2 text-black p-[9px] rounded-full hover:scale-105 transition-all mb-1 cursor-pointer bg-white/80">
              <FaDiscord />
            </div>
          </div>
          <Image
            className="rounded-2xl"
            src={
              "https://media.discordapp.net/attachments/1085293900706627595/1086248228221104210/unsplash_-SmCKTIcH5E_8.png"
            }
            width={300}
            height={200}
            alt=""
          />
        </div>
        <div
          className="relative game rounded-2xl hover:scale-105 transition-all delay-200 cursor-not-allowed"
          title="coming soon!"
        >
          <div className="absolute grid place-items-center text-xl font-semibold top-0 left-0 w-full h-full">
            Coming Soon!
          </div>
          <div className="absolute flex justify-center items-center bottom-0 left-[50%] translate-x-[-50%] pb-1">
            <div className="text-lg mx-2 text-black p-[9px] rounded-full hover:scale-105 transition-all mb-1 cursor-pointer bg-white/80">
              <FaTwitter />
            </div>
            <div className="text-lg mx-2 text-black p-[9px] rounded-full hover:scale-105 transition-all mb-1 cursor-pointer bg-white/80">
              <FaDiscord />
            </div>
          </div>
          <Image
            className="rounded-2xl"
            src={
              "https://media.discordapp.net/attachments/1085293900706627595/1086248228724424705/unsplash_-SmCKTIcH5E_6.png"
            }
            width={300}
            height={200}
            alt=""
          />
        </div>
        <div
          className="relative game rounded-2xl hover:scale-105 transition-all delay-200 cursor-not-allowed"
          title="coming soon!"
        >
          <div className="absolute grid place-items-center text-xl font-semibold top-0 left-0 w-full h-full">
            Coming Soon!
          </div>
          <div className="absolute flex justify-center items-center bottom-0 left-[50%] translate-x-[-50%] pb-1">
            <div className="text-lg mx-2 text-black p-[9px] rounded-full hover:scale-105 transition-all mb-1 cursor-pointer bg-white/80">
              <FaTwitter />
            </div>
            <div className="text-lg mx-2 text-black p-[9px] rounded-full hover:scale-105 transition-all mb-1 cursor-pointer bg-white/80">
              <FaDiscord />
            </div>
          </div>
          <Image
            className="rounded-2xl"
            src={
              "https://media.discordapp.net/attachments/1085293900706627595/1086248228468559964/unsplash_-SmCKTIcH5E_7.png"
            }
            width={300}
            height={200}
            alt=""
          />
        </div>
        {/* <div
          className="relative game rounded-2xl hover:scale-105 transition-all delay-200 cursor-not-allowed"
          title="coming soon!"
        >
          <div className="absolute grid place-items-center text-xl font-semibold top-0 left-0 w-full h-full">
            Coming Soon!
          </div>
          <div className="absolute flex justify-center items-center bottom-0 left-[50%] translate-x-[-50%] pb-1">
            <div className="text-lg mx-2 text-black p-[9px] rounded-full hover:scale-105 transition-all mb-1 cursor-pointer bg-white/80">
              <FaTwitter />
            </div>
            <div className="text-lg mx-2 text-black p-[9px] rounded-full hover:scale-105 transition-all mb-1 cursor-pointer bg-white/80">
              <FaDiscord />
            </div>
          </div>
          <Image
            className="rounded-2xl"
            src={unsplash3}
            width={300}
            height={200}
            alt=""
          />
        </div>
        <div
          className="relative game rounded-2xl hover:scale-105 transition-all delay-200 cursor-not-allowed"
          title="coming soon!"
        >
          <div className="absolute grid place-items-center text-xl font-semibold top-0 left-0 w-full h-full">
            Coming Soon!
          </div>
          <div className="absolute flex justify-center items-center bottom-0 left-[50%] translate-x-[-50%] pb-1">
            <div className="text-lg mx-2 text-black p-[9px] rounded-full hover:scale-105 transition-all mb-1 cursor-pointer bg-white/80">
              <FaTwitter />
            </div>
            <div className="text-lg mx-2 text-black p-[9px] rounded-full hover:scale-105 transition-all mb-1 cursor-pointer bg-white/80">
              <FaDiscord />
            </div>
          </div>
          <Image
            className="rounded-2xl"
            src={unsplash4}
            width={300}
            height={200}
            alt=""
          />
        </div>
        <div
          className="relative game rounded-2xl hover:scale-105 transition-all delay-200 cursor-not-allowed"
          title="coming soon!"
        >
          <div className="absolute grid place-items-center text-xl font-semibold top-0 left-0 w-full h-full">
            Coming Soon!
          </div>
          <div className="absolute flex justify-center items-center bottom-0 left-[50%] translate-x-[-50%] pb-1">
            <div className="text-lg mx-2 text-black p-[9px] rounded-full hover:scale-105 transition-all mb-1 cursor-pointer bg-white/80">
              <FaTwitter />
            </div>
            <div className="text-lg mx-2 text-black p-[9px] rounded-full hover:scale-105 transition-all mb-1 cursor-pointer bg-white/80">
              <FaDiscord />
            </div>
          </div>
          <Image
            className="rounded-2xl"
            src={unsplash5}
            width={300}
            height={200}
            alt=""
          />
        </div>
        <div
          className="relative game rounded-2xl hover:scale-105 transition-all delay-200 cursor-not-allowed"
          title="coming soon!"
        >
          <div className="absolute grid place-items-center text-xl font-semibold top-0 left-0 w-full h-full">
            Coming Soon!
          </div>
          <div className="absolute flex justify-center items-center bottom-0 left-[50%] translate-x-[-50%] pb-1">
            <div className="text-lg mx-2 text-black p-[9px] rounded-full hover:scale-105 transition-all mb-1 cursor-pointer bg-white/80">
              <FaTwitter />
            </div>
            <div className="text-lg mx-2 text-black p-[9px] rounded-full hover:scale-105 transition-all mb-1 cursor-pointer bg-white/80">
              <FaDiscord />
            </div>
          </div>
          <Image
            className="rounded-2xl"
            src={unsplash6}
            width={300}
            height={200}
            alt=""
          />
        </div>
        <div
          className="relative game rounded-2xl hover:scale-105 transition-all delay-200 cursor-not-allowed"
          title="coming soon!"
        >
          <div className="absolute grid place-items-center text-xl font-semibold top-0 left-0 w-full h-full">
            Coming Soon!
          </div>
          <div className="absolute flex justify-center items-center bottom-0 left-[50%] translate-x-[-50%] pb-1">
            <div className="text-lg mx-2 text-black p-[9px] rounded-full hover:scale-105 transition-all mb-1 cursor-pointer bg-white/80">
              <FaTwitter />
            </div>
            <div className="text-lg mx-2 text-black p-[9px] rounded-full hover:scale-105 transition-all mb-1 cursor-pointer bg-white/80">
              <FaDiscord />
            </div>
          </div>
          <Image
            className="rounded-2xl"
            src={unsplash7}
            width={300}
            height={200}
            alt=""
          />
        </div>
        <div
          className="relative game rounded-2xl hover:scale-105 transition-all delay-200 cursor-not-allowed"
          title="coming soon!"
        >
          <div className="absolute grid place-items-center text-xl font-semibold top-0 left-0 w-full h-full">
            Coming Soon!
          </div>
          <div className="absolute flex justify-center items-center bottom-0 left-[50%] translate-x-[-50%] pb-1">
            <div className="text-lg mx-2 text-black p-[9px] rounded-full hover:scale-105 transition-all mb-1 cursor-pointer bg-white/80">
              <FaTwitter />
            </div>
            <div className="text-lg mx-2 text-black p-[9px] rounded-full hover:scale-105 transition-all mb-1 cursor-pointer bg-white/80">
              <FaDiscord />
            </div>
          </div>
          <Image
            className="rounded-2xl"
            src={unsplash8}
            width={300}
            height={200}
            alt=""
          />
        </div> */}
      </div>
    </div>
  );
}
