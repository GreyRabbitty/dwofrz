import React, { useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";
import { SlGameController } from "react-icons/sl";
import Image from "next/image";
import Linegming from "../../../public/Linegming.png";
import GroupsIcon from "@mui/icons-material/Groups";
import { useRouter } from "next/router";
import CustomTitle from "../../CustomTitle";

export default function gamestask() {
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
  ];
  const router = useRouter();
  const light =
    "dark:border dark:text-gray-900 dark:border-gray-900 dark:from-gray-200 dark:to-gray-200 ";

  return (
    <div className="mt-14">
      <div className="flex items-center">
        <SlGameController className="w-5 h-auto mr-2 text-cusViolet mdd:w-6 lgg:w-7 2xl:w-8" />
        <CustomTitle>GAMING TASKS</CustomTitle>
      </div>

      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        autoplay={{ delay: 2500, pauseOnMouseEnter: true }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          100: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1536: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1640: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        navigation={false}
        modules={[Pagination, Navigation, Autoplay]}
        className="ssm:w-[400px] md:w-auto mx-auto mt-6"
      >
        {data.map((el, i) => (
          <SwiperSlide className="pb-2" key={i}>
            <div className="gradientBordercard">
              <div className="border shadow-lg gradientBordercard2 border-cusEL-200 rounded-xl">
                <div
                  title="coming soon!"
                  className="w-full h-[225px] md:h-[225px] rounded-t-xl overflow-hidden relative bg-yellowGradient"
                >
                  <div className="absolute w-full h-full bg-black/60 backdrop-blur-[5px] grid place-items-center top-0 left-0 z-10">
                    <div className="z-10 text-base font-semibold ssm:text-lg md:text-xl llg:text-2xl 2xl:text-3xl dark:text-white">
                      Coming Soon!
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 z-20 flex items-center px-4 py-2 text-xs rounded-bl-lg bg-darkGradient dark:bg-gray-200 dark:border-t-white dark:border-gray-800/80">
                    <GroupsIcon className="w-5 h-auto mr-2 text-cusYellow dark:text-gray-800/90" />
                    <span className="truncate">0 / 500</span>
                  </div>
                  {/* Error */}
                  {/* <Image
                    src={el.img}
                    width={400}
                    height={400}
                    alt=""
                    className="object-cover object-center w-full h-full"
                  /> */}
                </div>

                <div
                  className={`w-full p-3 rounded-b-xl bg-darkGradient ${light} dark:text-gray-900 relative`}
                >
                  <div className="absolute h-full -top-3 left-11">
                    <Image src={Linegming} width={7} height={40} alt="" />
                  </div>

                  <div className="flex items-center text-sm ">
                    <div className="mx-3 my-2 p-[5px] w-fit rounded-full bg-[#8D8D8D]"></div>
                    <span className="ml-4 dark:text-black/90 dark:font-semibold">
                      {el.t1}
                    </span>
                  </div>
                  <div className="flex items-center text-sm ">
                    <div className="mx-3 my-2 p-[5px] w-fit rounded-full bg-[#8D8D8D]"></div>
                    <span className="ml-4 dark:text-black/90 dark:font-semibold">
                      {el.t2}
                    </span>
                  </div>
                  <div className="flex items-center text-sm ">
                    <div className="mx-3 my-2 p-[5px] w-fit rounded-full bg-[#8D8D8D]"></div>
                    <span className="ml-4 dark:text-black/90 dark:font-semibold">
                      {el.t3}
                    </span>
                  </div>
                  <div className="flex items-center text-sm ">
                    <div className="mx-3 my-2 p-[5px] w-fit rounded-full bg-[#8D8D8D]"></div>
                    <span className="ml-4 dark:text-black/90 dark:font-semibold">
                      {el.t4}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
