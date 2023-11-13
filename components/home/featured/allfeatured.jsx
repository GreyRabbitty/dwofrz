import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AiFillHeart, AiFillStar, AiOutlineRetweet } from "react-icons/ai";
import { MdArrowBackIos } from "react-icons/md";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { BsFillChatFill } from "react-icons/bs";
import { CountdownTimer } from "../../Counter/Counter";
import data from "./data.json";

export default function featured({ tweets }) {
  const styleS =
    "h-[200px] sm:h-[220px] md:h-[400px] mmd:h-[230px] lg:h-[300px] llg:h-[300px] xl:h-[380px] xxl:h-[380px] xxxxl:h-[420px]";
  const router = useRouter();

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleImageLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.target;
    setDimensions({ width: naturalWidth, height: naturalHeight });
  };

  return (
    <div className="md:pl-20 sm:pl-0 overflow-x-hidden">
      <Head>
        <title>All Featured </title>
      </Head>
      <div className="mt-4 mx-[1%]">
        <div className="my-2 flex justify-between items-center">
          <div className="sm:text-2xl md:text-[31px] flex items-center">
            <span className=" font-semibold newstyle">⭐Featured Tweets</span>
          </div>
          <Link
            href={`/`}
            className="sm:text-xs text-[#FCD34D] dark:text-gray-800 md:text-sm flex items-center cursor-pointer"
          >
            back
            <span className=" rotate-180  font-bold">
              <MdArrowBackIos />
            </span>
          </Link>
        </div>
        <div
          className={`w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 place-items-center xxl:grid-cols-4 xxxl:grid-cols-6`}
        >
          {!tweets.error &&
            tweets.map(
              (n, i) =>
                n.live &&
                n.featured_tweet == true && (
                  <div
                    key={i}
                    className={`relative m-2 overflow-hidden rounded-xl ${styleS}`}
                  >
                    <div className={``}>
                      <Image
                        className={` cursor-pointer min-h-[300px] md:min-h-[380px] xl:min-h-[500px] ${"-mt-[20%]"}`}
                        onClick={() =>
                          router.push(`/${n.name}/${n.twitter_id}`)
                        }
                        src={n.project_image}
                        onLoad={handleImageLoad}
                        width={1200}
                        height={500}
                        alt=""
                      />
                      <div className="absolute  bottom-4 border border-[var(--dwtwo)] sm:left-[50%] sm:-translate-x-[50%] md:translate-x-0 md:left-6 rounded-2xl w-[260px] pb-2 bg-black/40 backdrop-blur-sm">
                        <div className="text-center sm:text-xs md:text-base mt-1">
                          <div className="text-[#E2E4E9]">Time Remaining</div>
                          <div className="sm:text-sm md:text-lg my-[3px] font-semibold flex items-center justify-center">
                            <span className="mx-1 -mt-1">
                              <HourglassEmptyIcon className="text-[var(--dwtwo)]" />
                            </span>
                            <span className="font-semibold">
                              <CountdownTimer
                                countdownTimestampMs={n.postAt}
                                finish={2}
                              />
                            </span>
                          </div>
                          <div className="text-[#EDDCB1]">Rewards:</div>
                        </div>
                        <div className="flex font-semibold items-center justify-evenly w-full sm:mt-1 md:mt-3">
                          <div className="sol bg-[var(--dwdark)] flex items-center sm:text-[10px] md:text-xs border-2  border-[var(--dwtwo)] py-[4.5px] px-3 rounded-md">
                            <span>
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
                                <div>{n.amount} SOL</div>
                              ) : n.nft ? (
                                <Link
                                  href={`https://magiceden.io/item-details/${n.token_address}`}
                                  target={"_blank"}
                                >
                                  {n.nft_name.length > 0 ? n.nft_name : "NFT"}
                                </Link>
                              ) : (
                                <Link
                                  href={`https://solscan.io/address//${n.token_address}`}
                                  target={"_blank"}
                                >
                                  {n.amount} {n.token_name}
                                </Link>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-[80%] right-1 md:bottom-4 md:right-6 flex items-center px-[6px] rounded-[15px] py-1 md:py-[6px] bg-black/70 h-fit">
                        <div
                          className={`${
                            n.done ? "bg-[#32cd32]" : "bg-white/80"
                          } mx-1 hover:scale-[101%] transition-all text-black/70 p-[6px] rounded-full bg-white text-xs md:text-base`}
                        >
                          <AiFillHeart />
                        </div>
                        <div
                          className={`${
                            n.done ? "bg-[#32cd32]" : "bg-white/80"
                          } mx-1 hover:scale-[101%] transition-all text-black/70 p-[6px] rounded-full bg-white text-xs md:text-base`}
                        >
                          <AiOutlineRetweet />
                        </div>
                        <div
                          className={`${
                            n.done ? "bg-[#32cd32]" : "bg-white/80"
                          } mx-1 hover:scale-[101%] transition-all text-black/70 p-[6px] rounded-full bg-white text-xs md:text-base h-fit`}
                        >
                          <BsFillChatFill />
                        </div>
                        {(n.bundle ==
                          "follow like comment retweet join discord" ||
                          n.bundle == "Like comment retweet follow") && (
                          <div
                            className={`${
                              n.done ? "bg-[#32cd32]" : "bg-white/80"
                            } mx-1 hover:scale-[101%] transition-all text-black/70 p-[6px] rounded-full bg-white text-xs md:text-base`}
                          >
                            <FaTwitter />
                          </div>
                        )}
                        {(n.bundle ===
                          "follow like comment retweet join discord" ||
                          n.bundle === "like comment retweet join discord") && (
                          <div
                            className={`${
                              n.done ? "bg-[#32cd32]" : "bg-white/80"
                            } mx-1 hover:scale-[101%] transition-all text-black/70 p-[6px] rounded-full bg-white text-xs md:text-base`}
                          >
                            <FaDiscord />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
}
