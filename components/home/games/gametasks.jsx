import React from "react";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";
import { SlGameController } from "react-icons/sl";
import Image from "next/image";
import Linegming from "../../../public/Linegming.png";
import GroupsIcon from "@mui/icons-material/Groups";
import { useRouter } from "next/router";

export default function gametasks() {
  const data = [
    {
      id: 1,
      img: "https://media.discordapp.net/attachments/1085293900706627595/1086248228221104210/unsplash_-SmCKTIcH5E_8.png",
      t1: "Collecting and Trade Materials",
      t2: "Craft 2 Materials (0/2)",
      t3: "Plant 3 Bamboos ( 0/3 )",
      t4: "Other Tasks ...",
      pr: "NFT#1234",
      elicon: "",
    },
    {
      id: 2,
      img: "https://media.discordapp.net/attachments/1085293900706627595/1086248228724424705/unsplash_-SmCKTIcH5E_6.png",
      t1: "Play Team Death Match",
      t2: "Win 3 Games in a row ( 0/3 )",
      t3: "Kill 15 Players  (0/15)",
      t4: "Other Tasks ...",
      pr: "1.5 SOL$",
      elicon: "",
    },
    {
      id: 2,
      img: "https://media.discordapp.net/attachments/1085293900706627595/1086248228468559964/unsplash_-SmCKTIcH5E_7.png",
      t1: "Healing Your Dragon ( 0/3 )",
      t2: "Play 5 Matches ( 0/5 )",
      t3: "Play and Win 1 Game",
      t4: "Other Tasks ...",
      pr: "0.03 Eth$",
      elicon: "",
    },
    // {
    //   id: 2,
    //   img: "https://media.discordapp.net/attachments/1085293900706627595/1086248228221104210/unsplash_-SmCKTIcH5E_8.png",
    //   t1: "Collecting and Trade Materials",
    //   t2: "Craft 2 Materials (2/2)",
    //   t3: "Plant 3 Bamboos ( 3/3 )",
    //   t4: "Other Tasks ...",
    //   pr: "NFT#1234",
    //   elicon: "",
    // },
    // {
    //   id: 2,
    //   img: "https://media.discordapp.net/attachments/1085293900706627595/1086248228724424705/unsplash_-SmCKTIcH5E_6.png",
    //   t1: "Play Team Death Match",
    //   t2: "Win 3 Games in a row ( 3/3 )",
    //   t3: "Kill 15 Players  (15/15)",
    //   t4: "Other Tasks ...",
    //   pr: "1.5 SOL$",
    //   elicon: "",
    // },
    // {
    //   id: 2,
    //   img: "https://media.discordapp.net/attachments/1085293900706627595/1086248228468559964/unsplash_-SmCKTIcH5E_7.png",
    //   t1: "Healing Your Dragon ( 3/3 )",
    //   t2: "Play 5 Matches ( 5/5 )",
    //   t3: "Play and Win 1 Game",
    //   t4: "Other Tasks ...",
    //   pr: "0.03 Eth$",
    //   elicon: "",
    // },
  ];
  const router = useRouter();

  return (
    <div className="px-[1%] mt-8 mb-4 max-w-[2100px] mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div className="sm:text-2xl md:text-[31px] flex items-center">
          <span className="text-3xl mx-1 text-[#FCD34D] font-bold">
            <SlGameController />
          </span>
          <span className=" font-semibold gold">GAMING TASKS</span>
        </div>
        <Link
          href={`/`}
          className="sm:text-xs text-[#FCD34D] md:text-sm flex items-center cursor-pointer"
        >
          back
          <span className=" rotate-180  font-bold">
            <MdArrowBackIos />
          </span>
        </Link>
      </div>
      <div className="grid w-full place-items-center  grid-cols-1  mdd:grid-cols-2 lgg:grid-cols-3 gap-10">
        {data.map((el, i) => (
          <div className="pb-2" key={i}>
            <div className="w-[98%] max-w-[400px] mx-[6px] md:w-[400px]">
              <div className="w-full z-20 h-[225px] md:h-[225px] rounded-3xl overflow-hidden relative">
                <Image src={el.img} width={400} height={400} alt="" />
                <div className="absolute bottom-0 left-0 w-full h-[50px] bg-black/60">
                  <div className="w-full grid place-items-center">
                    {/* <div className="px-5 cursor-pointer py-2 min-w-[130px] text-xs mt-2   bg-black/40 backdrop-blur-sm rounded-xl flex items-center justify-center border border-[var(--dwtwo)]">
                      <Image
                        src={el.elicon}
                        className="mr-1"
                        width={24}
                        height={20}
                        alt=""
                      />
                      <span>{el.pr}</span>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="w-full pt-[21%] relative -mt-[20%] h-[200px] rounded-b-3xl bg-gradient-to-t from-[#121417] to-[#282A33] border border-[var(--dwtwo)]">
                <div className="absolute bottom-0 left-8">
                  <Image src={Linegming} width={7} height={40} alt="" />
                </div>
                <div
                  onClick={() => router.push("/games/game")}
                  className="absolute bottom-3 z-[50] right-5 text-[var(--dwtwo)] text-sm cursor-pointer"
                >
                  Details
                </div>
                <div className="text-sm flex items-center ">
                  <div className="mx-3 my-2 p-[5px] w-fit rounded-full bg-[#79E70B]"></div>
                  <span className="ml-4">{el.t1}</span>
                </div>
                <div className="text-sm flex items-center ">
                  <div className="mx-3 my-2 p-[5px] w-fit rounded-full bg-[#79E70B]"></div>
                  <span className="ml-4">{el.t2}</span>
                </div>
                <div className="text-sm flex items-center ">
                  <div className="mx-3 my-2 p-[5px] w-fit rounded-full bg-[#8D8D8D]"></div>
                  <span className="ml-4">{el.t3}</span>
                </div>
                <div className="text-sm flex items-center ">
                  <div className="mx-3 my-2 p-[5px] w-fit rounded-full bg-[#8D8D8D]"></div>
                  <span className="ml-4">{el.t4}</span>
                </div>
              </div>
              <div className="w-full flex justify-center">
                <div className="px-2 bg-black/50 py-[6px] text-xs rounded-b-lg border border-[var(--dwtwo)] flex items-center">
                  <GroupsIcon className="mr-[6px] text-[26px] text-[var(--dwtwo)]" />
                  <div>
                    <span>0</span>
                    <span className="mx-1">/</span>
                    <span>500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
