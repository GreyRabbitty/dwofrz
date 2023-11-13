import React, { useEffect, useState } from "react";
import datat from "./datatweets.json";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Scrollbar, Grid } from "swiper/core";
import { MdArrowBackIos } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import Image from "next/image";
import { BsTwitter } from "react-icons/bs";
import { AiOutlineRetweet } from "react-icons/ai";
import { BsFillChatFill } from "react-icons/bs";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/grid";
import { get_remainig_time } from "../utils/time";
import { getSession } from "next-auth/client";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useWeb3React } from "@web3-react/core";
import logosol from "../.././public/logosol.png";
import CustomTitle from "../CustomTitle";

SwiperCore.use([Scrollbar, Grid]);
//
export default function Tweets() {
  const [tweets, setTweets] = useState(null);
  const [get_entries, setEntries] = useState();
  const AnchorWallet = useAnchorWallet();

  const { active, account } = useWeb3React();

  const btns =
    "w-7 lgg:w-8 2xl:w-9 h-7 lgg:h-8 2xl:h-9 rounded lgg:rounded-md bg-cusEL-200/60 hover:bg-cusEL-200 flex justify-center items-center group";

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      let arr = [];
      if (!tweets) {
        const result = await fetch(
          `/api/database?database=tweets&collection=tweets`,
          {
            signal: signal,
          }
        );
        const json = await result.json();
        arr = json;
        setTweets(json);
      } else {
        arr = tweets;
      }
      const session = await getSession();
      if (!session) return;
      let twitter_id;

      const twitter_id_resp = await fetch("/api/twitter/get_session");
      twitter_id = (await twitter_id_resp.json()).twitter_id;

      const entires_resp = await fetch(
        `/api/database?database=user_raffle&collection=${twitter_id}`,
        {
          signal: signal,
        }
      );
      const entries = await entires_resp.json();

      if (entries && entries.length > 0) {
        setEntries(entries);
      }

      check_mark(arr, entries);
    })();

    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  }, [AnchorWallet, active]);

  // const calculation = useMemo(() => tweets && get_entries && check_mark(), [get_entries, tweets]);

  async function check_mark(tweet_availbe, user_entries) {
    if (tweet_availbe && user_entries) {
      const arr = tweet_availbe;
      tweet_availbe.map((tweet, i) => {
        user_entries.map((entries, j) => {
          if (entries.twitter_id == tweet.twitter_id) {
            arr[i].done = true;
          }
        });
      });
      setTweets(arr);
      return arr;
    }
    return tweets;
  }
  return (
    <div className="px-[1%] my-4">
      <div className="my-2 flex justify-between items-center ">
        <div className="sm:text-xl md:text-3xl flex items-center">
          {/*  <span className="text-red-600 text-3xl">
            <AiFillHeart />{" "}
          </span> */}
          {/* <span className=" font-semibold gold">Tweets</span> */}
          <CustomTitle>Tweets</CustomTitle>
        </div>
      </div>
      {/* <Swiper
        slidesPerView={3}
        spaceBetween={20}
        modules={[Scrollbar, Grid]}
        scrollbar={{ draggable: true }}
        className="min-h-[770px] md:min-h-[880px]"
        grid={{ rows: 3 }}
        draggable={true}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
            grid: {
              rows: 3,
              fill: "row",
            },
          },
          375: {
            slidesPerView: 2,
            spaceBetween: 20,
            grid: {
              rows: 3,
              fill: "row",
            },
          },
          490: {
            slidesPerView: 2,
            spaceBetween: 20,
            grid: {
              rows: 3,
              fill: "row",
            },
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
            grid: {
              rows: 3,
              fill: "row",
            },
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
            grid: {
              rows: 3,
              fill: "row",
            },
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
            grid: {
              rows: 3,
              fill: "row",
            },
          },
          1224: {
            slidesPerView: 5,
            spaceBetween: 20,
            grid: {
              rows: 3,
              fill: "row",
            },
          },
          1500: {
            slidesPerView: 6,
            spaceBetween: 20,
            grid: {
              rows: 3,
              fill: "row",
            },
          },
          1824: {
            slidesPerView: 6,
            spaceBetween: 5,
            grid: {
              rows: 3,
              fill: "row",
            },
          },
          2000: {
            slidesPerView: 7,
            spaceBetween: 5,
            grid: {
              rows: 4,
              fill: "row",
            },
          },
          2300: {
            slidesPerView: 8,
            spaceBetween: 5,
            grid: {
              rows: 4,
              fill: "row",
            },
          },
          2300: {
            slidesPerView: 9,
            spaceBetween: 5,
            grid: {
              rows: 4,
              fill: "row",
            },
          },
          2300: {
            slidesPerView: 8,
            spaceBetween: 5,
            grid: {
              rows: 4,
              fill: "row",
            },
          },
          2600: {
            slidesPerView: 8,
            spaceBetween: 5,
            grid: {
              rows: 5,
              fill: "row",
            },
          },
          3000: {
            slidesPerView: 9,
            spaceBetween: 5,
            grid: {
              rows: 5,
              fill: "row",
            },
          },

          3400: {
            slidesPerView: 12,
            spaceBetween: 5,
            grid: {
              rows: 5,
              fill: "row",
            },
          },
          3700: {
            slidesPerView: 12,
            spaceBetween: 5,
            grid: {
              rows: 6,
              fill: "row",
            },
          },
          4000: {
            slidesPerView: 12,
            spaceBetween: 5,
            grid: {
              rows: 6,
              fill: "row",
            },
          },
          4300: {
            slidesPerView: 13,
            spaceBetween: 5,
            grid: {
              rows: 7,
              fill: "row",
            },
          },
          4600: {
            slidesPerView: 14,
            spaceBetween: 5,
            grid: {
              rows: 8,
              fill: "row",
            },
          },
          5000: {
            slidesPerView: 16,
            spaceBetween: 5,
            grid: {
              rows: 10,
              fill: "row",
            },
          },
        }}
      >
        
      </Swiper> */}
      <div className="gridresp">
        {tweets &&
          tweets.map((m, i) => (
            <div key={i}>
              {/* <div key={i} className="sm:max-w-[185px] md:max-w-[220px] m-1">
                <div className="relative w-full">
                  <div className=" w-full  z-30  ">
                    <div className="relative w-full rounded-2xl  overflow-hidden">
                      <div className="w-full  backdrop-blur-md bg-white/10 absolute top-0 left-0 border-b-2 pt-1 px-1 border-white/30  rounded-t-2xl">
                        <div className="flex justify-between px-[6px] py-[2px] w-full md:mb-[3px]">
                          <div>
                            <div className="bg-[#FFA800] h-fit md:px-[6px] md:py-[2]  text-center text-[12px] md:text-[14px]   rounded-[4px]">
                              {get_remainig_time(m.postAt, 2)}
                            </div>
                            <div className="text-[#FAFAFB] text-xs md:text-sm mt-2 font-semibold">
                              @{m.name}
                            </div>
                          </div>
                          <div className="bg-[#FFA800] rounded-[4px] h-fit  pb-[2px] pt-[3px] w-[53px] md:w-[68px] text-[12px] md:text-[14px] text-center flex flex-col items-center justify-center">
                            <div>
                              <Image
                                src={logosol}
                                className="w-[20px] md:w-[30px] h-[11px] md:h-[24px]"
                              />
                            </div>
                            <div>
                              {m.network == "ETH" ? (
                                m.native_coin ? (
                                  <div>{m.eth_amount} ETH</div>
                                ) : m.nft ? (
                                  <Link
                                    // href={`https://opensea.io/assets/ethereum/${data.nft_address}/${data.token_id}`}
                                    href={`https://testnets.opensea.io/assets/goerli/${m.nft_address}/${m.token_id}`}
                                    target={"_blank"}
                                  >
                                    {m.nft_name}
                                  </Link>
                                ) : (
                                  <div
                                  // href={`https://opensea.io/assets/ethereum/${data.nft_address}/${data.token_id}`}
                                  //  href={`https://testnets.opensea.io/assets/goerli/${data.nft_address}/${data.token_id}`}
                                  //  target={"_blank"}
                                  >
                                    {m.token_amount} {m.token_name}
                                  </div>
                                )
                              ) : m.network == "solana" && m.native_coin ? (
                                <div>{m.amount} SOL</div>
                              ) : m.nft ? (
                                <a
                                  href={`https://magiceden.io/item-details/${m.token_address}`}
                                  target={"_blank"}
                                >
                                  {m.nft_name.length > 0 ? m.nft_name : "NFT"}
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
                      </div>
                      <div className="h-[220px] md:h-[250px] overflow-hidden">
                        <Link href={`/${m.name}/${m.twitter_id}`} className="">
                          <div className="bg-[#383946] dark:bg-gray-300 h-[300px]">
                            <img
                              src={m.project_image}
                              width={400}
                              height={250}
                              className="min-h-[250px]"
                              alt=""
                            />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" ">
                  <div className="flex justify-center -mt-4 items-center  ">
                    <span
                      className={` ${
                        m.done
                          ? "bg-[#B44E00] text-[#FDFDFD]"
                          : "bg-[#F2A45A] text-[#A55B1E]"
                      } text-xl md:text-2xl p-[5px] z-30 rounded-full  mx-[1.6px] transition-all`}
                    >
                      <AiFillHeart />
                    </span>
                    <span
                      className={` ${
                        m.done
                          ? "bg-[#B44E00] text-[#FDFDFD]"
                          : "bg-[#F2A45A] text-[#A55B1E]"
                      } text-xl md:text-2xl p-[5px]  z-30 rounded-full mx-[1.6px] transition-all`}
                    >
                      <div className="rotate-90">
                        <AiOutlineRetweet />
                      </div>
                    </span>
                    <span
                      className={` ${
                        m.done
                          ? "bg-[#B44E00] text-[#FDFDFD]"
                          : "bg-[#F2A45A] text-[#A55B1E]"
                      } text-xl md:text-2xl p-[5px]  z-30 rounded-full mx-[1.6px] transition-all`}
                    >
                      <BsFillChatFill />
                    </span>
                    {(m.bundle == "follow like comment retweet join discord" ||
                      m.bundle == "Like comment retweet follow") && (
                      <span
                        className={` ${
                          m.done
                            ? "bg-[#B44E00] text-[#FDFDFD]"
                            : "bg-[#F2A45A] text-[#A55B1E]"
                        } text-xl md:text-2xl p-[5px]  z-30 rounded-full  mx-[1.6px] transition-all`}
                      >
                        <BsTwitter />
                      </span>
                    )}
                    {(m.bundle === "follow like comment retweet join discord" ||
                      m.bundle === "like comment retweet join discord") && (
                      <span
                        className={` ${
                          m.done
                            ? "bg-[#B44E00] text-[#FDFDFD]"
                            : "bg-[#F2A45A] text-[#A55B1E]"
                        } text-xl md:text-2xl p-[5px]  z-30 rounded-full mx-[1.6px] transition-all`}
                      >
                        <FaDiscord />
                      </span>
                    )}
                  </div>
                  
                </div>
              </div> */}
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
                            @{m.name}
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
                              ) : m.network == "solana" && m.native_coin ? (
                                <div>{m.amount} SOL</div>
                              ) : m.nft ? (
                                <a
                                  href={`https://magiceden.io/item-details/${m.token_address}`}
                                  target={"_blank"}
                                >
                                  {m.nft_name.length > 0 ? m.nft_name : "NFT"}
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
                                m.done ? "text-[#F91881]" : "text-white/40"
                              } text-base lgg:text-lg 2xl:text-xl`}
                            />
                          </div>

                          <div className={`${btns}`}>
                            <AiOutlineRetweet
                              className={`${
                                m.done ? "text-[#00FF85]" : "text-white/40"
                              } text-base lgg:text-lg 2xl:text-xl`}
                            />
                          </div>

                          <div className={`${btns}`}>
                            <BsFillChatFill
                              className={`${
                                m.done ? "text-[#2CCCFF]" : "text-white/40"
                              } text-base lgg:text-lg 2xl:text-xl`}
                            />
                          </div>

                          {(m.bundle ==
                            "follow like comment retweet join discord" ||
                            m.bundle == "Like comment retweet follow") && (
                            <div className={`${btns}`}>
                              <FaTwitter
                                className={`${
                                  m.done ? "text-[#5460E6]" : "text-white/40"
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
                                  m.done ? "text-[#5460E6]" : "text-white/40"
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
            </div>
          ))}
      </div>
    </div>
  );
}
