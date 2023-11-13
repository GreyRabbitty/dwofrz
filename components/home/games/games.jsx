import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineRetweet } from "react-icons/ai";
import { BsFillChatFill } from "react-icons/bs";
import { FaDiscord, FaTwitter } from "react-icons/fa";

import { SlGameController } from "react-icons/sl";
import CustomTitle from "../../CustomTitle";
import { GamesData } from "../../../data/GamesData";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function games() {
  const [uiLoaded, setUiLoaded] = useState(false);

  useEffect(() => {
    setUiLoaded(true);
  }, []);

  const btns =
    "w-7 lgg:w-8 2xl:w-9 h-7 lgg:h-8 2xl:h-9 rounded lgg:rounded-md bg-cusEL-200/60 hover:bg-cusEL-200 flex justify-center items-center group";
  return (
    <div className="mt-20">
      <div className="flex items-center">
        <SlGameController className="text-cusViolet mr-2 w-5 mdd:w-6 lgg:w-7 2xl:w-8 h-auto" />
        <CustomTitle>Gaming - Social Media</CustomTitle>
      </div>

      {uiLoaded && (
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          autoplay={{ delay: 2000, pauseOnMouseEnter: true }}
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
          className="overflow-visible min-h-[270px] rounded-xl mt-5"
        >
          {GamesData.map((item) => {
            const { img, id } = item;
            return (
              <SwiperSlide key={id}>
                <div className="gradientBordercard">
                  <div className="gradientBordercard2">
                    <div
                      className="relative cursor-not-allowed"
                      title="coming soon!"
                    >
                      <div className="absolute grid place-items-center text-xl font-semibold top-0 left-0 w-full h-full dark:text-white z-20">
                        Coming Soon!
                      </div>
                      <div className="absolute flex justify-center items-center space-x-2 bottom-4 left-[50%] translate-x-[-50%] z-20">
                        <div className={`${btns}`}>
                          <AiFillHeart
                            className={`${
                              false ? "text-[#F91881]" : "text-white/40"
                            } text-base lgg:text-lg 2xl:text-xl`}
                          />
                        </div>

                        <div className={`${btns}`}>
                          <AiOutlineRetweet
                            className={`${
                              false ? "text-[#00FF85]" : "text-white/40"
                            } text-base lgg:text-lg 2xl:text-xl`}
                          />
                        </div>

                        <div className={`${btns}`}>
                          <BsFillChatFill
                            className={`${
                              false ? "text-[#2CCCFF]" : "text-white/40"
                            } text-base lgg:text-lg 2xl:text-xl`}
                          />
                        </div>

                        <div className={`${btns}`}>
                          <FaTwitter
                            className={`${
                              false ? "text-[#5460E6]" : "text-white/40"
                            } text-base lgg:text-lg 2xl:text-xl`}
                          />
                        </div>

                        <div className={`${btns}`}>
                          <FaDiscord
                            className={`${
                              false ? "text-[#5460E6]" : "text-white/40"
                            } text-base lgg:text-lg 2xl:text-xl`}
                          />
                        </div>
                      </div>

                      <div className="relative z-10">
                        <Image
                          className="rounded-xl"
                          src={img}
                          width={600}
                          height={200}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
}
