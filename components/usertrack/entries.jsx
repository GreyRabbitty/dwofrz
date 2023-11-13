import Image from "next/image";
import React from "react";
import { BsTwitter } from "react-icons/bs";
import { AiOutlineRetweet } from "react-icons/ai";
import { BsFillChatFill } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import GroupsIcon from "@mui/icons-material/Groups";
import Link from "next/link";
import { get_remainig_time } from "../utils/time";

export default function entr({ data, notifys }) {
  const icostyle =
    " text-xs md:text-sm p-[6px] rounded-full bg-gray-300 mx-[2px] w-fit h-fit text-black hover:scale-105 transition-all cursor-pointer";
  const s1 = "my-4 border-2 border-[var(--dwtwo)] rounded-xl";
  return (
    <div className="w-[95%] md:h-[88vh] mx-auto max-w-[1700px] rounded-2xl my-5 py-4 px-1 bg-black dark:bg-gray-200 dark:border dark:border-gray-800">
      {/* <div className="px-5 text-4xl newstyle  font-semibold">
        My Entries
      </div> */}
      <div className="text-4xl px-3 mb-10 newstyle  font-semibold">
        My Entries
      </div>
      <div
        className="bg-black rounded-2xl dark:bg-gray-200 dark:border dark:border-gray-800 px-3 h-[85%] max-h-[700px] mb-4 overflow-y-scroll"
        id="task"
      >
        {data &&
          data.length > 0 &&
          data
            .sort(function (a, b) {
              return b.postAT - a.postAT;
            })
            .map((notify, i) => (
              <div key={i} className={`${s1} gamingbgg`}>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-center font-semibold text-xs md:text-sm ">
                  <Link
                    href={`/${notify.name}/${notify.twitter_id}`}
                    target="_blank"
                    className="flex justify-center rounded-xl h-[70px] overflow-hidden md:table-cell px-4 my-2 "
                  >
                    <Image
                      src={notify.image}
                      width={75}
                      height={200}
                      className="rounded-xl"
                      alt=""
                    />
                  </Link>
                  <Link
                    href={`https://twitter.com/${notify.name}`}
                    target="_blank"
                    className="table-cell px-4 py-2 mt-1 "
                  >
                    <div className="newstyle text-xs md:text-sm">Name</div>
                    <div className="mt-3">@{notify.name}</div>
                  </Link>
                  <div className="table-cell px-4 py-2 mt-1 ">
                    <div className="newstyle text-xs md:text-sm">
                      Raffle Ended
                    </div>
                    <div className="mt-3">
                      {get_remainig_time(notify.time, 2)}
                    </div>
                  </div>
                  <div className="table-cell px-4 py-2 mt-1 ">
                    <div className="newstyle text-xs md:text-sm">Network</div>
                    <div className="mt-3 flex items-center justify-center">
                      {notify.network}
                      {/* <GroupsIcon className="ml-2 text-[30px] text-[var(--dwtwo)]" /> */}
                    </div>
                  </div>
                  <div className="table-cell px-4 py-2 mt-1 ">
                    <div className="newstyle text-xs md:text-sm ">Reward</div>
                    <div className="mt-3">
                      {notify.reword_type == "nft"
                        ? notify.reword_name
                        : notify.amount + " " + notify.reword_name}
                    </div>
                  </div>
                  {/* <div className="table-cell px-4 py-2 mt-1">
              <div className="newstyle text-xs md:text-sm">Winner </div>
              <div className="mt-3 text-xs md:text-sm text-[#ADA4A4]">Ongoing</div>
            </div> */}
                </div>
              </div>
            ))}
        {/* {notifys &&
          notifys.length > 0 &&
          notifys.map((notify, i) => (
            <div key={i} className={`${s1} gamingbggg`}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-center font-semibold text-xs md:text-sm ">
                <Link
                  href={`/${notify.name}/${notify.twitter_id}`}
                  target="_blank"
                  className="flex justify-center md:table-cell px-4 py-2 "
                >
                  <Image
                    src={notify.project_image}
                    width={75}
                    height={200}
                    className="rounded-xl"
                    alt=""
                  />
                </Link>
                <Link
                  href={`https://twitter.com/${notify.name}`}
                  target="_blank"
                  className="table-cell px-4 py-2 mt-1 "
                >
                  <div className="newstyle text-xs md:text-sm">Name</div>
                  <div className="mt-3">@{notify.name}</div>
                </Link>
                <div className="table-cell px-4 py-2 mt-1 ">
                  <div className="newstyle text-xs md:text-sm">Network</div>
                  <div className="mt-3 flex items-center justify-center">
                    {notify.network}
                  </div>
                </div>
                <div className="table-cell px-5 py-2 mt-1 ">
                  <div className="newstyle text-xs md:text-sm"></div>
                  <div className="mt-3">Congrats you Win in the raffle</div>
                </div>

                <div className="table-cell px-4 py-2 mt-1 ">
                  <div className="newstyle text-xs md:text-sm ">Reward</div>
                  <div className="mt-3">
                    {notify.reword_type == "nft"
                      ? notify.reword_name
                      : notify.amount + " " + notify.reword_name}
                  </div>
                </div>
                <div className="table-cell px-4 py-2 mt-1">
              <div className="newstyle text-xs md:text-sm">Winner </div>
              <div className="mt-3 text-xs md:text-sm text-[#ADA4A4]">Ongoing</div>
            </div>
              </div>
            </div>
          ))} */}
      </div>
    </div>
  );
}
