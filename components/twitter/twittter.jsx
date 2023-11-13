import GroupsIcon from "@mui/icons-material/Groups";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Rating from "@mui/material/Rating";
import Skeleton from "@mui/material/Skeleton";
import { BN, web3 } from "@project-serum/anchor";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import * as auth from "@supabase/auth-helpers-react";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AiFillHeart, AiFillStar, AiOutlineRetweet } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import { BsFillChatFill, BsTwitter } from "react-icons/bs";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { RingLoader } from "react-spinners";
import { toast } from "react-toastify";
import Backbotton from "../../public/back.png";
import { CountdownTimer } from "../Counter/Counter";
import { SetTimerContext, TimerContext } from "../Counter/CounterCountext";
import { eth_raffle } from "../instraction/ETH/raffle";
import { raff } from "../instraction/raffle/raffle_holder";
import { rate } from "../instraction/rating/rate";
import { sol_raffle } from "../instraction/solana/raffle";
import { instr_follow } from "../instraction/twitter/instraction/follow";
import { instr_like } from "../instraction/twitter/instraction/like";
import { instr_tweet } from "../instraction/twitter/instraction/replay";
import { instr_retweet } from "../instraction/twitter/instraction/retweet";
import { get_followers } from "../instraction/twitter/sereach/followers";
import { useMetaplex } from "../MetaplexProvider/useMetaplex";
import { get_claimer } from "../utils/claimers";
import { DworfzHolderContext } from "../utils/dworfz_holder_context";
import { nftContext } from "../utils/nft";

