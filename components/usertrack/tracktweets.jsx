import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function entr({ live, pending, finish }) {
  const icostyle =
    " text-xs md:text-sm p-[6px] rounded-full bg-gray-300 mx-[2px] w-fit h-fit text-black hover:scale-105 transition-all cursor-pointer";
  const s1 = "my-4 border-2 border-[var(--dwtwo)] rounded-xl";

  const [traket, setTraket] = useState("live");

  const handleChange = (event) => {
    setTraket(event.target.value);
  };
  return (
    <>
      <div className="w-[95%] md:h-[88vh] mx-auto max-w-[1700px] rounded-2xl my-5 py-4 px-1 bg-black ">
        {traket === "live" && (
          <div>
            <div className="flex justify-between items-center w-full">
              <div className="text-xl md:text-4xl px-3 mb-5 newstyle  font-semibold">
                Live Tweets
              </div>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 80,
                  "& .MuiSelect-select:focus": { backgroundColor: "black" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ffa048",
                  },
                  "& .MuiSelect-icon": { color: "#ffa048" },
                }}
              >
                <InputLabel
                  className="text-[#ffa048]"
                  id="demo-simple-select-autowidth-label"
                >
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={traket}
                  onChange={handleChange}
                  autoWidth
                  label="Status"
                  sx={{
                    color: "#ffa048", // Change the text color
                    "& .MuiInputBase-input": {
                      color: "#ffa048", // Change the input text color
                    },
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "#ffa048", // Change the underline color when not focused
                    },
                    "& .MuiInput-underline.Mui-focused:before": {
                      borderBottomColor: "#ffa048", // Change the underline color when focused
                    },
                    "& .MuiSvgIcon-root": {
                      color: "#ffa048", // Change the icon color
                    },
                    "& .MuiList-root": {
                      "& .MuiPaper-root": {
                        backgroundColor: "#424242", // dark grey color
                      },
                    },
                    "& .MuiMenuItem-root": {
                      color: "#ffa048", // Change the text color of the options
                    },
                  }}
                >
                  <MenuItem value={"live"}>LIVE</MenuItem>
                  <MenuItem value={"Pending"}>PENDING</MenuItem>
                  <MenuItem value={"finish"}>FINISH</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div
              className="bg-black px-3 max-h-[450px] mb-4 overflow-y-scroll"
              id="task"
            >
              {live &&
                live.length > 0 &&
                live
                  .sort(function (a, b) {
                    return b.postAt - a.postAt;
                  })
                  .map((notify, i) => (
                    <div
                      key={i}
                      className={`${s1} gamingbgg ${
                        i % 2 === 1 && "gamingbggg"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row justify-center md:justify-between text-center font-semibold text-xs md:text-sm ">
                        <div className="flex gap-x-5">
                          <Link
                            href={`/${notify.name}/${notify.twitter_id}`}
                            target="_blank"
                            className="flex rounded-xl h-[70px] overflow-hidden md:table-cell px-4 my-2 "
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
                            <div className="newstyle text-xs md:text-sm">
                              Name
                            </div>
                            <div className="mt-3">@{notify.name}</div>
                          </Link>
                        </div>
                        {/* <div className="table-cell px-4 py-2 mt-1 ">
                    <div className="newstyle text-xs md:text-sm">Time</div>
                    <div className="mt-3 flex items-center">
                      {get_remainig_time(notify.postAt, 1)}
                    </div>
                  </div> */}
                        <div className="table-cell px-4 py-2 mt-1 ">
                          <div className="newstyle text-xs md:text-sm">
                            Bundle
                          </div>
                          <div className="mt-3 flex items-center">
                            {notify.bundle.replaceAll(" ", "/")}
                            {/* <GroupsIcon className="ml-2 text-[30px] text-[var(--dwtwo)]" /> */}
                          </div>
                        </div>
                        <div className="table-cell px-4 py-2 mt-1 ">
                          <div className="newstyle text-xs md:text-sm">
                            Network
                          </div>
                          <div className="mt-3 flex items-center">
                            {notify.network}
                            {/* <GroupsIcon className="ml-2 text-[30px] text-[var(--dwtwo)]" /> */}
                          </div>
                        </div>
                        <div className="table-cell px-10 py-2 mt-1 ">
                          <div className="newstyle text-xs md:text-sm">
                            Reward
                          </div>
                          <div className="mt-3 flex text-center justify-center items-center ">
                            {notify.network == "ETH" ? (
                              notify.native_coin ? (
                                <div>{notify.eth_amount} ETH</div>
                              ) : notify.nft ? (
                                <Link
                                  // href={`https://opensea.io/assets/ethereum/${notify.nft_address}/${notify.token_id}`}
                                  href={`https://testnets.opensea.io/assets/goerli/${notify.nft_address}/${notify.token_id}`}
                                  target={"_blank"}
                                >
                                  {notify.nft_name}/NFT
                                </Link>
                              ) : (
                                <div
                                // href={`https://opensea.io/assets/ethereum/${notify.nft_address}/${notify.token_id}`}
                                //  href={`https://testnets.opensea.io/assets/goerli/${notify.nft_address}/${notify.token_id}`}
                                //  target={"_blank"}
                                >
                                  {notify.token_amount} {notify.token_name}
                                  /TOKEN
                                </div>
                              )
                            ) : notify.network == "solana" &&
                              notify.native_coin ? (
                              <div>{notify.amount} SOL</div>
                            ) : notify.nft ? (
                              <Link
                                href={`https://magiceden.io/item-details/${notify.token_address}`}
                                target={"_blank"}
                              >
                                {notify.nft_name.length > 0
                                  ? notify.nft_name
                                  : "NFT"}
                              </Link>
                            ) : (
                              <Link
                                href={`https://solscan.io/address//${notify.token_address}`}
                                target={"_blank"}
                              >
                                {notify.amount} {notify.token_name}
                              </Link>
                            )}
                            {/* <GroupsIcon className="ml-2 text-[30px] text-[var(--dwtwo)]" /> */}
                          </div>
                        </div>
                        {/* <div className="table-cell px-4 py-2 mt-1">
              <div className="newstyle text-xs md:text-sm">Winner </div>
              <div className="mt-3 text-xs md:text-sm text-[#ADA4A4]">Ongoing</div>
            </div> */}
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        )}
        {traket === "Pending" && (
          <div>
            <div className="flex justify-between items-center">
              <div className="text-xl md:text-4xl px-3 mb-5 newstyle  font-semibold">
                Pending Tweets
              </div>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 80,
                  "& .MuiSelect-select:focus": { backgroundColor: "black" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ffa048",
                  },
                  "& .MuiSelect-icon": { color: "#ffa048" },
                }}
              >
                <InputLabel
                  className="text-[#ffa048]"
                  id="demo-simple-select-autowidth-label"
                >
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={traket}
                  onChange={handleChange}
                  autoWidth
                  label="Status"
                  sx={{
                    color: "#ffa048", // Change the text color
                    "& .MuiInputBase-input": {
                      color: "#ffa048", // Change the input text color
                    },
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "#ffa048", // Change the underline color when not focused
                    },
                    "& .MuiInput-underline.Mui-focused:before": {
                      borderBottomColor: "#ffa048", // Change the underline color when focused
                    },
                    "& .MuiSvgIcon-root": {
                      color: "#ffa048", // Change the icon color
                    },
                    "& .MuiList-root": {
                      "& .MuiPaper-root": {
                        backgroundColor: "#424242", // dark grey color
                      },
                    },
                    "& .MuiMenuItem-root": {
                      color: "#ffa048", // Change the text color of the options
                    },
                  }}
                >
                  <MenuItem value={"live"}>LIVE</MenuItem>
                  <MenuItem value={"Pending"}>PENDING</MenuItem>
                  <MenuItem value={"finish"}>FINISH</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div
              className="bg-black px-3 max-h-[450px] mb-4 overflow-y-scroll"
              id="task"
            >
              {pending &&
                pending.length > 0 &&
                pending
                  .sort(function (a, b) {
                    return b.postAt - a.postAt;
                  })
                  .map((notify, i) => (
                    <div
                      key={i}
                      className={`${s1} gamingbgg ${
                        i % 2 === 1 && "gamingbggg"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row justify-center md:justify-between text-center font-semibold text-xs md:text-sm ">
                        <div className="flex gap-x-5">
                          <Link
                            href={`/${notify.name}/${notify.twitter_id}`}
                            target="_blank"
                            className="flex justify-center rounded-xl h-[70px] overflow-hidden md:table-cell px-4 my-2 "
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
                            <div className="newstyle text-xs md:text-sm">
                              Name
                            </div>
                            <div className="mt-3">@{notify.name}</div>
                          </Link>
                        </div>
                        {/* <div className="table-cell px-4 py-2 mt-1 ">
                    <div className="newstyle text-xs md:text-sm">Time</div>
                    <div className="mt-3 flex items-center">
                      {get_remainig_time(notify.postAt, 1)}
                    </div>
                  </div> */}
                        <div className="table-cell px-4 py-2 mt-1 ">
                          <div className="newstyle text-xs md:text-sm">
                            Bundle
                          </div>
                          <div className="mt-3 flex items-center">
                            {notify.bundle.replaceAll(" ", "/")}
                            {/* <GroupsIcon className="ml-2 text-[30px] text-[var(--dwtwo)]" /> */}
                          </div>
                        </div>
                        <div className="table-cell px-4 py-2 mt-1 ">
                          <div className="newstyle text-xs md:text-sm">
                            Network
                          </div>
                          <div className="mt-3 flex items-center">
                            {notify.network}
                            {/* <GroupsIcon className="ml-2 text-[30px] text-[var(--dwtwo)]" /> */}
                          </div>
                        </div>
                        <div className="table-cell px-10 py-2 mt-1 ">
                          <div className="newstyle text-xs md:text-sm">
                            Reward
                          </div>
                          <div className="mt-3 flex text-center justify-center items-center ">
                            {notify.network == "ETH" ? (
                              notify.native_coin ? (
                                <div>{notify.eth_amount} ETH</div>
                              ) : notify.nft ? (
                                <Link
                                  // href={`https://opensea.io/assets/ethereum/${notify.nft_address}/${notify.token_id}`}
                                  href={`https://testnets.opensea.io/assets/goerli/${notify.nft_address}/${notify.token_id}`}
                                  target={"_blank"}
                                >
                                  {notify.nft_name}/NFT
                                </Link>
                              ) : (
                                <div
                                // href={`https://opensea.io/assets/ethereum/${notify.nft_address}/${notify.token_id}`}
                                //  href={`https://testnets.opensea.io/assets/goerli/${notify.nft_address}/${notify.token_id}`}
                                //  target={"_blank"}
                                >
                                  {notify.token_amount} {notify.token_name}
                                  /TOKEN
                                </div>
                              )
                            ) : notify.network == "solana" &&
                              notify.native_coin ? (
                              <div>{notify.amount} SOL</div>
                            ) : notify.nft ? (
                              <Link
                                href={`https://magiceden.io/item-details/${notify.token_address}`}
                                target={"_blank"}
                              >
                                {notify.nft_name.length > 0
                                  ? notify.nft_name
                                  : "NFT"}
                              </Link>
                            ) : (
                              <Link
                                href={`https://solscan.io/address//${notify.token_address}`}
                                target={"_blank"}
                              >
                                {notify.amount} {notify.token_name}
                              </Link>
                            )}
                            {/* <GroupsIcon className="ml-2 text-[30px] text-[var(--dwtwo)]" /> */}
                          </div>
                        </div>
                        {/* <div className="table-cell px-4 py-2 mt-1">
              <div className="newstyle text-xs md:text-sm">Winner </div>
              <div className="mt-3 text-xs md:text-sm text-[#ADA4A4]">Ongoing</div>
            </div> */}
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        )}
        {traket === "finish" && (
          <>
            <div className="flex justify-between items-center">
              <div className="text-xl md:text-4xl px-3 mb-5 newstyle  font-semibold">
                Finish Tweets
              </div>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 80,
                  "& .MuiSelect-select:focus": { backgroundColor: "black" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ffa048",
                  },
                  "& .MuiSelect-icon": { color: "#ffa048" },
                }}
              >
                <InputLabel
                  className="text-[#ffa048]"
                  id="demo-simple-select-autowidth-label"
                >
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={traket}
                  onChange={handleChange}
                  autoWidth
                  label="Status"
                  sx={{
                    color: "#ffa048", // Change the text color
                    "& .MuiInputBase-input": {
                      color: "#ffa048", // Change the input text color
                    },
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "#ffa048", // Change the underline color when not focused
                    },
                    "& .MuiInput-underline.Mui-focused:before": {
                      borderBottomColor: "#ffa048", // Change the underline color when focused
                    },
                    "& .MuiSvgIcon-root": {
                      color: "#ffa048", // Change the icon color
                    },
                    "& .MuiList-root": {
                      "& .MuiPaper-root": {
                        backgroundColor: "#424242", // dark grey color
                      },
                    },
                    "& .MuiMenuItem-root": {
                      color: "#ffa048", // Change the text color of the options
                    },
                  }}
                >
                  <MenuItem value={"live"}>LIVE</MenuItem>
                  <MenuItem value={"Pending"}>PENDING</MenuItem>
                  <MenuItem value={"finish"}>FINISH</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div
              className="bg-black px-3 max-h-[450px] mb-4 overflow-y-scroll"
              id="task"
            >
              {finish &&
                finish.length > 0 &&
                finish
                  .sort(function (a, b) {
                    return b.postAt - a.postAt;
                  })
                  .map((notify, i) => (
                    <div
                      key={i}
                      className={`${s1} gamingbgg ${
                        i % 2 === 1 && "gamingbggg"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row justify-center md:justify-between text-center font-semibold text-xs md:text-sm ">
                        <div className="flex gap-x-5">
                          <Link
                            href={`/${notify.name}/${notify.twitter_id}`}
                            target="_blank"
                            className="flex justify-center rounded-xl h-[70px] overflow-hidden md:table-cell px-4 my-2 "
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
                            <div className="newstyle text-xs md:text-sm">
                              Name
                            </div>
                            <div className="mt-3">@{notify.name}</div>
                          </Link>
                          {/* <div className="table-cell px-4 py-2 mt-1 ">
                      <div className="newstyle text-xs md:text-sm">Time</div>
                      <div className="mt-3 flex items-center">
                        {get_remainig_time(notify.postAt, 1)}
                      </div>
                    </div> */}
                          <div className="table-cell px-4 py-2 mt-1 ">
                            <div className="newstyle text-xs md:text-sm">
                              Bundle
                            </div>
                            <div className="mt-3 flex items-center">
                              {notify.bundle.replaceAll(" ", "/")}
                              {/* <GroupsIcon className="ml-2 text-[30px] text-[var(--dwtwo)]" /> */}
                            </div>
                          </div>
                          <div className="table-cell px-4 py-2 mt-1 ">
                            <div className="newstyle text-xs md:text-sm">
                              Network
                            </div>
                            <div className="mt-3 flex items-center">
                              {notify.network}
                              {/* <GroupsIcon className="ml-2 text-[30px] text-[var(--dwtwo)]" /> */}
                            </div>
                          </div>
                        </div>
                        <div className="table-cell px-10 py-2 mt-1 ">
                          <div className="newstyle text-xs md:text-sm">
                            Reward
                          </div>
                          <div className="mt-3 flex text-center justify-center items-center ">
                            {notify.network == "ETH" ? (
                              notify.native_coin ? (
                                <div>{notify.eth_amount} ETH</div>
                              ) : notify.nft ? (
                                <Link
                                  // href={`https://opensea.io/assets/ethereum/${notify.nft_address}/${notify.token_id}`}
                                  href={`https://testnets.opensea.io/assets/goerli/${notify.nft_address}/${notify.token_id}`}
                                  target={"_blank"}
                                >
                                  {notify.nft_name}/NFT
                                </Link>
                              ) : (
                                <div
                                // href={`https://opensea.io/assets/ethereum/${notify.nft_address}/${notify.token_id}`}
                                //  href={`https://testnets.opensea.io/assets/goerli/${notify.nft_address}/${notify.token_id}`}
                                //  target={"_blank"}
                                >
                                  {notify.token_amount} {notify.token_name}
                                  /TOKEN
                                </div>
                              )
                            ) : notify.network == "solana" &&
                              notify.native_coin ? (
                              <div>{notify.amount} SOL</div>
                            ) : notify.nft ? (
                              <Link
                                href={`https://magiceden.io/item-details/${notify.token_address}`}
                                target={"_blank"}
                              >
                                {notify.nft_name.length > 0
                                  ? notify.nft_name
                                  : "NFT"}
                              </Link>
                            ) : (
                              <Link
                                href={`https://solscan.io/address//${notify.token_address}`}
                                target={"_blank"}
                              >
                                {notify.amount} {notify.token_name}
                              </Link>
                            )}
                            {/* <GroupsIcon className="ml-2 text-[30px] text-[var(--dwtwo)]" /> */}
                          </div>
                        </div>
                        {/* <div className="table-cell px-4 py-2 mt-1">
              <div className="newstyle text-xs md:text-sm">Winner </div>
              <div className="mt-3 text-xs md:text-sm text-[#ADA4A4]">Ongoing</div>
            </div> */}
                      </div>
                    </div>
                  ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, { Scrollbar, Grid } from "swiper/core";
// import { MdArrowBackIos } from "react-icons/md";
// import { AiFillHeart } from "react-icons/ai";
// import Image from "next/image";
// import { BsTwitter } from "react-icons/bs";
// import { AiOutlineRetweet } from "react-icons/ai";
// import { BsFillChatFill } from "react-icons/bs";
// import { FaDiscord } from "react-icons/fa";
// import Link from "next/link";
// import "swiper/css";
// import "swiper/css/scrollbar";
// import "swiper/css/grid";
// import { get_remainig_time } from "../utils/time";
// import Sekelaton from "../home/tweets/sekelaton";

// SwiperCore.use([Scrollbar, Grid]);
// export default function tracktweets() {
//   const fake = [
//     { id: 1 },
//     { id: 1 },
//     { id: 1 },
//     { id: 1 },
//     { id: 1 },
//     { id: 1 },
//     { id: 1 },
//     { id: 1 },
//     { id: 1 },
//     { id: 1 },
//     { id: 1 },
//     { id: 1 },
//     { id: 1 },
//     { id: 1 },
//     { id: 1 },
//     { id: 1 },
//     { id: 1 },
//     { id: 1 },
//     { id: 1 },
//     { id: 1 },
//     { id: 1 },
//   ];

//   const [tweets, setTweets] = useState([]);

//   useEffect(() => {
//     const controller = new AbortController();
//     const signal = controller.signal;
//     (async () => {
//       const result = await fetch(
//         `/api/database?database=tweets&collection=tweets`,
//         {
//           signal: signal,
//         }
//       );
//       const json = await result.json();
//       setTweets(json);
//     })();

//     return () => {
//       // cancel the request before component unmounts
//       controller.abort();
//     };
//   }, []);
//   return (
//     <div className="px-[1%] my-4">
//       <div className="my-2 flex justify-between items-center ">
//         <div className="sm:text-xl md:text-3xl flex items-center">
//           <span className="text-red-600 text-3xl">
//             <AiFillHeart />{" "}
//           </span>
//           <span className=" font-semibold newstyle">Live Tweets</span>
//         </div>
//       </div>
//       <Swiper
//         slidesPerView={3}
//         spaceBetween={20}
//         modules={[Scrollbar, Grid]}
//         scrollbar={{ draggable: true }}
//         className="pb-3 min-h-[550px] md:min-h-[600px]"
//         grid={{ rows: 2, fill: "row" }}
//         draggable={true}
//         breakpoints={{
//           0: {
//             slidesPerView: 1,
//             spaceBetween: 5,
//           },
//           375: {
//             slidesPerView: 2,
//             spaceBetween: 5,
//           },
//           490: {
//             slidesPerView: 2,
//             spaceBetween: 5,
//           },
//           // when window width is >= 640px
//           640: {
//             slidesPerView: 2,
//             spaceBetween: 5,
//           },
//           // when window width is >= 768px
//           768: {
//             slidesPerView: 3,
//             spaceBetween: 5,
//           },
//           // when window width is >= 1024px
//           1024: {
//             slidesPerView: 4,
//             spaceBetween: 5,
//           },
//           1224: {
//             slidesPerView: 5,
//             spaceBetween: 5,
//           },
//           1500: {
//             slidesPerView: 6,
//             spaceBetween: 5,
//           },
//           1824: {
//             slidesPerView: 7,
//             spaceBetween: 5,
//           },
//           2000: {
//             slidesPerView: 8,
//             spaceBetween: 5,
//           },
//           2300: {
//             slidesPerView: 9,
//             spaceBetween: 5,
//           },
//           2300: {
//             slidesPerView: 9,
//             spaceBetween: 5,
//           },
//           2300: {
//             slidesPerView: 9,
//             spaceBetween: 5,
//           },
//           2600: {
//             slidesPerView: 10,
//             spaceBetween: 5,
//           },
//           3000: {
//             slidesPerView: 10,
//             spaceBetween: 5,
//           },
//           3000: {
//             slidesPerView: 10,
//             spaceBetween: 5,
//           },
//           3400: {
//             slidesPerView: 11,
//             spaceBetween: 5,
//           },
//           3700: {
//             slidesPerView: 12,
//             spaceBetween: 5,
//           },
//           4000: {
//             slidesPerView: 13,
//             spaceBetween: 5,
//           },
//           4300: {
//             slidesPerView: 14,
//             spaceBetween: 5,
//           },
//           4600: {
//             slidesPerView: 15,
//             spaceBetween: 5,
//           },
//           5000: {
//             slidesPerView: 17,
//             spaceBetween: 5,
//           },
//         }}
//       >
//         {!tweets.error ? (
//           tweets.map((m, i) => (
//             <SwiperSlide key={i}>
//               <div className="card mt-1 mb-5 sm:w-[180px] md:w-[200px] ">
//                 <div className="relative w-full">
//                   <div className="img -z-10 absolute top-0 left-0 w-full h-[40px] md:h-[42px] overflow-hidden">
//                     <div className="flex items-center justify-between w-full">
//                       <div className="relative">
//                         <div className="ts"></div>
//                         <div className="absolute -right-[28px] -rotate-[28deg] top-[22px] h-[100px] w-[100px] bg-[#383946]"></div>
//                       </div>
//                       <div className="relative yt">
//                         <div className="ts"></div>
//                         <div className="absolute -right-[28px] -rotate-[28deg] top-[22px] h-[100px] w-[100px] bg-[#383946]"></div>
//                       </div>
//                     </div>
//                     {/* <Image src={Countdown} width={300} height={200} alt="" /> */}
//                   </div>
//                   <div className="flex w-full text-sm pt-[16px] h-[26px] font-semibold justify-between px-1 items-center">
//                     <span className="font-semibold text-center text-xs pr-3 h-[20px] w-[100px]">
//                       {get_remainig_time(m.postAt, 1)}
//                     </span>
//                     <span className="flex items-center justify-center   sm:text-[11px] h-[20px] w-[85px] text-center text-xs -mt-[5px]">
//                       <div className="mr-1  ">
//                         <Image
//                           src={
//                             "https://res.cloudinary.com/dbomy6pyw/image/upload/v1674920296/twitter%20app/Logo-Solana_3_qd2izc.png"
//                           }
//                           width={14}
//                           height={14}
//                           // className="bg-[#383946]"
//                           alt=""
//                         />
//                       </div>
//                       {m.network == "ETH" ? (
//                         m.native_coin ? (
//                           <div>{m.eth_amount} ETH</div>
//                         ) : m.nft ? (
//                           <Link
//                             // href={`https://opensea.io/assets/ethereum/${data.nft_address}/${data.token_id}`}
//                             href={`https://testnets.opensea.io/assets/goerli/${m.nft_address}/${m.token_id}`}
//                             target={"_blank"}
//                           >
//                             {m.nft_name}
//                           </Link>
//                         ) : (
//                           <div
//                           // href={`https://opensea.io/assets/ethereum/${data.nft_address}/${data.token_id}`}
//                           //  href={`https://testnets.opensea.io/assets/goerli/${data.nft_address}/${data.token_id}`}
//                           //  target={"_blank"}
//                           >
//                             {m.token_amount} {m.token_name}
//                           </div>
//                         )
//                       ) : m.network == "solana" && m.native_coin ? (
//                         <div>{m.amount} SOL</div>
//                       ) : m.nft ? (
//                         <Link
//                           href={`https://magiceden.io/item-details/${m.nft_address}`}
//                           target={"_blank"}
//                         >
//                           {m.nft_name}
//                         </Link>
//                       ) : (
//                         <div
//                         // href={`https://magiceden.io/item-details/${data.nft_address}`}
//                         // target={"_blank"}
//                         >
//                           {m.amount} {m.token_name}
//                         </div>
//                       )}
//                     </span>
//                   </div>
//                   <div className="counten w-full pt-3 z-30  font-semibold">
//                     <div className="relative w-full rounded-lg overflow-hidden">
//                       <Link
//                         href={`/${m.name}/${m.twitter_id}`}
//                         // target="_blank"
//                         className="bg-[#383946] h-[200px] overflow-hidden"
//                       >
//                         <Image
//                           src={m.project_image}
//                           width={300}
//                           height={200}
//                           className="bg-[#383946]"
//                           alt=""
//                         />
//                       </Link>
//                       <div className="absolute p-[6px] text-sm bg-black/30 backdrop-blur-sm w-full left-0 bottom-0">
//                         @{m.name}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="text-xs font-bold px-1 flex justify-between">
//                   <div className="flex justify-center mt-1 items-center ">
//                     <span className=" text-base p-[5px] z-30 rounded-full bg-gray-300 mx-[1.6px] text-black hover:scale-105 transition-all cursor-pointer">
//                       <AiFillHeart />
//                     </span>
//                     <span className=" text-base p-[5px] -ml-[3px] z-10 rounded-full bg-gray-300 mx-[1.6px] text-black hover:scale-105 transition-all cursor-pointer">
//                       <div className="rotate-90">
//                         <AiOutlineRetweet />
//                       </div>
//                     </span>
//                     <span className=" text-base p-[5px] -ml-[3px] rounded-full bg-gray-300 mx-[1.6px] text-black hover:scale-105 transition-all cursor-pointer">
//                       <BsFillChatFill />
//                     </span>
//                     {m.bundle ===
//                       "follow like comment retweet join discord" && (
//                       <span className=" text-base p-[5px] -ml-[3px] rounded-full bg-gray-300 mx-[1.6px] text-black hover:scale-105 transition-all cursor-pointer">
//                         <BsTwitter />
//                       </span>
//                     )}
//                     {(m.bundle === "follow like comment retweet join discord" ||
//                       m.bundle === "like comment retweet join discord") && (
//                       <span className=" text-base p-[5px] -ml-[3px] rounded-full bg-gray-300 mx-[1.6px] text-black hover:scale-105 transition-all cursor-pointer">
//                         <FaDiscord />
//                       </span>
//                     )}
//                   </div>
//                   <Link
//                     href={`/${m.name}/${m.twitter_id}`}
//                     className="click cursor-pointer text-[#FCD34D] text-sm mt-1 "
//                   >
//                     Details
//                   </Link>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))
//         ) : (
//           <>
//             {fake.map((m, i) => (
//               <SwiperSlide key={i}>
//                 <Sekelaton />
//               </SwiperSlide>
//             ))}
//           </>
//         )}
//       </Swiper>
//       <div className="mb-2 mt-6 flex justify-between items-center ">
//         <div className="sm:text-xl md:text-3xl flex items-center">
//           <span className="text-red-600 text-3xl">
//             <AiFillHeart />{" "}
//           </span>
//           <span className=" font-semibold newstyle">
//             Pending Tweets
//           </span>
//         </div>
//       </div>
//       <Swiper
//         slidesPerView={3}
//         spaceBetween={20}
//         modules={[Scrollbar, Grid]}
//         scrollbar={{ draggable: true }}
//         className="pb-3"
//         grid={{ rows: 1, fill: "row" }}
//         draggable={true}
//         breakpoints={{
//           0: {
//             slidesPerView: 1,
//             spaceBetween: 5,
//           },
//           375: {
//             slidesPerView: 2,
//             spaceBetween: 5,
//           },
//           490: {
//             slidesPerView: 2,
//             spaceBetween: 5,
//           },
//           // when window width is >= 640px
//           640: {
//             slidesPerView: 2,
//             spaceBetween: 5,
//           },
//           // when window width is >= 768px
//           768: {
//             slidesPerView: 3,
//             spaceBetween: 5,
//           },
//           // when window width is >= 1024px
//           1024: {
//             slidesPerView: 4,
//             spaceBetween: 5,
//           },
//           1224: {
//             slidesPerView: 5,
//             spaceBetween: 5,
//           },
//           1500: {
//             slidesPerView: 6,
//             spaceBetween: 5,
//           },
//           1824: {
//             slidesPerView: 7,
//             spaceBetween: 5,
//           },
//           2000: {
//             slidesPerView: 8,
//             spaceBetween: 5,
//           },
//           2300: {
//             slidesPerView: 9,
//             spaceBetween: 5,
//           },
//           2300: {
//             slidesPerView: 9,
//             spaceBetween: 5,
//           },
//           2300: {
//             slidesPerView: 9,
//             spaceBetween: 5,
//           },
//           2600: {
//             slidesPerView: 10,
//             spaceBetween: 5,
//           },
//           3000: {
//             slidesPerView: 10,
//             spaceBetween: 5,
//           },
//           3000: {
//             slidesPerView: 10,
//             spaceBetween: 5,
//           },
//           3400: {
//             slidesPerView: 11,
//             spaceBetween: 5,
//           },
//           3700: {
//             slidesPerView: 12,
//             spaceBetween: 5,
//           },
//           4000: {
//             slidesPerView: 13,
//             spaceBetween: 5,
//           },
//           4300: {
//             slidesPerView: 14,
//             spaceBetween: 5,
//           },
//           4600: {
//             slidesPerView: 15,
//             spaceBetween: 5,
//           },
//           5000: {
//             slidesPerView: 17,
//             spaceBetween: 5,
//           },
//         }}
//       >
//         {!tweets.error &&
//           tweets.map((m, i) => (
//             <SwiperSlide key={i}>
//               <div className="card mt-1 mb-5 sm:w-[180px] md:w-[200px] ">
//                 <div className="relative w-full">
//                   <div className="img -z-10 absolute top-0 left-0 w-full h-[40px] md:h-[42px] overflow-hidden">
//                     <div className="flex items-center justify-between w-full">
//                       <div className="relative">
//                         <div className="ts"></div>
//                         <div className="absolute -right-[28px] -rotate-[28deg] top-[22px] h-[100px] w-[100px] bg-[#383946]"></div>
//                       </div>
//                       <div className="relative yt">
//                         <div className="ts"></div>
//                         <div className="absolute -right-[28px] -rotate-[28deg] top-[22px] h-[100px] w-[100px] bg-[#383946]"></div>
//                       </div>
//                     </div>
//                     {/* <Image src={Countdown} width={300} height={200} alt="" /> */}
//                   </div>
//                   <div className="flex w-full text-sm pt-[16px] h-[26px] font-semibold justify-between px-1 items-center">
//                     <span className="font-semibold text-center text-xs pr-3 h-[20px] w-[100px]">
//                       {get_remainig_time(m.postAt, 1)}
//                     </span>
//                     <span className="flex items-center justify-center   sm:text-[11px] h-[20px] w-[85px] text-center text-xs -mt-[5px]">
//                       <div className="mr-1  ">
//                         <Image
//                           src={
//                             "https://res.cloudinary.com/dbomy6pyw/image/upload/v1674920296/twitter%20app/Logo-Solana_3_qd2izc.png"
//                           }
//                           width={14}
//                           height={14}
//                           // className="bg-[#383946]"
//                           alt=""
//                         />
//                       </div>
//                       {m.network == "ETH" ? (
//                         m.native_coin ? (
//                           <div>{m.eth_amount} ETH</div>
//                         ) : m.nft ? (
//                           <Link
//                             // href={`https://opensea.io/assets/ethereum/${data.nft_address}/${data.token_id}`}
//                             href={`https://testnets.opensea.io/assets/goerli/${m.nft_address}/${m.token_id}`}
//                             target={"_blank"}
//                           >
//                             {m.nft_name}
//                           </Link>
//                         ) : (
//                           <div
//                           // href={`https://opensea.io/assets/ethereum/${data.nft_address}/${data.token_id}`}
//                           //  href={`https://testnets.opensea.io/assets/goerli/${data.nft_address}/${data.token_id}`}
//                           //  target={"_blank"}
//                           >
//                             {m.token_amount} {m.token_name}
//                           </div>
//                         )
//                       ) : m.network == "solana" && m.native_coin ? (
//                         <div>{m.amount} SOL</div>
//                       ) : m.nft ? (
//                         <Link
//                           href={`https://magiceden.io/item-details/${m.nft_address}`}
//                           target={"_blank"}
//                         >
//                           {m.nft_name}
//                         </Link>
//                       ) : (
//                         <div
//                         // href={`https://magiceden.io/item-details/${data.nft_address}`}
//                         // target={"_blank"}
//                         >
//                           {m.amount} {m.token_name}
//                         </div>
//                       )}
//                     </span>
//                   </div>
//                   <div className="counten w-full pt-3 z-30  font-semibold">
//                     <div className="relative w-full rounded-lg overflow-hidden">
//                       <Link
//                         href={`/${m.name}/${m.twitter_id}`}
//                         // target="_blank"
//                         className="bg-[#383946] h-[200px] overflow-hidden"
//                       >
//                         <Image
//                           src={m.project_image}
//                           width={300}
//                           height={200}
//                           className="bg-[#383946]"
//                           alt=""
//                         />
//                       </Link>
//                       <div className="absolute p-[6px] text-sm bg-black/30 backdrop-blur-sm w-full left-0 bottom-0">
//                         @{m.name}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="text-xs font-bold px-1 flex justify-between">
//                   <div className="flex justify-center mt-1 items-center ">
//                     <span className=" text-base p-[5px] z-30 rounded-full bg-gray-300 mx-[1.6px] text-black hover:scale-105 transition-all cursor-pointer">
//                       <AiFillHeart />
//                     </span>
//                     <span className=" text-base p-[5px] -ml-[3px] z-10 rounded-full bg-gray-300 mx-[1.6px] text-black hover:scale-105 transition-all cursor-pointer">
//                       <div className="rotate-90">
//                         <AiOutlineRetweet />
//                       </div>
//                     </span>
//                     <span className=" text-base p-[5px] -ml-[3px] rounded-full bg-gray-300 mx-[1.6px] text-black hover:scale-105 transition-all cursor-pointer">
//                       <BsFillChatFill />
//                     </span>
//                     {m.bundle ===
//                       "follow like comment retweet join discord" && (
//                       <span className=" text-base p-[5px] -ml-[3px] rounded-full bg-gray-300 mx-[1.6px] text-black hover:scale-105 transition-all cursor-pointer">
//                         <BsTwitter />
//                       </span>
//                     )}
//                     {(m.bundle === "follow like comment retweet join discord" ||
//                       m.bundle === "like comment retweet join discord") && (
//                       <span className=" text-base p-[5px] -ml-[3px] rounded-full bg-gray-300 mx-[1.6px] text-black hover:scale-105 transition-all cursor-pointer">
//                         <FaDiscord />
//                       </span>
//                     )}
//                   </div>
//                   <Link
//                     href={`/${m.name}/${m.twitter_id}`}
//                     className="click cursor-pointer text-[#FCD34D] text-sm mt-1 "
//                   >
//                     Details
//                   </Link>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//       </Swiper>
//     </div>
//   );
// }
