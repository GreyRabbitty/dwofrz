import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import data from "./data.json";
// Import Swiper styles
import { m } from "framer-motion";
import Link from "next/link";
import { AiFillHeart, AiOutlineRetweet } from "react-icons/ai";
import { BsFillChatFill, BsTwitter } from "react-icons/bs";
import {
  FaArrowLeft,
  FaArrowRight,
  FaDiscord,
  FaTwitter,
} from "react-icons/fa";
import { ScaleLoader } from "react-spinners";
import SwiperCore, { Autoplay, Navigation, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import logosol from "../../.././public/logosol.png";
import { CountdownTimer } from "../../Counter/Counter";
import CustomTitle from "../../CustomTitle";
import { get_remainig_time } from "../../utils/time";
import Sekeleton from "./sekeleton";

export default function hot({ tweets }) {
  SwiperCore.use([Navigation]);
  const [showloading, setshowloading] = useState(true);
  const [showdataloading, setshowdataloading] = useState(true);
  // const [hot_tweets, setHotTweet] = useState(null)

  useEffect(() => {
    const time = setTimeout(() => {
      setshowloading(false);
    }, 1000);
    const time1 = setTimeout(() => {
      setshowdataloading(false);
    }, 1000);
    // setHotTweet(tweets)

    return () => {
      time, time1;
    };
  }, []);

  const btns =
    "w-7 lgg:w-8 2xl:w-9 h-7 lgg:h-8 2xl:h-9 rounded lgg:rounded-md bg-cusEL-200/60 hover:bg-cusEL-200 flex justify-center items-center group";

  return (
    <div className="mt-2">
      <div className="flex justify-start items-center">
        <CustomTitle>Hot Tweets</CustomTitle>
      </div>

      <div className="mt-5">
        {showloading ? (
          <div className="w-full flex justify-center min-h-[220px] items-center">
            <ScaleLoader color="#ffa800" />
          </div>
        ) : (
          <Swiper
            spaceBetween={30}
            scrollbar={{
              hide: false,
              draggable: true,
            }}
            // speed={3000}
            // autoplay={{
            //   delay: 0,
            //   stopOnLastSlide: false,
            // }}
            // lazy={true}
            // loop={true}
            breakpoints={{
              1640: {
                slidesPerView: 6,
                spaceBetween: 30,
              },
              1500: {
                slidesPerView: 6,
                spaceBetween: 20,
              },
              1400: {
                slidesPerView: 5,
                spaceBetween: 40,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
              769: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              440: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
            }}
            className="min-h-[340px] lgg:min-h-[330px]"
            modules={[Scrollbar, Autoplay, Navigation]}
          >
            {showdataloading ? (
              <div className="">
                {data.map((el, i) => (
                  <SwiperSlide key={i}>
                    <Sekeleton />
                  </SwiperSlide>
                ))}
              </div>
            ) : (
              <div>
                {!tweets.error &&
                  tweets
                    .sort(function (a, b) {
                      return b.interact - a.interact;
                    })
                    .map(
                      (el, i) =>
                        el.live && (
                          // i < 20 &&
                          <SwiperSlide key={i}>
                            <div className="card h-[360px] ssm:h-[305px] relative text-center border border-cusEL-200 rounded-xl overflow-hidden shadow-2xl">
                              <div className="content">
                                <div className="back">
                                  <div className="back-content bg-darkGradient">
                                    <Link href={`/${el.name}/${el.twitter_id}`}>
                                      <div className="w-full h-[250px] ssm:h-[200px] relative">
                                        <Image
                                          className="w-full h-full object-center object-cover rounded-t-xl"
                                          src={el.project_image}
                                          width={260}
                                          height={220}
                                          alt=""
                                        />

                                        <div className="text-base px-4 py-1 absolute bottom-2 left-[50%] translate-x-[-50%] bg-[#1A1B1D99] backdrop-blur-md rounded-full truncate">
                                          <CountdownTimer
                                            width={18}
                                            countdownTimestampMs={el.postAt}
                                            finish={2}
                                          />
                                        </div>
                                      </div>
                                    </Link>

                                    <div className="p-3">
                                      <div className="flex justify-between items-center">
                                        <div className="text-white/70 text-sm font-semibold">
                                          @
                                          {el.name.length > 10
                                            ? el.name.slice(0, 10) + "..."
                                            : el.name}
                                        </div>
                                        <div className="text-center flex justify-center items-center">
                                          <Image
                                            src={logosol}
                                            width={17}
                                            height={10}
                                            alt=""
                                          />
                                          <div className="price font-semibold text-sm ml-1 text-white/70">
                                            {el.network == "ETH" ? (
                                              el.native_coin ? (
                                                <div>{el.eth_amount} ETH</div>
                                              ) : el.nft ? (
                                                <Link
                                                  href={`https://testnets.opensea.io/assets/goerli/${el.nft_address}/${el.token_id}`}
                                                  target={"_blank"}
                                                >
                                                  {el.nft_name}
                                                </Link>
                                              ) : (
                                                <div>
                                                  {el.token_amount}{" "}
                                                  {el.token_name}
                                                </div>
                                              )
                                            ) : el.network == "solana" &&
                                              el.native_coin ? (
                                              <div>{el.amount} SOL</div>
                                            ) : el.nft ? (
                                              <a
                                                href={`https://magiceden.io/item-details/${el.token_address}`}
                                                target={"_blank"}
                                              >
                                                {el.nft_name.length > 0
                                                  ? el.nft_name
                                                  : "NFT"}
                                              </a>
                                            ) : (
                                              <Link
                                                href={`https://solscan.io/address//${el.token_address}`}
                                                target={"_blank"}
                                              >
                                                {el.amount} {el.token_name}
                                              </Link>
                                            )}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="flex justify-center items-center space-x-3 mt-4">
                                        <div className={`${btns}`}>
                                          <AiFillHeart
                                            className={`${
                                              el.done
                                                ? "text-[#F91881]"
                                                : "text-white/40"
                                            } text-base lgg:text-lg 2xl:text-xl`}
                                          />
                                        </div>

                                        <div className={`${btns}`}>
                                          <AiOutlineRetweet
                                            className={`${
                                              el.done
                                                ? "text-[#00FF85]"
                                                : "text-white/40"
                                            } text-base lgg:text-lg 2xl:text-xl`}
                                          />
                                        </div>

                                        <div className={`${btns}`}>
                                          <BsFillChatFill
                                            className={`${
                                              el.done
                                                ? "text-[#2CCCFF]"
                                                : "text-white/40"
                                            } text-base lgg:text-lg 2xl:text-xl`}
                                          />
                                        </div>

                                        {(el.bundle ==
                                          "follow like comment retweet join discord" ||
                                          el.bundle ==
                                            "Like comment retweet follow") && (
                                          <div className={`${btns}`}>
                                            <FaTwitter
                                              className={`${
                                                el.done
                                                  ? "text-[#5460E6]"
                                                  : "text-white/40"
                                              } text-base lgg:text-lg 2xl:text-xl`}
                                            />
                                          </div>
                                        )}

                                        {(el.bundle ==
                                          "follow like comment retweet join discord" ||
                                          el.bundle ==
                                            "like comment retweet join discord") && (
                                          <div className={`${btns}`}>
                                            <FaDiscord
                                              className={`${
                                                el.done
                                                  ? "text-[#5460E6]"
                                                  : "text-white/40"
                                              } text-base lgg:text-lg 2xl:text-xl`}
                                            />
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        )
                    )}
              </div>
            )}
          </Swiper>
        )}
      </div>
    </div>
  );
}
