import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { AiFillHeart, AiOutlineRetweet } from "react-icons/ai";
import { BsFillChatFill, BsTwitter } from "react-icons/bs";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { MdArrowBackIos } from "react-icons/md";
import { ScaleLoader } from "react-spinners";
import { Swiper, SwiperSlide } from "swiper/react";
import logosol from "../../.././public/logosol.png";
import { CountdownTimer } from "../../Counter/Counter";
import { get_remainig_time } from "../../utils/time";
import data from "./data.json";
import Sekelaton from "./sekelaton";

// Import Swiper styles
import { Autoplay, Navigation, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import CustomTitle from "../../CustomTitle";

export default function tweets({ tweets }) {
  const [showloading, setshowloading] = useState(true);
  const [showdataloading, setshowdataloading] = useState(true);
  // const [tweet, setTweet] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setshowloading(false);
    }, 1000);
    setTimeout(() => {
      setshowdataloading(false);
    }, 1000);
  }, []);

  const btns =
    "w-7 lgg:w-8 2xl:w-9 h-7 lgg:h-8 2xl:h-9 rounded lgg:rounded-md bg-cusEL-200/60 hover:bg-cusEL-200 flex justify-center items-center group";

  return (
    <div className="mt-12">
      <div className="mb-4 flex justify-between items-center ">
        <CustomTitle>Tweets</CustomTitle>
        <a
          href={`/tweets`}
          className="sm:text-xs text-[#FCD34D] dark:text-gray-800 md:text-sm flex items-center cursor-pointer"
        >
          Show More
          <span className=" rotate-180  font-bold">
            <MdArrowBackIos />
          </span>
        </a>
      </div>
      <div className="my-4 w-full min-h-[300px]">
        {showloading === true ? (
          <div className="w-full min-h-[300px] flex items-center justify-center">
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
            {showdataloading === true ? (
              <div>
                {tweets.map((m, i) => (
                  <SwiperSlide key={i}>
                    <div className="m-1 ">
                      <Sekelaton />
                    </div>
                  </SwiperSlide>
                ))}
              </div>
            ) : (
              <div>
                {tweets &&
                  tweets
                    .sort(function (a, b) {
                      return b.postAt - a.postAt;
                    })
                    .map((m, i) => (
                      // m.live &&
                      <SwiperSlide key={i}>
                        <div className="card h-[360px] ssm:h-[305px] relative text-center border border-cusEL-200 rounded-xl overflow-hidden shadow-2xl">
                          <div className="content">
                            <div className="back">
                              <div className="back-content bg-darkGradient flex flex-col justify-between">
                                <Link href={`/${m.name}/${m.twitter_id}`}>
                                  <div className="w-full h-[250px] ssm:h-[200px] relative">
                                    <Image
                                      className="w-full h-full object-center object-cover rounded-t-xl"
                                      src={m.project_image}
                                      width={260}
                                      height={220}
                                      alt=""
                                    />

                                    <div className="text-base px-4 py-1 absolute bottom-2 left-[50%] translate-x-[-50%] bg-[#1A1B1D99] backdrop-blur-md rounded-full truncate">
                                      {get_remainig_time(m.postAt, 2)}
                                    </div>
                                  </div>
                                </Link>

                                <div className="p-3 h-full">
                                  <div className="flex justify-between items-center">
                                    <div className="text-white/70 text-sm font-semibold">
                                      @
                                      <span>
                                        {m.name.length > 10
                                          ? m.name.slice(0, 10) + "..."
                                          : m.name}
                                      </span>
                                    </div>
                                    <div className="text-center flex justify-center items-center">
                                      <Image
                                        src={logosol}
                                        width={17}
                                        height={10}
                                        alt=""
                                      />
                                      <div className="price font-semibold text-sm ml-1 text-white/70">
                                        {m.network == "ETH" ? (
                                          m.native_coin ? (
                                            <div>{m.eth_amount} ETH</div>
                                          ) : m.nft ? (
                                            <Link
                                              href={`https://testnets.opensea.io/assets/goerli/${m.nft_address}/${m.token_id}`}
                                              target={"_blank"}
                                            >
                                              {m.nft_name}
                                            </Link>
                                          ) : (
                                            <div>
                                              {m.token_amount} {m.token_name}
                                            </div>
                                          )
                                        ) : m.network == "solana" &&
                                          m.native_coin ? (
                                          <div>{m.amount} SOL</div>
                                        ) : m.nft ? (
                                          <a
                                            href={`https://magiceden.io/item-details/${m.token_address}`}
                                            target={"_blank"}
                                          >
                                            {m.nft_name.length > 0
                                              ? m.nft_name
                                              : "NFT"}
                                          </a>
                                        ) : (
                                          <Link
                                            href={`https://solscan.io/address//${m.token_address}`}
                                            target={"_blank"}
                                          >
                                            {m.amount} {m.token_name}
                                          </Link>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex justify-center items-center space-x-3 mt-4">
                                    <div className={`${btns}`}>
                                      <AiFillHeart
                                        className={`${
                                          m.done
                                            ? "text-[#F91881]"
                                            : "text-white/40"
                                        } text-base lgg:text-lg 2xl:text-xl`}
                                      />
                                    </div>

                                    <div className={`${btns}`}>
                                      <AiOutlineRetweet
                                        className={`${
                                          m.done
                                            ? "text-[#00FF85]"
                                            : "text-white/40"
                                        } text-base lgg:text-lg 2xl:text-xl`}
                                      />
                                    </div>

                                    <div className={`${btns}`}>
                                      <BsFillChatFill
                                        className={`${
                                          m.done
                                            ? "text-[#2CCCFF]"
                                            : "text-white/40"
                                        } text-base lgg:text-lg 2xl:text-xl`}
                                      />
                                    </div>

                                    {(m.bundle ==
                                      "follow like comment retweet join discord" ||
                                      m.bundle ==
                                        "Like comment retweet follow") && (
                                      <div className={`${btns}`}>
                                        <FaTwitter
                                          className={`${
                                            m.done
                                              ? "text-[#5460E6]"
                                              : "text-white/40"
                                          } text-base lgg:text-lg 2xl:text-xl`}
                                        />
                                      </div>
                                    )}
                                    {(m.bundle ===
                                      "follow like comment retweet join discord" ||
                                      m.bundle ===
                                        "like comment retweet join discord") && (
                                      <div className={`${btns}`}>
                                        <FaDiscord
                                          className={`${
                                            m.done
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
                    ))}
              </div>
            )}
          </Swiper>
        )}
      </div>
    </div>
  );
}