export default function twittter({
  twitter_session,
  tweet_id,
  twitter_name,
  data,
}) {


  async function _get_followers() {
    try {
      const name = data.name
      const results = await fetch("/api/twitter/search/follow", {
        method: "POST",
        body: JSON.stringify({
          name,
        }),
      }).then((res) => res.json());
      return results.follow
    }catch (e) {
    }
  }


  // const [loading, setLoading] = useState(true);
  const btns =
    "w-9 mr-2 lgg:w-10 2xl:w-11 h-9 cursor-pointer lgg:h-10 2xl:h-11 rounded-md lgg:rounded-xl bg-cusEL-200/60 hover:bg-cusEL-200 flex justify-center items-center";

  const [replay, setreplay] = useState();
  const [is_follow, setIsFollow] = useState(false);
  const [is_like, setIsLike] = useState(false);
  const [is_replay, setIsReplay] = useState(false);
  const [is_retweet, setIsRetweet] = useState(false);
  const [is_discord, setIsDiscord] = useState(false);
  const [is_aligible, setAligible] = useState(false);
  const [method, setmethod] = useState(0);
  const [claimers, setclaimers] = useState(null);
  const [loading_action, setLoandingAction] = useState(false);


  // this state is for if you are in the raffle or not
  const [participate, setParticipate] = useState(true);

  const [in_raffle, setInRaffle] = useState();
  // this is for if the tweet is still live or not
  const [live, setLive] = useState(true);

  const [disable, setDisable] = useState();

  // this state is for if the time of the tweet is finish or not
  const [finish_time, setFinishTime] = useState();

  // all the user that enter the raffle
  const [participated_user, setParticipatedUser] = useState();

  // ETH wallet
  const { active, account, library: provider } = useWeb3React();

  const [loading, setLoading] = useState(true);
  const [winner, setWinner] = useState();

  const wallet = useWallet();
  const AnchorWallet = useAnchorWallet();

  const session = auth.useSession();
  const set_timer = useContext(SetTimerContext);
  const timer = useContext(TimerContext);
  const dworfz_holder = useContext(DworfzHolderContext);
  const nfts = useContext(nftContext);

  const contract_address = "0xAa444f823C3cEFcd3776fDC53f95ebbE7a6039B0";

  const connection = new web3.Connection(
    "https://lingering-hardworking-knowledge.solana-mainnet.discover.quiknode.pro/4906da7da32f9fa2de8d4de83aec225ae0197e58/"
  );
  // const connection = new web3.Csdvsvonnection(web3.clusterApiUrl("devnet"));

  const { metaplex } = useMetaplex();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (!data) return;
    setLoading(true);
    get_follow();
    get_guild_counts();
    aligibility();
    get_participated(signal);
    get_rate(signal);
    if (data.live == false) {
      setLive(false);
      if (data.winner) {
        setWinner(data.winner);
      }
      return;
    }
    const finish_times = 24 * 60 * 60 * 1000 * 2;
    if (data.postAt + finish_times <= Date.now()) {
      setLive(false);
      start_raffel(signal);
    } else {
      setFinishTime(Number(data.postAt) + finish_times);
      setLive(true);
    }
    if (!twitter_session) {
      return;
    }

    // check if the user is already participat or not
    // we still need to see what will happen if his twitter is not connect I think we just need to
    // only display the enter the raffle button only if he is connect his twitter!
    // check what is the requirement for this tweet and also if the
    // user do all the requirement or not
    is_participate(signal);
    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  }, [timer]);

  useEffect(() => {
    if (data.live == false) {
      return;
    }
    if (participate) {
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;
    // check(signal);
    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  }, [participate]);

  // get all the claimers
  useEffect(() => {
    get_claimers();
  }, [AnchorWallet]);

  async function get_claimers() {
    try {
      if (!AnchorWallet) return;
      const owner = new web3.PublicKey(data.owner);
      const claim = await get_claimer(
        AnchorWallet,
        connection,
        owner,
        data.index
      );
      setclaimers(claim);
    } catch (e) {
    }
  }

  async function check(signal) {
    // if (participate) {
    //   return console.log("already participated!");
    // }

    if (!live) {
      return;
    }

    if (!twitter_session) {
      return;
    }

    let _discord = false;
    let _like = false;
    let _replay = false;
    let _retweet = false;
    let _follow = false;

    const query = twitter_name;

    if (!is_replay) {
      const results = await fetch("/api/twitter/search/rtwt_replay", {
        signal: signal,
        method: "POST",
        body: JSON.stringify({
          id: tweet_id,
        }),
      }).then((res) => res.json());
  
      if (results.replay) {
        _replay = true;
      }
    } else {
      _replay = true;
    }
    if (!is_retweet) {
      const results = await fetch("/api/twitter/search/rtwt_replay", {
        signal: signal,
        method: "POST",
        body: JSON.stringify({
          id: tweet_id,
        }),
      }).then((res) => res.json());
      if (results.retweet) {
        _retweet = true;
      }
    } else {
      _retweet = true;
    }
  
  
    // CHECK REPLAY
    // for (let i = 0; i < results.data.length; i++) {
    //   if (
    //     results.data[i].in_reply_to_status_id_str &&
    //     results.data[i].in_reply_to_status_id_str == tweet_id
    //   ) {
    //     setIsReplay(true);
    //     _replay = true;
    //   }

    //   // CHECK RETWEET
    //   if (results.data[i].retweeted_status) {
    //     if (results.data[i].retweeted_status.id == tweet_id) {
    //       setIsRetweet(true);
    //       _retweet = true;
    //     } else {
    //       // console.log("no the right retweet!");
    //     }
    //   } else {
    //     // console.log("this is not a retweet!");
    //   }
    // }
    if (_replay) {
      setIsReplay(true);
    }

    if (_retweet) {
      setIsRetweet(true);
      // retweet();
    }

    // const id = tweet_id;
    // const result = await fetch("/api/twitter/search/_tweet", {
    //   signal: signal,
    //   method: "POST",
    //   body: JSON.stringify({
    //     id,
    //   }),
    // }).then((res) => res.json());
    // console.log("like");
    // console.log(result);
    // CHECK LIKE
    if (is_like) {
      _like = true;
      setIsLike(true);
    }

    // CHECK FOLLOW
    if (
      data.bundle == "follow like comment retweet join discord" ||
      data.bundle == "Like comment retweet follow"
    ) {
      if (!is_follow) {
        const follow = await _get_followers()
        if (follow) {
          _follow = true;
          setIsFollow(true);
        } else {
          setIsFollow(false);
          // follow();
        }
      } else {
        _follow = true
      }
      }

    // CHECK THE SERVER
    _discord = await is_in_the_server();

    if (!_discord) {
      setIsDiscord(false);
    }
    is_claimed(_discord, _like, _replay, _retweet, _follow);
  }
  async function follow() {


    if (loading_action) {
      return
    }
    setLoandingAction(true);

    if (participate) {
      return;
    }
    if (!twitter_session) {
      return notify_warning("connect twitter first!");
    }
    try {
      const results = await instr_follow(twitter_name);
      if (results.status == "ERR") {
        notify_warning(results.message.errors[0].message);
        throw results.message;
      }
      setIsFollow(true);
    } catch (e) {
      // console.log(e);
      throw e;
    } finally {
      setLoandingAction(false);
    }
  }

  async function retweet() {
    if (loading_action) {
      return
    }
    setLoandingAction(true);

    if (participate) {
      return;
    }
    if (!twitter_session) {
      return notify_warning("connect twitter first!");
    }
    try {
      // const results = await fetch("/api/twitter/post/retweet", {
        //   method: "POST",
        //   body: JSON.stringify({
          //     tweet_id,
          //   }),
          // }).then((res) => res.json());
          const results = await instr_retweet(tweet_id);
          if (results.status == "ERR") {
            notify_warning(results.message.errors[0].message);
            throw results.message;
          }
          setIsRetweet(true);
        } catch (e) {
          console.error(e);
          throw e;
        } finally {
          setLoandingAction(false);
        }
      }
      
      async function like() {
        if (participate) {
      return;
    }
    if (!twitter_session) {
      return notify_warning("connect twitter first!");
    }
    if (loading_action) {
      return
    }
    setLoandingAction(true);
    try {
      // const results = await fetch("/api/twitter/post/like", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     tweet_id,
      //   }),
      // }).then((res) => res.json());
      const results = await instr_like(tweet_id);
      if (results.status == "ERR") {
        notify_warning(results.message.errors[0].message);
        throw results.message;
      }
      setIsLike(true);
    } catch (e) {
      // console.error(e);
      throw e;
    } finally {
      setLoandingAction(false);
    }
  }

  async function Tweet() {
    if (loading_action) {
      return
    }
    setLoandingAction(true);

    if (participate) {
      return;
    }
    if (!twitter_session) {
      return notify_warning("connect twitter first!");
    }
    if (replay.length <= 6) {
      return notify_warning("replay too short!");
    }
    try {
      const status = replay;
      const in_reply_to_status_id = tweet_id;
      const auto_populate_reply_metadata = true;
      // const results = await fetch("/api/twitter/post/tweet", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     status,
      //     in_reply_to_status_id,
      //     auto_populate_reply_metadata,
      //   }),
      // }).then((res) => res.json());
      const results = await instr_tweet(
        status,
        in_reply_to_status_id,
        auto_populate_reply_metadata
      );
      if (results.status == "ERR") {
        notify_warning("error: please try again later!");
        throw results.message;
      }
      setIsReplay(true);
    } catch (e) {
      // console.error(e);
      throw e;
    } finally {
      setLoandingAction(false);
    }
  }

  function aligibility() {
    if (data.bundle == "like comment retweet join discord") {
      setmethod(2);
      if (is_discord && is_like && is_replay && is_retweet) {
        setAligible(true);
      }
    } else if (data.bundle == "follow like comment retweet join discord") {
      setmethod(3);
      if (is_discord && is_follow && is_like && is_replay && is_retweet) {
        setAligible(true);
      }
    } else if (data.bundle == "Like comment retweet") {
      setmethod(1);
      if (is_like && is_replay && is_retweet) {
        setAligible(true);
      }
    } else if (data.bundle == "Like comment retweet follow") {
      setmethod(4);
      if (is_like && is_replay && is_retweet && is_follow) {
        setAligible(true);
      }
    }
  }

  // Check if the user have the right to claim or not!
  function is_claimed(_discord, _like, _replay, _retweet, _follow) {
    if (method == 2) {
      if (_discord && _like && _replay && _retweet) {
        setAligible(true);
      } else {
        setAligible(false);
      }
    } else if (method == 3) {
      if (_discord && _follow && _like && _replay && _retweet) {
        setAligible(true);
      } else {
        setAligible(false);
      }
    } else if (method == 1) {
      if (_like && _replay && _retweet) {
        setAligible(true);
      } else {
        setAligible(false);
      }
    } else if (method == 4) {
      if (_like && _replay && _retweet && _follow) {
        setAligible(true);
      } else {
        setAligible(false);
      }
    }
  }

  async function is_in_the_server(signal) {
    let disco = false;
    if (
      data.bundle == "like comment retweet join discord" ||
      data.bundle == "follow like comment retweet join discord"
    ) {
      if (!session) return disco;

      try {
        const ress = await fetch(
          `https://discord.com/api/v9/users/@me/guilds`,
          {
            signal: signal,
            headers: { Authorization: `Bearer ${session.provider_token}` },
          }
        );
        const resp = await ress.json();
        if (resp.length && resp.length > 0) {
          resp.map((guild) => {
            if (data.server_id == guild.id) {
              setIsDiscord(true);
              disco = true;
            }
          });
        } else {
          if (resp.message) {
            notify_warning(
              "you have been either rate limited or your login is expired disconnect and connect discord again!"
            );
          }
        }
        return disco;
      } catch (e) {
        throw e;
      }
    } else {
      return disco;
    }
  }

  async function enter_raffle() {
    if (data.network == "solana") {
      if (!AnchorWallet) {
        notify_warning("connect your solana wallet!");
        return;
      }
    } else if (data.network == "ETH") {
      if (!active) {
        notify_warning("connect your ETH wallet!");
        return;
      }
    }

    if (session === null) {
      notify_warning("connect your discord!");
      return;
    }

    if (twitter_session === null) {
      notify_warning("connect your twitter!");
      return;
    }

    if (!is_aligible) {
      return notify_error("you are not aligible yet!");
    }
    try {
      notify_laoding("Loading...");
      // if (!is_aligible) return;
      if (data.network == "solana") {
        const raf = {
          discord_id: session.user.user_metadata.sub,
          twitter_id: "",
          address:
            data.network == "solana"
              ? AnchorWallet.publicKey.toBase58()
              : data.network == "ETH" && account,
          name: twitter_session.user.name,
        };

        let reword_name;
        let reword_type;
        if (data.native_coin) {
          reword_type = "solana";
          reword_name = "solana";
        } else if (data.nft) {
          reword_type = "nft";
          reword_name = data.nft_name;
        } else if (!data.nft) {
          reword_type = "token";
          reword_name = data.token_name;
        }

        let dworfz_mint = null;
        const tokens = await metaplex
          .nfts()
          .findAllByOwner({ owner: metaplex.identity().publicKey });
        if (tokens) {
          tokens.map((nft) => {
            if (
              nft.creators &&
              nft.creators[0] &&
              nft.creators[0].address &&
              nft.creators[0].address.toBase58() ===
                "HqTe2enoGBB1VBu6FfahXK8PrWjAXxGYMkWyZeK7nYT9"
            )
              dworfz_mint = nft.mintAddress.toBase58();
          });
        }
        // <<<<<<< HEAD
        //         console.log(nfts);
        //         console.log(dworfz_mint);

        //         // if (dworfz_holder) {
                if (nfts) {
                  nfts.map((nft) => {
                    if (
                      nft.creators && nft.creators[0] && nft.creators[0].address && nft.creators[0].address.toBase58() ===
                      "HqTe2enoGBB1VBu6FfahXK8PrWjAXxGYMkWyZeK7nYT9"
                    )
                      dworfz_mint = nft.mintAddress.toBase58();
                  });
                }
        // =======

        if (dworfz_mint === null) {
          const current_time = Date.now();
          const time = data.postAt;
          const day_time = 1000 * 60 * 60 * 24 * 2 + time;
          if (current_time <= day_time) {
            notify_warning(
              "This wallet doesn't have any dworfz nft so it will not be aligible to the reward!"
            );
          }
          // >>>>>>> 7a86e7cbea73b8a58362e287085209de283f6e4e
        }
        await sol_raffle(
          AnchorWallet,
          connection,
          raf,
          wallet,
          data.twitter_id,
          method,
          data.interact,
          data._id,
          data.name,
          data.project_image,
          data.postAt,
          reword_type,
          data.amount,
          reword_name,
          data.owner,
          data.index,
          dworfz_mint,
          data.postAt
        );
        if (dworfz_mint !== null && claimers != data.claimers) {
          setclaimers(claimers + 1);
        }
      } else if (data.network == "ETH") {
        if (!active) return;
        const signer = provider.getSigner(account);
        const raf = {
          discord_id: session.user.user_metadata.sub,
          twitter_id: "",
          address: account,
          name: twitter_session.user.name,
        };

        let reword_name;
        let reword_type;
        let token_amount;
        if (data.native_coin) {
          reword_type = "ETH";
          reword_name = "ETH";
          token_amount = data.eth_amount;
        } else if (data.nft) {
          reword_type = "nft";
          reword_name = data.nft_name;
          token_amount = 1;
        } else if (!data.nft) {
          reword_type = "token";
          reword_name = data.token_name;
          token_amount = data.token_amount;
        }

        await eth_raffle(
          contract_address,
          raf,
          signer,
          data.twitter_id,
          data._id,
          data.interact,
          method,
          account,
          session.user.user_metadata.sub,
          data.name,
          data.project_image,
          data.postAt,
          reword_type,
          token_amount,
          reword_name
        );
      }
      setParticipate(true);
      setInRaffle(true);
      notify_delete();
      notify_success("You have successfully entered the raffle!");
    } catch (e) {
      notify_delete();
      notify_error("there is an error please try again later!");
      throw e;
    }
  }

  // Get all the participated if an tweet
  async function get_participated(signal) {
    try {
      if (!data) return;
      const users = await fetch(
        `/api/database?database=raffle&collection=${data.twitter_id}`,
        {
          signal: signal,
        }
      );
      const usersJson = await users.json();
      if (usersJson && usersJson.length > 0) {
        setParticipatedUser(usersJson);
      }
    } catch (e) {
      throw e;
    }
  }

  // check if the user is participated or not
  async function is_participate(signal) {
    // need to call the twitter sup from server side
    const twitter_id_res = await fetch("/api/database/twitter_id", {
      signal: signal,
    });
    const twitter_id = await twitter_id_res.json();

    const result = await fetch(
      `/api/database/raffle?database=raffle&collection=${data.twitter_id}&twitter_id=${twitter_id.twitter_id}`,
      {
        signal: signal,
      }
    );
    const json = await result.json();
    if (json) {
      setInRaffle(true);
      setParticipate(true);
    } else {
      setInRaffle(false);
      setParticipate(false);
    }
  }

  // start the raffle and see the winner
  async function start_raffel(signal) {
    try {
      const win_info = await raff(
        tweet_id,
        data.name,
        signal,
        data.project_image
      );
      if (win_info.address) {
        // setWinner(win_info.address);
      }
    } catch (e) {
      throw e;
    }
  }

  const notify_success = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const notify_warning = (msg) => {
    toast.info(msg, {
      position: toast.POSITION.TOP_CENTER,
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

  const [rotate, setRotate] = useState(false);

  const handleRotateClick = () => {
    setRotate(true);
  };
  const handleTransitionEnd = () => {
    setRotate(false);
  };
  const snipStyle = {
    transform: rotate ? "rotate(360deg)" : "none",
    transition: rotate ? "transform 1s" : "none",
  };

  const [followers, setFollowers] = useState();

  async function get_follow(signal) {
    try {
      if (!twitter_session) return;
      const follow = await get_followers(data.name, signal);
      if (follow) {
        setFollowers(follow.followers_count);
      }
    } catch (e) {}
  }

  const [discord_counts, setDicordCounts] = useState();

  async function get_guild_counts() {
    if (!data.discord_url) return;

    const invites = data.discord_url;

    let name = invites.replaceAll("https://discord.com/invite/", "");
    name = name.replaceAll("https://discord.gg/", "");
    const resp = await fetch(
      `https://discord.com/api/v9/invites/${name}?with_counts=true&with_expiration=false`
    );
    const resp_json = await resp.json();
    if (resp_json) {
      setDicordCounts(resp_json.approximate_member_count);
    }
  }

  async function rating(user_rate) {
    try {
      if (!AnchorWallet && !active) {
        return notify_warning("Connect your wallet first!");
      }
      if (!twitter_session) {
        return notify_warning("Connect your twitter first!");
      }
      if (!session) {
        return notify_warning("Connect your discord first!");
      }
      let address;
      if (AnchorWallet) {
        address = AnchorWallet.publicKey.toBase58();
      } else if (active) {
        address = account;
      }

      await rate(address, user_rate, tweet_id);
      setIsDidntRate(false);
      notify_success("you have successfully rated!");
    } catch (e) {
      notify_error("something went wrong please rate again later!");
    }
  }
  async function get_rate(signal) {
    try {
      const resp = await fetch(
        `/api/database/get_rate?collection=${tweet_id}`,
        {
          signal: signal,
        }
      );
      const resp_json = await resp.json();
      if (resp_json) {
        setIsDidntRate(false);
      } else {
        setIsDidntRate(true);
      }
    } catch (e) {}
  }

  // Rating
  const [is_didnt_rate, setIsDidntRate] = useState();
  const [ratingvalue, setratingvalue] = useState(0);

  return (
    <div>
      <Head>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charSet="utf-8"
        ></script>
      </Head>
      <div className="max-w-[1400px] xxl:max-w-[2000px] mx-auto px-[3%] my-10 ">
        <div className="w-full rounded-full  p-[2px] bg-transparent ">
          <div className="rounded-3xl w-full h-full m-auto bg-transparent ">
            <div className="w-full h-full rounded-3xl bg-transparent overflow-hidden ">
              {/* <div className="flex justify-end">
                <Link href={"/"}>
                  <Image src={Backbotton} width={40} height={29} alt="" />
                </Link>
              </div> */}
              <div className="flex lg:flex-row-reverse sm:flex-col justify-between items-stretch">
                <div className="p1 h-fit max-w-[600px] llg:min-w-[550px] mx-auto lg:mx-0 p-[1px] mt-2 lg:w-[37%] lg:mr-[4%] lg:min-w-[380px] bg-gradient-to-t from-[var(--dwtwo)] to-[var(--dwdark)]  rounded-3xl  w-[94%] ">
                  <div className="w-full h-full rounded-3xl p2bg  p-2 md:p-9">
                    <div className="flex lg:flex-col llg:flex-row justify-between items-start">
                      {/* Top title */}
                      <div className="toptile text-3xl font-semibold flex items-center">
                        <div
                          onClick={() => _get_followers()}
                          className="w-[85px] md:w-[120px]"
                        >
                          <Image
                            className="rounded-3xl h-[85px] md:h-[120px] border-[3px] border-[var(--dwselect)] dark:border-gray-800"
                            src={data && data.project_image}
                            width={150}
                            height={220}
                            alt=""
                          />
                        </div>
                        <div className="mx-3 flex flex-col items-start justify-start">
                          <div className="rating">
                            <div className="flex items-center text-base md:text-2xl">
                              <div className="mr-1 text-yellow-400">
                                <AiFillStar />
                              </div>
                              <div className="mr-1 text-yellow-400">
                                <AiFillStar />
                              </div>
                              <div className="mr-1 text-yellow-400">
                                <AiFillStar />
                              </div>
                              <div className="mr-1 text-yellow-400">
                                <AiFillStar />
                              </div>
                              <div className="mxr-1 text-yellow-400/25">
                                <AiFillStar />
                              </div>
                            </div>
                          </div>
                          <div
                            // onClick={() => eth_point()}
                            className="mt-4 text-xl font-semibold hidden md:block"
                          >
                            {data && data.name}
                          </div>
                        </div>
                      </div>
                      {/* btns */}
                      <div>
                        {discord_counts && (
                          <div
                            // href={`${data && data.discord_url}`}
                            // target="_blank"
                            className="discord font-semibold border-[1.9px] border-[var(--dwtwo)] dark:border-gray-800 lg:mt-5 xl:mt-0 rounded-xl cursor-pointer px-4 py-2 text-sm hover:scale-105 transition-all flex items-center"
                          >
                            <div className="text-2xl text-fuchsia-500 mr-2">
                              <FaDiscord />
                            </div>
                            <div className="mr-2">{discord_counts}</div>
                          </div>
                        )}
                        {followers && (
                          <div
                            // href={`${data && data.twitter_url}`}
                            // target="_blank"
                            className="twitter font-semibold border-[1.9px] border-[var(--dwtwo)] dark:border-gray-800 rounded-xl cursor-pointer px-4 py-2 text-sm mt-3 hover:scale-105 transition-all flex items-center"
                          >
                            <div className="text-2xl text-fuchsia-500 mr-2">
                              <FaTwitter />
                            </div>
                            <div>{followers}</div>
                          </div>
                        )}
                      </div>
                      {/* btns */}
                    </div>
                    {/* Top title */}
                    <div className="mt-2">
                      <span className="text-lg text-[#FB923C] dark:text-gray-500">
                        Twitter Handle:{" "}
                      </span>
                      <span className="text-lg">
                        {data.name && <>@{data.name}</>}
                      </span>
                    </div>
                    {/* text */}
                    <div className="text-lg mt-3 min-h-[150px] ">
                      <span className="text-[#FB923C] dark:text-gray-500">
                        Description:{" "}
                      </span>
                      <span>{data && data.discription}</span>
                    </div>
                    {/* text */}
                    {/* rating */}
                    {is_didnt_rate && (
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-xl font-normal items-center  mb-1">
                          Add Your Rating:
                        </div>
                        <div className="flex justify-center items-center">
                          <Rating
                            name="simple-controlled"
                            value={ratingvalue}
                            onChange={(event, newValue) => {
                              rating(newValue);
                              setratingvalue(newValue);
                            }}
                            // color="white"
                            // className="bg-white"
                            size="large"
                          />
                          <div className="mx-2 text-xl ">
                            ({ratingvalue || 0})
                          </div>
                          {/* <AiFillStar className="mx-2 text-yellow-400 text-3xl" />
                           */}
                        </div>
                      </div>
                    )}
                    {/* <div className="w-[80%] mx-auto my-4 text-black text-base text-center py-2 rounded-full cursor-pointer bg-gradient-to-t from-[#FFA800] to-[#FFDAA4] hover:scale-105 transition-all">
                    Write a review
                  </div> */}
                    {/* btn */}
                    <div className="flex w-full justify-center">
                      {!live && winner && !data.native_coin && (
                        <div className="winner dark:shadow-none dark:bg-gradient-to-t dark:from-gray-200 dark:to-gray-200 dark:border dark:border-gray-800 text-base flex itmes-center mt-6 px-6 lg:px-2 llg:px-6 fontquick py-[10px] rounded-xl">
                          Winner: {winner.slice(0, 5)}...
                          {winner.slice(winner.length - 4, winner.length)}(
                          {data && data.network == "ETH" ? (
                            data.native_coin ? (
                              <div>{data.eth_amount} ETH</div>
                            ) : data.nft ? (
                              <Link
                                // href={`https://opensea.io/assets/ethereum/${data.nft_address}/${data.token_id}`}
                                href={`https://testnets.opensea.io/assets/goerli/${data.nft_address}/${data.token_id}`}
                                target={"_blank"}
                              >
                                {data.nft_name}/NFT
                              </Link>
                            ) : (
                              <div
                              // href={`https://opensea.io/assets/ethereum/${data.nft_address}/${data.token_id}`}
                              //  href={`https://testnets.opensea.io/assets/goerli/${data.nft_address}/${data.token_id}`}
                              //  target={"_blank"}
                              >
                                {data.token_amount} {data.token_name}
                                /TOKEN
                              </div>
                            )
                          ) : data.network == "solana" && data.native_coin ? (
                            <div>{data.amount} SOL</div>
                          ) : data.nft ? (
                            <Link
                              href={`https://magiceden.io/item-details/${data.token_address}`}
                              target={"_blank"}
                            >
                              {data.nft_name.length > 0 ? data.nft_name : "NFT"}
                            </Link>
                          ) : (
                            <div
                              href={`https://solscan.io/address//${data.token_address}`}
                              target={"_blank"}
                            >
                              {data.amount} {data.token_name}
                            </div>
                          )}
                          )
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p2 lg:w-[67%] sm:w-full">
                  <div className="w-full h-full p-3">
                    <div className="w-full lg:w-fit relative mx-auto lg:ml-[5%] rounded-xl overflow-hidden">
                      <div className="w-full max-w-[600px] mx-auto h-full bgTweet  px-2 md:px-10 pt-4 pb-5 rounded-xl overflow-hidden">
                        <div className="justify-end hidden">
                          <span className="text-4xl -mb-2 text-[#2596be]">
                            <FaTwitter />
                          </span>
                        </div>
                        <div className="py-2 text-center text-lg  font-semibold">
                          Tweet Preview
                        </div>
                        {/* Image Twitter */}
                        <div className="block dark:hidden rounded-xl">
                          <blockquote
                            className="twitter-tweet w-[250px] md:w-[550px] rounded-xl"
                            data-lang="en"
                            data-theme="dark"
                            // style={{ width: "100%", height: 300 }}
                          >
                            <a
                              className="grid place-items-center w-full min-h-[310px]"
                              href={`https://twitter.com/twitter/status/${data.twitter_id}`}
                            >
                              <span className="block dark:hidden">
                                {/* <Skelaton /> */}
                                <RingLoader color="#ffa048" />
                              </span>
                              <span className="dark:block hidden">
                                {/* <Skelaton /> */}
                                <RingLoader color="#222" />
                              </span>
                            </a>
                          </blockquote>
                        </div>
                        <div className="hidden dark:block">
                          <blockquote
                            className="twitter-tweet w-[250px] md:w-[550px] bg-gray-200"
                            data-lang="en"
                            data-theme="light"
                            // style={{ width: "100%", height: 300 }}
                          >
                            <a
                              className="grid place-items-center w-full min-h-[310px]"
                              href={`https://twitter.com/twitter/status/${data.twitter_id}`}
                            >
                              <span className="block dark:hidden">
                                {/* <Skelaton /> */}
                                <RingLoader color="#ffa048" />
                              </span>
                              <span className="dark:block hidden">
                                {/* <Skelaton /> */}
                                <RingLoader color="#222" />
                              </span>
                            </a>
                          </blockquote>
                        </div>
                        {/* counter */}
                        <div className="mx-auto max-w-[584px]">
                          <div className="lg:text-xl sm:text-sm text-center md:text-base justify-center md:justify-start  sm:mx-1 md:mx-4   pb-2 my-2 flex items-center">
                            <div className="mr-1 text-white/50 dark:text-black/50">
                              Time Remaining:
                            </div>
                            <div className="mx-1 -mb-1 font-semibold text-[#FFA800]">
                              <CountdownTimer
                                countdownTimestampMs={data.postAt}
                                finish={2}
                              />
                              {/* <>
                                  <Skeleton
                                    variant="rectangular"
                                    sx={{ bgcolor: "grey.900" }}
                                    animation="pulse"
                                    width={125}
                                    height={20}
                                    className="rounded-full"
                                  />
                                </> */}
                            </div>
                            <div className="mx-1">
                              <HourglassEmptyIcon className="text-[var(--dwtwo)] dark:text-gray-800 -mt-[2px]" />
                            </div>
                          </div>
                        </div>
                        <div className="linos1"></div>
                        {/* counter */}
                        {/* Image */}
                        <div className="mt-5 mx-auto max-w-[584px] px-10 lg:px-4 flex md:flex-row sm:flex-col justify-between items-center">
                          <div className="flex justify-start items-center -mt-1">
                            {/* follow */}
                            {method ? (
                              (method == 3 || method == 4) && (
                                <Link
                                href="https://twitter.com/"
                                target="_blank"
                                  // onClick={() => !is_follow && follow()}
                                  className={`${btns} ${
                                    is_follow
                                      ? "text-[#0094FF]"
                                      : "text-white/40"
                                  }`}
                                >
                                  <BsTwitter />
                                </Link>
                              )
                            ) : (
                              <span></span>
                            )}
                            {/* like */}
                            <Link
                            href="https://twitter.com/"
                            target="_blank"
                              // onClick={() => !is_like && like()}
                              className={`${btns} ${
                                is_like ? "text-[#F91881]" : " text-white/40"
                              }`}
                            >
                              <AiFillHeart />
                            </Link>
                            {/* retweet */}
                            <Link
                              href="https://twitter.com/"
                              target="_blank"
                              // onClick={() => !is_retweet && retweet()}
                              className={`${btns} ${
                                is_retweet ? "text-[#00FF85]" : "text-white/40"
                              }`}
                            >
                              <div className="rotate-90">
                                <AiOutlineRetweet />
                              </div>
                            </Link>
                            {/* replay */}
                            <Link
                            href="https://twitter.com/"
                            target="_blank"
                              // onClick={() => !is_replay && Tweet()}
                              className={`${btns} ${
                                is_replay ? "text-[#2CCCFF]" : "text-white/40"
                              }`}
                            >
                              <BsFillChatFill />
                            </Link>
                            {method ? (
                              method >= 2 &&
                              method <= 3 && (
                                <Link
                                  href={`${data && data.discord_url}`}
                                  target="_blank"
                                  // onClick={() =>!is_replay && Tweet()}
                                  className={`${btns} ${
                                    is_discord
                                      ? "text-[#5460E6]"
                                      : "text-white/40"
                                  }`}
                                >
                                  <FaDiscord />
                                </Link>
                              )
                            ) : (
                              <span></span>
                            )}
                          </div>
                          <div className="flex justify-between items-center md:mt-0 sm:mt-2">
                            {!participate && !is_replay && (
                              <div className="inpu bg-gradient-to-t  mr-2 md:mr-5  from-[var(--dwtop)] dark:from-gray-200 dark:to-gray-200 focus:bg-[var(--darktwo)] sm:w-full md:w-[55%] min-w-[220px] p-[2px] text-sm to-[#1D1F24] rounded-lg">
                                <input
                                  type="text"
                                  placeholder="Comment"
                                  className="py-[7px] w-full rounded-lg text-white/50 dark:text-gray-800 transition-all px-4 outline-none text-sm bg-[var(--dwdarktwo)] dark:bg-gray-200 dark:border dark:border-gray-800"
                                  onChange={(e) => setreplay(e.target.value)}
                                />
                              </div>
                            )}
                            <span
                              onClick={() => {
                                if (
                                  !participate &&
                                  data.live &&
                                  !disable == true
                                ) {
                                  check();
                                }
                                // setdori(true);
                                handleRotateClick();
                              }}
                              // ref={snipRef}
                              style={snipStyle}
                              onTransitionEnd={handleTransitionEnd}
                              className={` text-white/50 text-2xl cursor-pointer w-9 mr-2 lgg:w-10 2xl:w-11 h-9 lgg:h-10 2xl:h-11 rounded-full bg-cusEL-200/60 hover:bg-cusEL-200 flex justify-center items-center`}
                            >
                              <BiRefresh />
                            </span>
                          </div>
                          {/* {
                      !participate && !is_replay && (
                        <div className="inpu bg-gradient-to-t sm:mt-2 md:mt-0 from-[var(--dwtop)] focus:bg-[var(--darktwo)] sm:w-full md:w-[55%] p-[2px] text-sm to-[#1D1F24] rounded-lg">
                          <input
                            type="text"
                            placeholder="Comment"
                            className="py-[7px] w-full rounded-lg text-white/50 transition-all px-4 outline-none text-sm bg-[var(--dwdarktwo)]"
                            onChange={(e) => setreplay(e.target.value)}
                          />
                        </div>
                      )
                      } */}
                        </div>
                        <div className="linos1 mt-5"></div>
                        <div className="mt-5 w-full md:p-3">
                          <div className="bgTweet2 border-[2px] border-solid border-[#724C2D] rounded-lg">
                            <div className="w-full text-white/80 sm:py-[12px] md:py-2 px-4 h-full    ">
                              <div className="w-full flex justify-between items-center font-semibold">
                                <div className="text-sm">Requirement:</div>
                                <div className="cursor-pointer sm:pl-2 md:pl-0 font-normal text-[var(--dwtwo)] dark:text-gray-800 text-[10px] md:text-sm ">
                                  {/* {console.log(typeof(data.bundle))} */}
                                  {data && data.bundle}
                                </div>
                              </div>
                            </div>
                            <div className="linos2"></div>
                            <div className="w-full text-white/80 sm:py-[12px] md:py-2 px-4 h-full  ">
                              <div className="w-full flex justify-between items-center font-semibold">
                                <div className="text-sm">Rewards:</div>
                                <div className="cursor-pointer font-normal text-[var(--dwtwo)] dark:text-gray-800 text-[10px] md:text-sm">
                                  {data && data.network == "ETH" ? (
                                    data.native_coin ? (
                                      <div>{data.eth_amount} ETH</div>
                                    ) : data.nft ? (
                                      <Link
                                        // href={`https://opensea.io/assets/ethereum/${data.nft_address}/${data.token_id}`}
                                        href={`https://testnets.opensea.io/assets/goerli/${data.nft_address}/${data.token_id}`}
                                        target={"_blank"}
                                      >
                                        {data.nft_name}/NFT
                                      </Link>
                                    ) : (
                                      <div
                                      // href={`https://opensea.io/assets/ethereum/${data.nft_address}/${data.token_id}`}
                                      //  href={`https://testnets.opensea.io/assets/goerli/${data.nft_address}/${data.token_id}`}
                                      //  target={"_blank"}
                                      >
                                        {data.token_amount} {data.token_name}
                                        /TOKEN
                                      </div>
                                    )
                                  ) : data.network == "solana" &&
                                    data.native_coin ? (
                                    <div>{data.amount} SOL</div>
                                  ) : data.nft ? (
                                    <Link
                                      href={`https://magiceden.io/item-details/${data.token_address}`}
                                      target={"_blank"}
                                    >
                                      {data.nft_name.length > 0
                                        ? data.nft_name
                                        : "NFT"}
                                    </Link>
                                  ) : (
                                    <Link
                                      href={`https://solscan.io/address//${data.token_address}`}
                                      target={"_blank"}
                                    >
                                      {data.amount} {data.token_name}
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="linos2"></div>
                            {data.native_coin ? (
                              <div className="sm:py-[12px] md:py-2 px-4 h-full text-white/80  ">
                                <div className="w-full flex justify-between items-center ">
                                  <div className="text-xs font-semibold">
                                    Claim :
                                  </div>
                                  <div className="text-[var(--dwtwo)]  text-[10px] md:text-sm">
                                    {AnchorWallet && claimers}/{data.claimers}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <Accordion className="w-full font-semibold h-full bg-transparent text-white/80  ">
                                <AccordionSummary
                                  className="w-full flex justify-between"
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                >
                                  <div className="w-full flex justify-between items-center ">
                                    <div className="font-semibold text-sm md:text-base">
                                      Participated :
                                    </div>
                                    <div className="flex items-center">
                                      {participated_user && (
                                        <div className="mr-2 text-[var(--dwtwo)]  text-[16px]">
                                          ( {participated_user.length || 0} )
                                        </div>
                                      )}
                                      <GroupsIcon className="text-3xl text-[var(--dwtwo)] " />
                                    </div>
                                  </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <div className="max-h-[320px] overflow-x-hidden overflow-y-scroll">
                                    <table className="w-full text-sm text-left text-gray-500 ">
                                      <thead className="text-xs text-gray-600 uppercase ">
                                        <tr>
                                          <th scope="col" className="px-6 py-3">
                                            Name
                                          </th>
                                          <th scope="col" className="px-6 py-3">
                                            Adresses
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody className="">
                                        {participated_user &&
                                          participated_user.map((users, i) => (
                                            <tr
                                              key={i}
                                              className=" border-b border-white/30 "
                                            >
                                              <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-xs text-gray-100/80 dark:text-gray-600 whitespace-nowrap "
                                              >
                                                {users.name.length > 8
                                                  ? users.name.slice(0, 8) +
                                                    "..."
                                                  : users.name}
                                              </th>
                                              <td className="px-6 py-4 text-xs">
                                                {users.address.slice(0, 33) +
                                                  "..." +
                                                  users.address.slice(
                                                    users.address.length - 4,
                                                    users.address.length
                                                  )}
                                              </td>
                                            </tr>
                                          ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </AccordionDetails>
                              </Accordion>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="mt-4 mb-8">
                    {live && !participate && (
                      <div
                        onClick={() => live && !participate && enter_raffle()}
                        className="px-4 py-2 btnnn bg-[#383946] border border-[#FFDAA4]/50 text-base text-white/40 cursor-pointer hover:scale-105 transition-all w-fit mx-auto rounded-lg"
                      >
                        Enter raffle
                      </div>
                    )}
                  </div> */}
                </div>
              </div>
            </div>
            <div className="py-5">
              {live && is_aligible && !participate && (
                <div
                  // onClick={() => live && !participate && enter_raffle()}
                  className="w-fit px-12 mx-auto text-black text-base text-center py-2 rounded-full cursor-pointer bg-gradient-to-t from-[#FFA800] to-[#FFDAA4] hover:scale-105 transition-all"
                >
                  Claim
                </div>
              )}
              {in_raffle && twitter_session && loading && (
                <div className="w-fit px-12 mx-auto text-black text-base text-center py-2 rounded-full cursor-pointer bg-gradient-to-t from-[#FFA800] to-[#FFDAA4] dark:from-gray-200 dark:to-gray-200 dark:border dark:border-gray-800 hover:scale-105 transition-all">
                  You Already Claim!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
