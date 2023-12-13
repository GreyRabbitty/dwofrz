import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { Button } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineRetweet } from "react-icons/ai";
import { BsFillChatFill, BsTwitter } from "react-icons/bs";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { MdArrowBackIos, MdVerified } from "react-icons/md";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import sollogo from "../../../public/sollogo.png";
import { CountdownTimer } from "../../Counter/Counter";
import CustomTitle from "../../CustomTitle";
import { get_followers } from "../../instraction/twitter/sereach/followers";
import data from "./data.json";

export default function featured({ tweets }) {
  const styleS = "md:h-80 lgg:h-[370px] 2xl:h-[400px]";
  const router = useRouter();

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
  const { theme, setTheme } = useTheme();
  const [dimensions, setDimensions] = useState([]);

  function handleLoad(event, index) {
    const newDimensions = [...dimensions];
    newDimensions[index] = {
      height: event.target.naturalHeight,
    };
    setDimensions(newDimensions);
  }

  const btns =
    "w-9 lgg:w-10 2xl:w-11 h-9 lgg:h-10 2xl:h-11 rounded-md lgg:rounded-xl bg-cusEL-200/60 hover:bg-cusEL-200 flex justify-center items-center";

  return (
    <div>
      <div className="mt-4">
        <div className="flex items-center justify-start my-2">
          <CustomTitle>Featured Tweets</CustomTitle>
        </div>

        <Swiper
          spaceBetween={20}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2500,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper1 md:min-h-[400px] max-w-4xl lgg:max-w-[1050px] 2xl:max-w-[1200px] mt-4 mx-auto"
        >
          {showdataloading ? (
            <>
              {data.map((el, i) => (
                <SwiperSlide key={i}>
                  <Skeleton
                    animation="pulse"
                    variant="rectangular"
                    sx={{ bgcolor: "grey.900" }}
                    height={500}
                    className={`${styleS} rounded-xl md:rounded-3xl`}
                  />
                </SwiperSlide>
              ))}
            </>
          ) : (
            <>
              {!tweets.error &&
                tweets.map(
                  (n, i) =>
                    n.live &&
                    // i < 50 &&
                    n.featured_tweet == true && (
                      <SwiperSlide key={i}>
                        <div
                          className={`rounded-xl lgg:rounded-3xl overflow-hidden bg-cusEL-100 border border-cusEL-200 grid grid-cols-1 md:grid-cols-2 ${styleS}`}
                        >
                          <div className="flex flex-col justify-between order-2 w-full h-full p-4 ssm:p-6 lgg:p-7 2xl:p-8 md:order-1">
                            <div className="">
                              <div className="flex items-start justify-center text-3xl font-bold uppercase lgg:text-4xl 2xl:text-5xl text-white/90 md:justify-start">
                                {n.name}
                                <div className="group text-[var(--dwselect)] ml-2 mt-1 z-10 font-normal text-2xl relative">
                                  <span className="p-2 w-[200px] text-white text-center rounded-lg absolute -top-[35px] md:right-[50%] md:translate-x-[50%] bg-gray-800 text-xs scale-0 group-hover:scale-100 duration-300 delay-200 md:origin-bottom">
                                    This project is verified
                                  </span>
                                  <MdVerified className="text-base lgg:text-xl" />
                                </div>
                              </div>
                              <div className="mt-2 text-sm font-light lgg:mt-3 lgg:text-base 2xl:text-lg text-white/60">
                                {n.discription.slice(0, 300)}
                                {n.discription.length > 300 && "..."}
                              </div>
                            </div>

                            <div className="mt-4">
                              <div className="flex items-center justify-start">
                                <h4 className="text-[#D9D9D9] text-xs lgg:text-sm 2xl:text-base">
                                  Time Remaining:
                                </h4>
                                <span className="font-bold text-sm lgg:text-base 2xl:text-lg ml-1.5 mt-1 text-[#FFA800]">
                                  <CountdownTimer
                                    countdownTimestampMs={n.postAt}
                                    width={22}
                                    finish={2}
                                  />
                                </span>
                              </div>

                              <div className="flex items-center justify-start">
                                <h4 className="text-[#D9D9D9] text-xs lgg:text-sm 2xl:text-base">
                                  Rewards:
                                </h4>

                                <div className="flex items-center text-[#FFA800] text-sm lgg:text-base 2xl:text-lg font-bold rounded-md">
                                  {n && n.network == "ETH" ? (
                                    n.native_coin ? (
                                      <div>{n.eth_amount} ETH</div>
                                    ) : n.nft ? (
                                      <Link
                                        href={`https://testnets.opensea.io/assets/goerli/${n.nft_address}/${n.token_id}`}
                                        target={"_blank"}
                                      >
                                        {n.nft_name}/NFT
                                      </Link>
                                    ) : (
                                      <div>
                                        {n.token_amount} {n.token_name}
                                        /TOKEN
                                      </div>
                                    )
                                  ) : n.network == "solana" && n.native_coin ? (
                                    <div className="flex items-center">
                                      <div className="mx-2">
                                        <Image
                                          src={sollogo}
                                          width={17}
                                          height={20}
                                          alt=""
                                        />
                                      </div>
                                      {n.applySol} SOL
                                    </div>
                                  ) : n.nft ? (
                                    <Link
                                      href={`https://magiceden.io/item-details/${n.token_address}`}
                                      target={"_blank"}
                                    >
                                      {n.nft_name.length > 0
                                        ? n.nft_name
                                        : "NFT"}
                                    </Link>
                                  ) : (
                                    <Link
                                      href={`https://solscan.io/address//${n.token_address}`}
                                      target={"_blank"}
                                    >
                                      {n.amount} {n.token_name}
                                    </Link>
                                  )}
                                </div>
                              </div>

                              <div className="flex flex-col items-center justify-between mt-5 ssm:flex-row">
                                <Button
                                  onClick={() =>
                                    router.push(`/${n.name}/${n.twitter_id}`)
                                  }
                                  className="order-2 w-full px-4 capitalize llg:px-6 customStylesButton2 lightOnHoverViolet ssm:w-fit ssm:order-1"
                                >
                                  Go To Tweet
                                </Button>

                                <div className="flex justify-center md:justify-start items-center h-fit space-x-2.5 order-1 ssm:order-2 mb-3 ssm:mb-0">
                                  <div className={`${btns}`}>
                                    <AiFillHeart
                                      className={`${
                                        n.done
                                          ? "text-[#F91881]"
                                          : "text-white/40"
                                      } text-lg lgg:text-[21px] 2xl:text-2xl`}
                                    />
                                  </div>

                                  <div className={`${btns}`}>
                                    <AiOutlineRetweet
                                      className={`${
                                        n.done
                                          ? "text-[#00FF85]"
                                          : "text-white/40"
                                      } text-lg lgg:text-[21px] 2xl:text-2xl`}
                                    />
                                  </div>

                                  <div className={`${btns}`}>
                                    <BsFillChatFill
                                      className={`${
                                        n.done
                                          ? "text-[#2CCCFF]"
                                          : "text-white/40"
                                      } text-lg lgg:text-[21px] 2xl:text-2xl`}
                                    />
                                  </div>

                                  {(n.bundle ==
                                    "follow like comment retweet join discord" ||
                                    n.bundle ==
                                      "Like comment retweet follow") && (
                                    <div className={`${btns}`}>
                                      <FaTwitter
                                        className={`${
                                          n.done
                                            ? "text-[#0094FF]"
                                            : "text-white/40"
                                        } text-lg lgg:text-[21px] 2xl:text-2xl`}
                                      />
                                    </div>
                                  )}
                                  {(n.bundle ===
                                    "follow like comment retweet join discord" ||
                                    n.bundle ===
                                      "like comment retweet join discord") && (
                                    <div className={`${btns}`}>
                                      <FaDiscord
                                        className={`${
                                          n.done
                                            ? "text-[#5460E6]"
                                            : "text-white/40"
                                        } text-lg lgg:text-[21px] 2xl:text-2xl`}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="order-1 w-full h-full overflow-hidden md:order-2">
                            <Image
                              src={n.project_image}
                              width={1200}
                              height={300}
                              onLoad={(event) => handleLoad(event, i)}
                              className="bg-[#D2B7B7] w-full max-h-[400px] md:h-full object-cover object-center"
                              alt=""
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                    )
                )}
            </>
          )}
        </Swiper>
      </div>
    </div>
  );
}
