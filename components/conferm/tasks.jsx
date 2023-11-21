import Switch from "@mui/material/Switch";
import { web3 } from "@project-serum/anchor";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import icon1 from "../../public/chart-pie1.png";
import icon2 from "../../public/chart-pie2.png";
import icon4 from "../../public/iconing.png";
import vx1 from "../../public/vx1.png";
import vx2 from "../../public/vx2.png";
import { accept_items } from "../instraction/ETH/accept";
import { cancel_item } from "../instraction/ETH/refuse";
import { accept } from "../instraction/solana/accept";
import { cancel } from "../instraction/solana/cancel";
import { delete_tweet } from "../instraction/solana/delete_tweets";

export default function tasks() {
  const [tweets, setTweets] = useState();
  const [disable, setdesable] = useState();
  const [refresh, setrefresh] = useState(false);
  const [load, setLoad] = useState();
  const [all_tweets, setAllTweets] = useState();
  const [feature, setFeature] = useState(false);
  const [selected_tweet, setSelectedTweet] = useState();

  const AnchorWallet = useAnchorWallet();
  const wallet = useWallet();

  const {
    active,
    activate,
    chainId,
    account,
    library: provider,
  } = useWeb3React();

  const contract_address = "0xAa444f823C3cEFcd3776fDC53f95ebbE7a6039B0";

  const connection = new web3.Connection(
    "https://lingering-hardworking-knowledge.solana-mainnet.discover.quiknode.pro/4906da7da32f9fa2de8d4de83aec225ae0197e58/"
  );
  // const connection =sdvs new web3.Connection(web3.clusterApiUrl("devnet"));

  async function get_data() {
    setTweets();
    const result = await fetch(
      `/api/database?database=waiting_tweet&collection=solana`
    );

    const json = await result.json();

    const result_eth = await fetch(
      `/api/database?database=waiting_tweet&collection=ETH`
    );
    const json_eth = await result_eth.json();
    if (json_eth.length > 0) {
      let i;
      json_eth.map((el) => {
        json.push(el);
      });
    }
    setTweets(json);
  }

  async function get_tweets() {
    try {
      const resp = await fetch(
        "/api/database?database=tweets&collection=tweets"
      );
      const resp_json = await resp.json();
      if (resp_json && resp_json.length > 0) {
        setAllTweets(resp_json);
      }
    } catch (e) {}
  }

  async function _delete_tweet(id) {
    try {
      notify_laoding();
      await delete_tweet(AnchorWallet.publicKey.toBase58(), id, wallet);
      notify_delete();
      notify_success("you successfully send the reword!");
      get_tweets();
    } catch (e) {
      notify_delete();
      notify_error("ERROR!");
    }
  }

  useEffect(() => {
    get_tweets();
    get_data();
  }, []);

  async function accept_tweets_solana(data) {
    console.log('====== Accept_tweets_solana ======');
    setrefresh(true);
    setdesable(true);
    notify_laoding("transaction pending...");
    try {
      if (data.featured_tweet == true) {
        if (selected_tweet) {
          if (data._id == selected_tweet) {
            data.featured_tweet = feature;
          } else {
            data.featured_tweet = false;
          }
        } else {
          data.featured_tweet = false;
        }
      } else {
        data.featured_tweet = false;
      }
      console.log(' Before Accepts Function ')
      await accept(data, AnchorWallet, wallet, connection);
      notify_delete();
      notify_success("transaction successful");
      reload_data();
    } catch (e) {
      console.log(e);
      notify_delete();
      setrefresh(false);
      setdesable(false);
      notify_error("transaction failed");
    }
  }

  async function cancel_tweet_solana(data) {
    setrefresh(true);
    setdesable(true);

    notify_laoding("transaction pending...");
    try {
      await cancel(data, AnchorWallet, connection, wallet);
      notify_delete();
      notify_success("transaction successful");
      reload_data();
    } catch (e) {
      console.log(e);
      notify_delete();
      setrefresh(false);
      setdesable(false);
      notify_error("transaction failed");
    }
  }

  async function accepts_tweet_eth(data) {
    if (!active) return;

    const signer = provider.getSigner();

    setrefresh(true);
    setdesable(true);
    notify_laoding("transaction pending...");

    try {
      await accept_items(data, signer, contract_address, account);
      notify_delete();
      notify_success("transaction successful");
      reload_data();
    } catch (e) {
      console.log(e);
      notify_delete();
      setrefresh(false);
      setdesable(false);
      notify_error("transaction failed");
    }
  }

  async function refuse_tweet_eth(data) {
    if (!active) return;
    const signer = provider.getSigner();

    setrefresh(true);
    setdesable(true);
    notify_laoding("transaction pending...");

    try {
      await cancel_item(data, signer, contract_address);
      notify_delete();
      notify_success("transaction successful");
      reload_data();
    } catch (e) {
      console.log(e);
      notify_delete();
      setrefresh(false);
      setdesable(false);
      notify_error("transaction failed");
    }
  }

  useEffect(() => {
    window.onbeforeunload =
      refresh &&
      function (e) {
        return "Don't leave";
      };
    return () => {
      window.onbeforeunload = null;
    };
  }, [refresh]);

  async function reload_data() {
    setrefresh(false);
    setdesable(false);
  }

  const notify_success = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const notify_error = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const notify_laoding = (msg) => {
    toast.loading(msg, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const notify_delete = () => {
    toast.dismiss();
  };

  const [showtasks, setshowtasks] = useState("overview");

  return (
    <div>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <div className="flex w-full min-h-screen pt-4">
        <div className="w-[16%] rounded-tr-sm min-w-[250px] text-[#0E9F6E] bg-gradient-to-t from-[#25252E] to-[#2C2B36] ">
          <div className="px-4 pt-8 text-base">
            {/* Overview */}
            <div className="flex items-center">
              <div>
                <Image src={icon1} width={20} height={20} alt="" />
              </div>
              <div
                className={`mx-3  cursor-pointer ${
                  showtasks === "overview" && "text-white"
                }`}
                onClick={() => setshowtasks("overview")}
              >
                Overview
              </div>
            </div>
            {/* Ragnarok-Form */}
            <div className="flex items-center my-3">
              <div>
                <Image src={icon2} width={20} height={20} alt="" />
              </div>
              <div
                className={`ml-3 mr-[7px]  cursor-pointer ${
                  showtasks === "pandora" && "text-white"
                }`}
                onClick={() => setshowtasks("pandora")}
              >
                Ragnarok-Form
              </div>
              <div>
                <Image src={icon4} width={20} height={20} alt="" />
              </div>
            </div>
            {/* Pandora-Form */}
            <div className="flex items-center ">
              <div>
                <Image src={icon2} width={20} height={20} alt="" />
              </div>
              <div
                className={`ml-3 mr-4 cursor-pointer ${
                  showtasks === "ragnarok" && "text-white"
                }`}
                onClick={() => setshowtasks("ragnarok")}
              >
                Pandora-Form
              </div>
              <div>
                <Image src={icon4} width={20} height={20} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[84%] min-w-[1000px] m-2 rounded-tl-xl ">
          {showtasks === "overview" && (
            <div className="w-full h-full text-black bg-white rounded-xl ">
              <div className="px-3 pt-2 text-3xl font-semibold">Orders</div>
              <div className="px-3 mt-1 text-lg text-black/60">
                This is a list of latest Orders.
              </div>

              <div className="relative mt-3 overflow-x-auto text-sm">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50 ">
                    <tr>
                      <th scope="col" className="px-2 py-3">
                        Project
                      </th>
                      <th scope="col" className="px-2 py-3">
                        Bundle
                      </th>
                      {/* <th scope="col" className="px-2 py-3">
                        Discord
                      </th> */}
                      {/* <th scope="col" className="px-5 py-3">
                        tweet ID
                      </th> */}
                      <th scope="col" className="px-5 py-3">
                        Winner
                      </th>
                      <th scope="col" className="px-5 py-3">
                        Reward
                      </th>
                      <th scope="col" className="px-2 py-3 text-center w-fit">
                        STATUS
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-center text-red-600"
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {all_tweets &&
                      all_tweets.map(
                        (tweet, i) =>
                          !tweet.done && (
                            <tr key={i} className="bg-white border-b">
                              <th
                                scope="row"
                                className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap"
                              >
                                <Link
                                  href={`http://localhost:3000/${tweet.name}/${tweet.twitter_id}`}
                                  target="_blank"
                                >
                                  {tweet.name}
                                </Link>
                              </th>
                              <td className="px-2 py-4 w-[250px]">
                                {tweet.bundle}
                              </td>
                              {/* <td className="px-2 py-4">
                            {tweet.discord_url && (
                              <>
                                {tweet.discord_url.slice(0, 6)}...
                                {tweet.discord_url.slice(
                                  tweet.discord_url.length - 4,
                                  tweet.discord_url.length
                                )}
                              </>
                            )}
                          </td> */}
                              {/* <td className="px-5 py-4 text-xs">
                            {tweet.twitter_id}
                          </td> */}
                              <td className="px-2 py-4">
                                {tweet.winner && tweet.winner}
                              </td>
                              <td className="px-5 py-4">
                                {tweet.network == "ETH" ? (
                                  tweet.native_coin ? (
                                    <div>{tweet.eth_amount} ETH</div>
                                  ) : tweet.nft ? (
                                    <Link
                                      // href={`https://opensea.io/assets/ethereum/${tweet.nft_address}/${tweet.token_id}`}
                                      href={`https://testnets.opensea.io/assets/goerli/${tweet.nft_address}/${tweet.token_id}`}
                                      target={"_blank"}
                                    >
                                      {tweet.nft_name}/NFT
                                    </Link>
                                  ) : (
                                    <div
                                    // href={`https://opensea.io/assets/ethereum/${tweet.nft_address}/${tweet.token_id}`}
                                    //  href={`https://testnets.opensea.io/assets/goerli/${tweet.nft_address}/${tweet.token_id}`}
                                    //  target={"_blank"}
                                    >
                                      {tweet.token_amount} {tweet.token_name}
                                      /TOKEN
                                    </div>
                                  )
                                ) : tweet.network == "solana" &&
                                  tweet.native_coin ? (
                                  <div>{tweet.amount} SOL</div>
                                ) : tweet.nft ? (
                                  <Link
                                    href={`https://magiceden.io/item-details/${tweet.nft_address}`}
                                    target={"_blank"}
                                  >
                                    {tweet.nft_name}
                                  </Link>
                                ) : (
                                  <Link
                                    href={`https://solscan.io/address//${tweet.token_address}`}
                                    target={"_blank"}
                                  >
                                    {tweet.amount} {tweet.token_name}
                                  </Link>
                                )}
                              </td>
                              <td className="flex justify-center px-2 py-4">
                                {!tweet.live ? (
                                  <>
                                    {" "}
                                    <div className="text-sm w-fit tex-center px-2 py-2 rounded-full bg-[#03543e42] ">
                                      Completed
                                    </div>
                                    {/* <div onClick={() => _delete_tweet(tweet._id)}>
                                  <Image src={vx2} width={30} height={30} />{" "}
                                </div> */}
                                  </>
                                ) : (
                                  <div className="text-sm w-[97px] text-center px-3 py-2 rounded-full bg-[#9b1c1c63] ">
                                    In progress
                                  </div>
                                )}
                              </td>
                              <td className="px-4 py-4">
                                {!tweet.live && (
                                  <div
                                    onClick={() => _delete_tweet(tweet._id)}
                                    title="delete"
                                  >
                                    <MdDeleteForever className="-mt-1 text-2xl text-red-600 cursor-pointer" />
                                  </div>
                                )}
                              </td>
                            </tr>
                          )
                      )}
                    {/* <tr className="bg-white border-b">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        Project Name
                      </th>
                      <td className="px-2 py-4">Like/Reweet</td>
                      <td className="px-2 py-4">NAME#1234</td>
                      <td className="px-2 py-4 text-xs">134252352355235</td>
                      <td className="px-2 py-4">https://twiter.com/Dworfz</td>
                      <td className="px-2 py-4">https://discord.gg/Dworfz</td>
                      <td className="flex justify-center px-1 py-4">
                        <div className="text-sm w-fit tex-center px-3 py-2 rounded-full bg-[#9b1c1c63] ">
                          Cancelled
                        </div>
                      </td>
                    </tr> */}
                    {/* <tr className="bg-white border-b">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        Project Name
                      </th>
                      <td className="px-2 py-4">Like/Reweet</td>
                      <td className="px-2 py-4">NAME#1234</td>
                      <td className="px-2 py-4 text-xs">134252352355235</td>
                      <td className="px-2 py-4">https://twiter.com/Dworfz</td>
                      <td className="px-2 py-4">https://discord.gg/Dworfz</td>
                      <td className="flex justify-center px-1 py-4">
                        <div className="text-sm w-fit tex-center px-2 py-2 rounded-full bg-[#1e439f4d] ">
                          In progress
                        </div>
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {showtasks === "pandora" && (
            <div className="w-full min-w-[1100px]   rounded-tl-lg h-full bg-gradient-to-t px-4 from-[#736D8B] to-[#212129]">
              <div className="pt-3 mb-10 text-xl font-semibold">
                Latest Customers
              </div>
              <table className="w-full text-xs text-gray-500 uppercase ">
                <thead className="text-xs text-gray-500 uppercase">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-[var(--dwselect)] whitespace-nowrap"
                    ></th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-[var(--dwselect)] whitespace-nowrap"
                    >
                      Bundle
                    </th>
                    {/* <th
                      scope="col"
                      className="px-6 py-4 font-medium text-[var(--dwselect)] whitespace-nowrap"
                    >
                      Discord Contact
                    </th> */}
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-[var(--dwselect)] whitespace-nowrap"
                    >
                      Twitter ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-[var(--dwselect)] whitespace-nowrap"
                    >
                      Twitter
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-[var(--dwselect)] whitespace-nowrap"
                    >
                      Discord
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-[var(--dwselect)] whitespace-nowrap"
                    >
                      Network
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-[var(--dwselect)] whitespace-nowrap"
                    >
                      Reward
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-[var(--dwselect)] whitespace-nowrap"
                    >
                      Featured
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-[var(--dwselect)] whitespace-nowrap"
                    ></th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {tweets &&
                    tweets.map((tweet, i) => (
                      <tr
                        key={i}
                        className="text-xs text-center border-b border-white/60"
                      >
                        <td
                          scope="row"
                          className="flex items-center px-2 py-4 text-xs"
                        >
                          <Image
                            src={tweet.project_image}
                            width={40}
                            height={30}
                            alt=""
                            className="rounded-full"
                          />
                          <div>
                            <div className="text-xs text-[#FB923C]">
                              {tweet.discord_contact}
                            </div>
                            <div className="text-xs text-white">
                              {tweet.owner.slice(0, 4) +
                                "..." +
                                tweet.owner.slice(
                                  tweet.owner.length - 4,
                                  tweet.owner.length
                                )}
                            </div>
                          </div>
                        </td>
                        <td scope="row" className="px-3 py-4 text-xs">
                          <div>
                            {/* <div>Bundle</div> */}
                            <div className="lg:text-[9px] xl:text-sm text-white">
                              {tweet.bundle}
                            </div>
                          </div>
                        </td>
                        {/* <td scope="row" className="px-2 py-4 text-xs">
                          {tweet && tweet.discord_constact && (
                            <div>
                              <div className="text-sm text-white">
                                {tweet.discord_constact}
                              </div>
                            </div>
                          )}
                        </td> */}
                        <td scope="row" className="px-2 py-4 text-xs">
                          <div>
                            {/* <div>Twitter ID</div> */}
                            <Link
                              href={`https://twitter.com/${tweet.name}/status/${tweet.twitter_id}`}
                              target="_blank"
                              className="text-sm text-white"
                            >
                              {tweet.twitter_id}
                            </Link>
                          </div>
                        </td>
                        <td scope="row" className="px-2 py-4 text-xs">
                          <div>
                            {/* <div>Twitter</div> */}
                            <a
                              href={`${tweet.twitter_url}`}
                              target={"_blank"}
                              className="text-sm text-white"
                            >
                              {tweet.name}
                            </a>
                          </div>
                        </td>
                        <td scope="row" className="px-2 py-4">
                          {tweet && tweet.discord_url && (
                            <div>
                              <a
                                href={`${tweet.discord_url}`}
                                target={"_blank"}
                                className="text-sm text-white"
                              >
                                {tweet.discord_url.slice(0, 6)}...
                                {tweet.discord_url.slice(
                                  tweet.discord_url.length - 4,
                                  tweet.discord_url.length
                                )}
                              </a>
                            </div>
                          )}
                        </td>
                        <td scope="row" className="px-2 py-4">
                          <div>
                            {/* <div>Twitter ID</div> */}
                            <div className="text-sm text-white">
                              {tweet.network}
                            </div>
                          </div>
                        </td>
                        <td scope="row" className="px-2 py-4 text-white">
                          {tweet.network == "ETH" ? (
                            tweet.native_coin ? (
                              <div>{tweet.eth_amount} ETH</div>
                            ) : tweet.nft ? (
                              <Link
                                // href={`https://opensea.io/assets/ethereum/${tweet.nft_address}/${tweet.token_id}`}
                                href={`https://testnets.opensea.io/assets/goerli/${tweet.nft_address}/${tweet.token_id}`}
                                target={"_blank"}
                              >
                                {tweet.nft_name}/NFT
                              </Link>
                            ) : (
                              <div
                              // href={`https://opensea.io/assets/ethereum/${tweet.nft_address}/${tweet.token_id}`}
                              //  href={`https://testnets.opensea.io/assets/goerli/${tweet.nft_address}/${tweet.token_id}`}
                              //  target={"_blank"}
                              >
                                {tweet.token_amount} {tweet.token_name}/TOKEN
                              </div>
                            )
                          ) : tweet.network == "solana" && tweet.native_coin ? (
                            <div>{tweet.amount} SOL</div>
                          ) : tweet.nft ? (
                            <Link
                              href={`https://magiceden.io/item-details/${tweet.nft_address}`}
                              target={"_blank"}
                            >
                              {tweet.nft_name}
                            </Link>
                          ) : (
                            <Link
                              href={`https://solscan.io/address//${tweet.token_address}`}
                              target={"_blank"}
                            >
                              {tweet.amount} {tweet.token_name}
                            </Link>
                          )}
                        </td>
                        <td
                          onClick={() => {
                            tweet.featured_tweet &&
                              (setSelectedTweet(tweet._id),
                              setFeature(!feature));
                          }}
                          scope="row"
                          className="px-2 py-4"
                        >
                          {tweet.featured_tweet && (
                            <Switch
                              inputProps={{ "aria-label": "Switch demo" }}
                              checked={
                                selected_tweet == tweet._id ? feature : false
                              }
                            />
                          )}
                        </td>
                        <td scope="row" className="px-2 py-4">
                          <div className="flex items-center">
                            <div
                              onClick={() =>
                                !disable && tweet.network == "solana"
                                  ? accept_tweets_solana(tweet)
                                  : accepts_tweet_eth(tweet)
                              }
                              className={`hover:scale-105 transition-all cursor-pointer ${
                                disable && "cursor-not-allowed"
                              }`}
                            >
                              <Image src={vx1} width={30} height={30} />{" "}
                            </div>
                            <div
                              onClick={() =>
                                !disable && tweet.network == "solana"
                                  ? cancel_tweet_solana(tweet)
                                  : refuse_tweet_eth(tweet)
                              }
                              className={`hover:scale-105 mx-1 transition-all cursor-pointer ${
                                disable && "cursor-not-allowed"
                              }`}
                            >
                              <Image src={vx2} width={30} height={30} />{" "}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// {showtasks === "ragnarok" && (
//   <div className="w-full h-full bg-gradient-to-t px-4 from-[#736D8B] to-[#212129] grid place-items-center">
//     <div className="grid place-items-center">
//       <div className="text-center mt-5 text-5xl text-[var(--dwtwo)]">
//         Pandora Launchpad Application
//       </div>
//       <div className="grid grid-cols-2 mt-8 gap-y-8 gap-x-7">
//         <div>
//           <div className="text-lg">Project</div>
//           <input
//             type="text"
//             className="w-[300px] py-2 text-black/70 rounded-3xl outline-none focus:scale-y-105 border px-5 focus:border-red-600 transition-all"
//           />
//         </div>
//         <div>
//           <div className="text-lg">Discord Contact:</div>
//           <input
//             type="text"
//             className="w-[300px] py-2 text-black/70 rounded-3xl outline-none focus:scale-y-105 border px-5 focus:border-red-600 transition-all"
//           />
//         </div>
//         <div>
//           <div className="text-lg">Mint Date:</div>
//           <input
//             type="text"
//             className="w-[300px] py-2 text-black/70 rounded-3xl outline-none focus:scale-y-105 border px-5 focus:border-red-600 transition-all"
//           />
//         </div>
//         <div>
//           <div className="text-lg">Mint Price WL/Public:</div>
//           <input
//             type="text"
//             className="w-[300px] py-2 text-black/70 rounded-3xl outline-none focus:scale-y-105 border px-5 focus:border-red-600 transition-all"
//           />
//         </div>
//         <div>
//           <div className="text-lg">Website Link:</div>
//           <input
//             type="text"
//             className="w-[300px] py-2 text-black/70 rounded-3xl outline-none focus:scale-y-105 border px-5 focus:border-red-600 transition-all"
//           />
//         </div>
//         <div>
//           <div className="text-lg">Supply:</div>
//           <input
//             type="text"
//             className="w-[300px] py-2 text-black/70 rounded-3xl outline-none focus:scale-y-105 border px-5 focus:border-red-600 transition-all"
//           />
//         </div>
//         <div>
//           <div className="text-lg">Discord Url:</div>
//           <input
//             type="text"
//             className="w-[300px] py-2 text-black/70 rounded-3xl outline-none focus:scale-y-105 border px-5 focus:border-red-600 transition-all"
//           />
//       </td>
//       <td className="px-6">
//         <div className="flex items-center">
//           <div
//           onClick={() => !disable && tweet.network == "solana" ? accept_tweets_solana(tweet) : accepts_tweet_eth(tweet)}
//           className={`hover:scale-105 transition-all cursor-pointer ${disable && "cursor-not-allowed"}`}>
//             <Image src={vx1} width={30} height={30} />{" "}
//           </div>
//           <div
//           onClick={() => !disable && tweet.network == "solana" ? cancel_tweet_solana(tweet) : refuse_tweet_eth(tweet)}
//           className={`hover:scale-105 mx-1 transition-all cursor-pointer ${disable && "cursor-not-allowed"}`}>
//             <Image src={vx2} width={30} height={30} />{" "}
//           </div>
//         </div>
//         <div>
//           <div className="text-lg">Twitter Url:</div>
//           <input
//             type="text"
//             className="w-[300px] py-2 text-black/70 rounded-3xl outline-none focus:scale-y-105 border px-5 focus:border-red-600 transition-all"
//           />
//         </div>
//       </div>
//       <div>
//         <div className="mt-3 text-lg">Project Details:</div>
//         <textarea
//           className="w-[630px] outline-none px-4 py-2 text-black/70 rounded-3xl"
//           cols="30"
//           rows="10"
//         ></textarea>
//       </div>
//     </div>
//   </div>
// )}
