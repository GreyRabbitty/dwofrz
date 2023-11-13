import Image from "next/image";
import React from "react";
import taskimg from "../../public/taskimg.png";
import linos from "../../public/Linos.png";
import Art2 from "../../public/Art2.png";
import { GrValidate } from "react-icons/gr";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarRateIcon from "@mui/icons-material/StarRate";
import { FaDiscord, FaTwitter } from "react-icons/fa";

export default function gametask() {
  const style1 =
    "bg-gradient-to-t from-[var(--dwtop)] to-[var(--dwtrakc)] dark:to-bg-gray-500 dark:text-white rounded-xl p-[1.4px]";
  const style2 =
    "w-full bg-gradient-to-t from-[#222222] to-[#2B2B36] rounded-xl";
  return (
    <div>
      <div className="flex flex-col items-center md:flex-row md:items-start justify-between mt-10 max-w-[1800px] mx-auto mb-10">
        {/* Part 1 */}
        <div className="bg-black dark:bg-gray-600 rounded-3xl w-[98%] md:w-[60%] max-w-[1000px] pb-6">
          <div className="my-2 text-xl flex justify-center">
            <div className="text-[var(--dwtwo)] ">Ends on:</div>
            <div className="ml-2 flex items-center">
              18h : 17m : 29s{" "}
              <HourglassEmptyIcon className="text-[var(--dwtwo)] text-2xl" />
            </div>
          </div>
          <div className="w-[95%] mx-auto">
            <Image
              src={taskimg}
              width={1000}
              height={300}
              alt=""
              //   className="rounded-xl border-2 border-[var(--dwtwo)]"
            />
          </div>
          <div className="my-6 h-[1px] bg-[#657786] w-[90%] mx-auto"></div>
          <div className={`${style1} w-[95%] mx-auto mb-7`}>
            <div className={`${style2} text-base  font-semibold`}>
              <div className="py-3 px-4 flex justify-between items-center">
                <div>
                  Follow{" "}
                  <span className="text-[var(--dwtwo)]">ProjectName</span> page
                  on Twitter:
                </div>
                <span className="text-[var(--dwtwo)]">
                  <CheckCircleOutlineIcon fontSize="medium" />
                </span>
              </div>
              <Image
                src={linos}
                width={700}
                height={1}
                alt=""
                className="mx-auto"
              />
              <div className="py-3 px-4 flex justify-between items-center">
                <div>Watch and like video on Youtube:</div>
                <span className="text-[var(--dwtwo)]">
                  <CheckCircleOutlineIcon fontSize="medium" />
                </span>
              </div>
              <Image
                src={linos}
                width={700}
                height={1}
                alt=""
                className="mx-auto"
              />
              <div className="py-3 px-4 flex justify-between items-center">
                <div>Like and retweet this tweet:</div>
                <span className="text-white/75">
                  <AutorenewIcon
                    fontSize="medium"
                    className="cursor-pointer text-[26px]"
                  />
                </span>
              </div>
              <Image
                src={linos}
                width={700}
                height={1}
                alt=""
                className="mx-auto"
              />
              <div className="py-3 px-4 flex justify-between items-center">
                <div>Join this telegram group:</div>
                <span className="text-white/75">
                  <AutorenewIcon
                    fontSize="medium"
                    className="cursor-pointer text-[26px]"
                  />
                </span>
              </div>
              <Image
                src={linos}
                width={700}
                height={1}
                alt=""
                className="mx-auto"
              />
              <div className="py-3 px-4 flex justify-between items-center">
                <div>Join this discord server:</div>
                <span className="text-white/75">
                  <AutorenewIcon
                    fontSize="medium"
                    className="cursor-pointer text-[26px]"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="my-6 h-[1px] bg-[#657786] w-[90%]  mx-auto"></div>
          <div className="rounded-xl items-center text-white px-4 bg-[#FB923C] py-2 flex justify-between w-[95%] mx-auto">
            <div>Winner:</div>
            <div className="text-[9px] md:text-sm">
              Cq2UK9qkm42eont2sv2X9HDv6no133CJhm1C8cLXjaif
            </div>
          </div>
        </div>
        {/* Part 2 */}
        <div className="w-[98%] md:w-[37%] mt-5 md:mt-0 max-w-[500px]">
          <div className="text-center text-xl  font-semibold">
            <span className="text-[var(--dwtwo)]">‘Valorant’ </span>
            VALORANT Gift Card
          </div>
          <div className="w-[94%] mx-auto">
            <div className="flex flex-col items-center md:flex-row md:items-start mt-5">
              <div>
                <Image
                  src={Art2}
                  width={200}
                  height={200}
                  alt=""
                  className="rounded-3xl border-2 border-[var(--dwtwo)]"
                />
                <div className="flex items-center mt-4 justify-center">
                  <StarRateIcon className="text-[var(--dwtwo)] mx-1" />
                  <StarRateIcon className="text-[var(--dwtwo)] mx-1" />
                  <StarRateIcon className="text-[var(--dwtwo)] mx-1" />
                  <StarRateIcon className="text-[var(--dwtwo)] mx-1" />
                  <StarOutlineIcon className="text-[var(--dwtwo)] mx-1" />
                </div>
              </div>
              <div className="ml-4 mt-3">
                <div className="text-[var(--dwtwo)] text-lg">Info:</div>
              </div>
            </div>
            <div>
              <div className="md:ml-[6%] text-center md:text-start mt-8 text-xl  font-semibold ">
                Link your socials:
              </div>
              <div className="flex justify-center items-center mt-5">
                <div className="py-2  mx-2 border border-[var(--dwtwo)]  font-semibold rounded-xl cursor-pointer px-3 flex items-center">
                  <FaDiscord className="text-2xl text-fuchsia-500 mr-2" />
                  Discord
                </div>
                <div className="py-2 mx-2 border border-[var(--dwtwo)]  font-semibold rounded-xl cursor-pointer px-3 flex items-center">
                  <FaTwitter className="text-2xl text-fuchsia-500 mr-2" />
                  Twitter
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
