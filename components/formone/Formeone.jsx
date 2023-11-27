import Switch from "@mui/material/Switch";
import { web3 } from "@project-serum/anchor";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { useWeb3React } from "@web3-react/core";
import { Alchemy, Network } from "alchemy-sdk";
import { useSession } from "next-auth/client";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { MdHelp, MdOutlineArrowBackIosNew } from "react-icons/md";
import { toast } from "react-toastify";
import backk from "../../public/backk.png";
import dworfzlogo from "../../public/dworfzlogo.png";
import ethicon from "../../public/ethlogo.png";
import aptosicon from "../../public/polygon.png";
import soll from "../../public/solanalogo.png";
import uploadimage from "../../public/UPLOADD.png";
import { submit_eth } from "../instraction/ETH/submit";
import { submit } from "../instraction/solana/submit";
import { nftContext } from "../utils/nft";
import { Wait_approve } from "./wait_approve";
export default function Formeone() {
  const AnchorWallet = useAnchorWallet();
  const wallet = useWallet();
  const session = useSession();
  const router = useRouter();

  const connection = new web3.Connection(
    "https://lingering-hardworking-knowledge.solana-mainnet.discover.quiknode.pro/4906da7da32f9fa2de8d4de83aec225ae0197e58/"
  );
  // const connection = new web3.Csdvzsvonnection(web3.clusterApiUrl("devnet"));
  const { active, account, library: provider } = useWeb3React();

  const onifunc = () => {
    if (firstinput === true) {
      setFirstinput(false);
      setSecondinput(true);
      settherdinput(false);
    }
  };

  const [firstinput, setFirstinput] = useState(false);
  const [secondinput, setSecondinput] = useState(true);
  const [therdinputt, settherdinput] = useState(false);
  const [showoptionsinput1, setshowoptionsinput1] = useState(false);
  const [showoptionsinput2, setshowoptionsinput2] = useState(false);
  const [showoptionsinput3, setshowoptionsinput3] = useState(false);
  const [showoptionsinput4, setshowoptionsinput4] = useState(false);
  const [resource, setResource] = useState([]);
  const [sol_balance, setSolBalance] = useState();
  const [native_coin, setNativeCoin] = useState();
  const [twitter_id, setTwitterId] = useState();
  const [name, setName] = useState();
  const [discord_constact, setDiscordContact] = useState();
  const [discord_url, setDiscordURL] = useState();
  const [twitter_url, setTwitterURL] = useState();
  const [discription, setDiscription] = useState();
  const [nft, setnft] = useState("Select");
  const [token, setToken] = useState("Select");
  const [bundle, setBundle] = useState("Select");
  const [selection, setSelection] = useState();
  const [featured, setFeatured] = useState(false);
  const [tweet_image, setTweetImage] = useState();
  const [project_image, setProjectImage] = useState();
  const [server_id, setServerId] = useState();
  const [amount, setAmount] = useState();
  const [claim, setClaim] = useState();
  const [disable, setdesable] = useState();
  const [refresh, setrefresh] = useState(false);
  const [chain, setchain] = useState("solana");
  const [showamount, setshowamount] = useState(false);
  const [eth_nft, setEthNft] = useState();
  const [eth_token, setEthToken] = useState();
  const [is_nft, setIsNft] = useState();
  const [eth_balance, setEthBalance] = useState();
  const [reward_bundle, setRewardBundle] = useState("Select");

  const [token_name, setTokenName] = useState();
  const [upload_data, setUploadData] = useState();
  const [pfp_network, setPfpNetwork] = useState();

  const [upload_image, setUploadImage] = useState(false);
  const [upload_tweet, setUploadtweet] = useState(false);

  const nfts = useContext(nftContext);

  useEffect(() => {
    setResource(nfts);
  }, [nfts]);

  const contract_address = "0xAa444f823C3cEFcd3776fDC53f95ebbE7a6039B0";

  async function get_resource() {
    if (!AnchorWallet) return;
    // const [tokens, is_holder] = await findTokenAccounts(
    //   connection,
    //   AnchorWallet.publicKey,
    //   false
    // );
    // if (tokens.length > 0) {
    //   setResource(tokens);
    // }
    const balance = await connection.getBalance(AnchorWallet.publicKey, {
      commitment: "finalized",
    });
    setSolBalance(balance / 1000000000);
  }

  // fmcqaqmg
  // const fmcqaqmg = ""

  useEffect(() => {
    // setResource([]);
    setEthNft([]);
    setSelection();
    setSolBalance(0);
    // runApp()
    if (showoptionsinput1 === true) {
      setshowoptionsinput2(false);
      setshowoptionsinput3(false);
    } else if (showoptionsinput2 === true) {
      setshowoptionsinput1(false);
      setshowoptionsinput3(false);
    } else if (showoptionsinput3 === true) {
      setshowoptionsinput1(false);
      setshowoptionsinput2(false);
    }
    if (token != "Select") return setshowamount(true);
  }, []);

  // SOL
  useEffect(() => {
    setFirstinput(false);
    setSecondinput(true);
    setSelection();
    setSolBalance(0);
    setnft("Select");
    setToken("Select");
    setRewardBundle("Select");
    // setResource([]);
    if (AnchorWallet) {
      // get_applys("solana", AnchorWallet.publicKey.toBase58());
      get_resource();
    }
  }, [AnchorWallet]);

  // ETH
  useEffect(() => {
    setFirstinput(false);
    setSecondinput(true);
    setEthBalance();
    setSelection();
    setnft("Select");
    setToken("Select");
    setEthNft([]);
    if (active) {
      // get_applys("ETH", account);
      get_eth_nft();
    }
  }, [active, account]);

  // // get the application user if already exist?
  // async function get_applys(chain, address) {
  //   try {
  //     const result = await fetch(
  //       `api/database/apply?database=waiting_tweet&collection=${chain}&address=${address}`
  //     );
  //     const json = await result.json();
  //     if (json) {
  //       settherdinput(true);
  //       setFirstinput(false);
  //       setSecondinput(false);
  //     }
  //     // else {
  //     //   settherdinput(false);
  //     //   setFirstinput(true);
  //     //   setSecondinput(false);
  //     // }
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  // solana functions!
  async function apply() {
    if (!AnchorWallet) return;
    if (
      !twitter_id ||
      !name ||
      !project_image ||
      // !discord_url ||
      !twitter_url ||
      (token == "Select" && nft == "Select") ||
      bundle == "Select" ||
      !discription ||
      !chain ||
      !amount ||
      (token == "solana" && !claim)
    )
      return notify_warning("Complete the Requirements first!");

    if (
      bundle == "follow like comment retweet join discord" ||
      bundle == "like comment retweet join discord"
    ) {
      if (!discord_constact || !discord_url || !server_id) {
        return notify_warning("Complete the Requirements first!");
      }
    }
    let affilate = false;
    let affiliat_address = null;

    try {
      // https:ragnarok.dworfz/apply?user=address
      // console.log('router.query ===========>', router);
      // console.log('router.query.user ===========>', router.query.user);
      // if (router.query.user) {
      //   affiliat_address = new web3.PublicKey(router.query.user);
      //   // console.log('affiliat_address ===========>', affiliat_address);
      //   if (!web3.PublicKey.isOnCurve(affiliat_address)) {
      //     return notify_error("Invalid solana address in the affiliate link");
      //   }
      //   affilate = true;
      // }
      affilate = true;
    } catch (e) {
      return notify_error("Invalid solana address in the affiliate link");
    }

    // need notification for twitter connection
    if (!session) {
      return notify_warning("connect your twitter first!");
    }

    // console.log('session ==> ', session);

    let mint;
    let programable_config = null;
    if (selection != null && resource) {
      mint = resource[selection].mintAddress;
      programable_config = resource[selection].programmableConfig;
    } else {
      mint = null;
    }
    let handle_name;
    if (name.slice(0, 1) == "@") {
      handle_name = name.slice(1, name.length);
    } else {
      handle_name = name;
    }
    let abbaothor_mint;
    let holder = false;
    // check if there is
    if (resource && resource.length > 0) {
      resource.map((nft_res) => {
        if (
          nft_res.creators &&
          nft_res.creators[0] &&
          nft_res.creators[0].address &&
          nft_res.creators[0].address.toBase58() ==
            "7Pz5yfA3iQqQik39azMcw1ND9vBUF54MCNb4yBPTkTAD" //address?????
        ) {
          holder = true;
          abbaothor_mint = nft_res.mintAddress.toBase58();
        }
      });
    }

    setrefresh(true);
    setdesable(true);
    notify_laoding("transaction pending...");


    // console.log("+++++++++++++++++++++++")
    try {
      await submit(
        AnchorWallet,
        twitter_id,
        handle_name,
        discord_constact,
        discord_url,
        twitter_url,
        chain,
        mint,
        bundle,
        discription,
        featured,
        amount,
        native_coin,
        wallet,
        connection,
        token,
        server_id,
        nft, 
        project_image,
        holder,
        abbaothor_mint,
        affilate,
        affiliat_address,
        claim,
        programable_config
      );
      // console.log('================ S T A R T ==================>')

      // // console.log('AnchorWallet = =========>  ',AnchorWallet.publicKey.toBase58(),)
      //   // console.log('twitter_id = =========>  ',twitter_id,)
      //   // console.log('handle_name = =========>  ',handle_name,)
      //   // console.log('discord_constact = =========>  ',discord_constact,)
      //   // console.log('discord_url = =========>  ',discord_url,)
      //   // console.log('twitter_url = =========>  ',twitter_url,)
      //   // console.log('chain = =========>  ',chain,)
      //   // console.log('mint = =========>  ',mint,)
      //   // console.log('bundle = =========>  ', bundle,)
      //   // console.log('discription = =========>  ',discription,)
      //   // console.log('featured = =========>  ',featured,)
      //   // console.log('amoun = =========>  ',amount,)
      //   // console.log('native_coin = =========>  ',native_coin,)
      //   // console.log('wallet = =========>  ',wallet.publicKey.toBase58(),)
      //   // console.log('connection = =========>  ',connection,)
      //   // console.log('token = =========>  ',token,)
      //   // console.log('server_id = =========>  ',server_id,)
      //   // console.log('nft = =========>  ', nft, )
      //   // console.log('project_image = =========>  ',project_image,)
      //   // console.log('holder = =========>  ',holder,)
      //   // console.log('abbaothor_mint = =========>  ',abbaothor_mint,)
      //   // console.log('affilate = =========>  ',affilate,)
      //   // console.log('affiliat_address = =========>  ',affiliat_address,)
      //   // console.log('claim = =========>  ',claim,)
      //   // console.log('programable_config = =========>  ',programable_config)

      // console.log('================ E N D ==================>')
      notify_delete();
      notify_success("transaction successful");
      reload_data();
      setFirstinput(false);
      setSecondinput(false);
      settherdinput(true);
    } catch (e) {
      // console.log(e);
      notify_delete();
      setrefresh(false);
      setdesable(false);
      notify_error("transaction failed");
    }
  }

  async function apply_eth() {
    // console.log('apply_eth =================> ');
    if (!active) return;
    if (
      !twitter_id ||
      !name ||
      !project_image ||
      // !discord_url ||
      !twitter_url ||
      (token == "Select" && nft == "Select") ||
      bundle == "Select" ||
      !discription ||
      !chain ||
      !amount
    )
      return notify_warning("Complete the requirement first!");

    if (
      bundle == "follow like comment retweet join discord" ||
      bundle == "like comment retweet join discord"
    ) {
      if (!discord_constact || !discord_url || !server_id) {
        return notify_warning("Complete the requirement first!");
      }
    }

    if (amount == 0) {
      return notify_warning("the amount cannot be zero!");
    }
    setrefresh(true);
    setdesable(true);
    notify_laoding("transaction pending...");
    let handle_name;
    if (name.slice(0, 1) == "@") {
      handle_name = name.slice(1, name.length);
    } else {
      handle_name = name;
    }

    try {
      let token_id = 0;
      let token_address;
      if (token == "ETH") {
        token_address = contract_address;
      } else if (is_nft) {
        token_address = eth_nft[selection].contract.address;
        token_id = eth_nft[selection].tokenId;
      } else if (!is_nft) {
        token_address = eth_token[selection].address;
      }
      const signer = provider.getSigner();
      await submit_eth(
        account,
        signer,
        contract_address,
        token_id,
        twitter_id,
        handle_name,
        discord_constact,
        discord_url,
        twitter_url,
        chain,
        bundle,
        discription,
        featured,
        amount,
        token_address,
        token,
        is_nft,
        server_id,
        nft,
        project_image
      );
      notify_delete();
      notify_success("transaction successful");
      reload_data();
      setFirstinput(false);
      setSecondinput(false);
      settherdinput(true);
    } catch (e) {
      // console.log(e);
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
  const notify_warning = (msg) => {
    toast.warning(msg, {
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

  async function get_eth_nft() {
    if (!active) return;

    const eth_balance = await provider.getBalance(account);
    setEthBalance(eth_balance / 1000000000000000000);
    const config = {
      apiKey: "ckVz3bXw9o3VCG9-SFuv5rOk7YPaMkhx",
      // network: Network.ETH_MAINNET,
      network: Network.ETH_GOERLI,
    };
    const alchemy = new Alchemy(config);
    const nfts = await alchemy.nft.getNftsForOwner(account);
    setEthNft(nfts.ownedNfts);

    const tokens = [];
    const balances = await alchemy.core.getTokenBalances(account);

    // Remove tokens with zero balance
    const nonZeroBalances = balances.tokenBalances.filter((token) => {
      return token.tokenBalance !== "0";
    });
    // Counter for SNo of final output
    let i = 0;

    // Loop through all tokens with non-zero balance
    for (let token of nonZeroBalances) {
      // Get balance of token
      let balance = token.tokenBalance;

      // Get metadata of token
      const metadata = await alchemy.core.getTokenMetadata(
        token.contractAddress
      );

      // Compute token balance in human-readable format
      balance = balance / Math.pow(10, metadata.decimals);
      balance = balance.toFixed(2);

      // Print name, balance, and symbol of token
      if (balance != 0) {
        tokens.push({
          id: i,
          address: token.contractAddress,
          balance: balance,
          name: metadata.name,
          symbol: metadata.symbol,
        });
        i++;
      }
    }

    setEthToken(tokens);
  }

  const [file, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // handlde images
  const handlePfpImage = async (e) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = async () => {
        const response = await fetch(`/api/cloudinary`, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: reader.result,
        });

        const jd = await response.json();
        setProjectImage(jd.secure_url);
        setUploadImage(true);
      };
    } catch (e) {
      setUploadImage(false);
      notify_error("your image is more than 1MIB");
    }
  };

  const handleTwitterImage = async (e) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = async () => {
        const response = await fetch(`/api/cloudinary`, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: reader.result,
        });
        const jd = await response.json();
        setTweetImage(jd.secure_url);
        setUploadtweet(true);
      };
    } catch (e) {
      setUploadtweet(false);
    }
  };

  const [showwalletpic, setShowwalletpic] = useState(false);
  const [selectwalletpic, setselectwalletpic] = useState();

  const safe_number = (value) => {
    if (isNaN(value)) {
      setAmount("");
      return;
    }

    if (value < 0) {
      setAmount("");
      return;
    }
    setAmount(value);
  };

  const safe_url_discord = (value) => {
    if (value.includes("https://discord.gg/")) {
      setDiscordURL(value);
    } else {
      setDiscordURL("");
    }
  };
  const safe_url_twitter = (value) => {
    if (value.includes("https://twitter.com/")) {
      setTwitterURL(value);
    } else {
      setTwitterURL("");
    }
  };
  // Number of winners :
  const [wins, setWins] = useState(1);
  return (
    <div>
      <div className="mx-4 mt-10 ">
        <div className="flex items-center justify-around w-full sm:flex-col lg:flex-row ">
          <div className="from sm:w-[99%] md:w-[600px] my-10 h-fit  bordergradient rounded-[34px] p-[2px]">
            <div className="bg-[#141414] rounded-[34px]">
              <div className="bg-[#141414]  w-full h-full rounded-[34px] pb-8 ">
                {!secondinput && (
                  <div className="h-[10px]">
                    {firstinput && (
                      <div className="flex justify-end">
                        <div className={`cursor-pointer`} onClick={onifunc}>
                          <Image
                            // className={`${secondinput && "hidden"}`}
                            src={backk}
                            width={66}
                            height={40}
                            alt=""
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className=" formhead pt-6  rounded-t-[34px]">
                  <div className="relative flex flex-row items-center mx-auto w-fit">
                    <div className="logo md:relative">
                      <Image
                        src={dworfzlogo}
                        width={80}
                        height={100}
                        alt=""
                        className="mx-2"
                      />
                    </div>
                    <p className="text text-xs leading-7  sm:mx-auto md:mx-0  md:w-[60%] sm:mt-5 md:mt-0 sm:text-center md:text-start">
                      Join the official{" "}
                      <span className="text-[var(--dwtop)]">Dworfz</span>.
                      discord to get further information, support and updates on
                      your projects application.
                    </p>
                  </div>
                  <div className="py-2 text-center ">
                    <div className="text-xl textinput ">
                      Input your information
                    </div>
                  </div>
                </div>

                {/* <div className="w-[95%] mt-2 mx-auto borderdashad h-1"></div> */}
                {firstinput && (
                  <>
                    <div className="mt-4 w-[95%] mx-auto">
                      <div className="flex flex-wrap justify-center w-full">
                        {/* <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
                      <p>
                        <input type="file" name="file" />
                      </p>
                        <p>
                          <button>Upload Files</button>
                        </p>
                      </form> */}

                        <div className=" group text-[#F1F8FD] relative">
                          <div className="flex w-[280px] md:w-[314px] justify-end mx-auto ">
                            <div className="relative">
                              <MdHelp className="text-[#aeb6bb] " />
                              <span className="p-2 w-[110px] text-white text-center rounded-lg absolute -top-[40px] -right-[30px] md:right-[50%] md:translate-x-[50%] bg-gray-800 text-sm scale-0 group-hover:scale-100 duration-300 delay-200 md:origin-bottom  origin-bottom-right ">
                                upload
                              </span>
                            </div>
                          </div>
                        </div>
                        <form
                          // onSubmit={submitForm}
                          className="flex flex-wrap items-center justify-center col-sm-6 offset-3 signup_form"
                          encType="multipart/form-data"
                        >
                          {
                            <div
                              className={`${
                                !project_image ? "uploadbtn" : "bg-green-700"
                              } sm:w-[280px] lg:w-fit relative active:scale-105 overflow-hidden mx-3 my-2  rounded-2xl transition-all flex items-center justify-center  font-semibold px-1 cursor-pointer py-[5px] h-fit text-center text-sm  `}
                            >
                              <div className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer form-outline">
                                <input
                                  onChange={handlePfpImage}
                                  type="file"
                                  id="formupload"
                                  name="image"
                                  className="form-control cursor-pointer py-2 uploadbtn h-fit  mx-4 px-3 w-[260px] rounded-xl text-white "
                                  multiple
                                />
                              </div>
                              <div className="mx-1">
                                Upload Feature Image(less than 800KB)
                              </div>
                              <div>
                                <Image
                                  src={
                                    project_image ? project_image : uploadimage
                                  }
                                  width={37}
                                  height={20}
                                  alt=""
                                  className={`${
                                    project_image && "rounded-full"
                                  }`}
                                />
                              </div>
                            </div>
                          }
                        </form>
                      </div>
                      <div className="my-4 tweetsid">
                        <div className="flex px-2 text-[#FFA115]/60 items-center justify-between">
                          <div className="text-white">Tweets ID:</div>
                          <div className="relative testoscon">
                            <div className="absolute w-[240px] bottom-[108%] -right-0 testos">
                              <img
                                className="rounded"
                                width={400}
                                height={100}
                                src={
                                  "https://media.discordapp.net/attachments/1060970855519244310/1083209945090097263/firstprev1.png?width=921&height=96"
                                }
                                alt=""
                              />
                            </div>
                            <MdHelp className="text-[#aeb6bb]" />
                          </div>
                        </div>
                        <div className="mt-1 input">
                          <input
                            value={twitter_id}
                            type="text"
                            placeholder="1234567890"
                            className="px-5 w-full text-sm rounded-xl outline-none border focus:scale-y-105 transition-all text-black py-2 border-[#D1D1D1] focus:border-red-600"
                            onChange={(e) => {
                              setTwitterId(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-x-2 sm:grid-cols-1">
                        <div className="my-4 tweetsid">
                          <div className="flex px-2 text-[#FFA115]/60 items-center justify-between">
                            <div className="text-white">Twitter Handle:</div>
                            <div className="relative testoscon">
                              <div className="absolute w-[120px] bottom-[108%] -right-0 testos">
                                <img
                                  className="rounded"
                                  width={150}
                                  height={100}
                                  src={
                                    "https://cdn.discordapp.com/attachments/1060970855519244310/1083216757776470076/firstprev6.png"
                                  }
                                  alt=""
                                />
                              </div>
                              <MdHelp className="text-[#aeb6bb]" />
                            </div>
                          </div>
                          <div className="mt-1 input">
                            <input
                              value={name}
                              type="text"
                              placeholder="Dworfz"
                              className="px-5 w-full text-sm rounded-xl outline-none border focus:scale-y-105 transition-all text-black py-2 border-[#D1D1D1] focus:border-red-600"
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        {(bundle ==
                          "follow like comment retweet join discord" ||
                          bundle == "like comment retweet join discord") && (
                          <div className="my-4 tweetsid">
                            <div className="flex px-2 text-[#FFA115]/60 items-center justify-between">
                              <div className="text-white">Server ID:</div>
                              <div className="relative testoscon">
                                <div className="absolute w-[100px] bottom-[108%] -right-0 testos">
                                  <img
                                    className="rounded"
                                    width={100}
                                    height={100}
                                    src={
                                      "https://media.discordapp.net/attachments/1060970855519244310/1083209943936675993/firstprev3.png?width=167&height=108"
                                    }
                                    alt=""
                                  />
                                </div>
                                <MdHelp className="text-[#aeb6bb]" />
                              </div>
                            </div>
                            <div className="mt-1 input">
                              <input
                                value={server_id}
                                type="text"
                                placeholder="123456789"
                                className="px-5 w-full text-sm rounded-xl outline-none border focus:scale-y-105 transition-all text-black py-2 border-[#D1D1D1] focus:border-red-600"
                                onChange={(e) => {
                                  setServerId(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        )}
                        {(bundle ==
                          "follow like comment retweet join discord" ||
                          bundle == "like comment retweet join discord") && (
                          <div className="my-4 tweetsid">
                            <div className="flex px-2 text-[#FFA115]/60 items-center justify-between">
                              <div className="text-white">Discord Contact:</div>
                              <div className="relative testoscon">
                                <div className="absolute w-[150px] bottom-[108%] -right-0 testos">
                                  <img
                                    className="rounded"
                                    width={150}
                                    height={100}
                                    src={
                                      "https://media.discordapp.net/attachments/1060970855519244310/1083209944314150952/firstprev4.png?width=293&height=74"
                                    }
                                    alt=""
                                  />
                                </div>
                                <MdHelp className="text-[#aeb6bb]" />
                              </div>
                            </div>
                            <div className="mt-1 input ">
                              <input
                                value={discord_constact}
                                type="text"
                                placeholder="Dworfz#0000"
                                className="px-5 w-full text-sm rounded-xl outline-none border focus:scale-y-105 transition-all text-black py-2 border-[#D1D1D1] focus:border-red-600"
                                onChange={(e) => {
                                  setDiscordContact(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        )}
                        {(bundle ==
                          "follow like comment retweet join discord" ||
                          bundle == "like comment retweet join discord") && (
                          <div className="my-4 tweetsid">
                            <div className="flex px-2 text-[#FFA115]/60 items-center justify-between">
                              <div className="text-white">
                                Discord invite link:
                              </div>
                              <div className="relative testoscon">
                                <div className="absolute w-[210px] bottom-[108%] -right-0 testos">
                                  <img
                                    className="rounded"
                                    width={210}
                                    height={100}
                                    src={
                                      "https://media.discordapp.net/attachments/1060970855519244310/1083209944733593661/firstprev5.png?width=385&height=48"
                                    }
                                    alt=""
                                  />
                                </div>
                                <MdHelp className="text-[#aeb6bb]" />
                              </div>
                            </div>
                            <div className="mt-1 input">
                              <input
                                value={discord_url}
                                type="text"
                                placeholder="https://discord.gg/Dworfz"
                                className="px-5 w-full text-sm rounded-xl outline-none border focus:scale-y-105 transition-all py-2 text-black border-[#D1D1D1] focus:border-red-600"
                                onChange={(e) => {
                                  safe_url_discord(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="my-4 tweetsid">
                        <div className="flex px-2 text-[#FFA115]/60 items-center justify-between">
                          <div className="text-white">Twitter Url:</div>
                          <div className="relative testoscon">
                            <div className="absolute w-[150px] bottom-[100%] -right-0 testos">
                              <img
                                className="rounded"
                                width={400}
                                height={100}
                                src={
                                  "https://media.discordapp.net/attachments/1060970855519244310/1083209943500472322/firstprev2.png?width=202&height=33"
                                }
                                alt=""
                              />
                            </div>
                            <MdHelp className="text-[#aeb6bb]" />
                          </div>
                        </div>
                        <div className="mt-1 input ">
                          <input
                            value={twitter_url}
                            type="text"
                            placeholder="https://twitter.com/Dworfz"
                            className="px-5 w-full text-sm rounded-xl outline-none border focus:scale-y-105 transition-all py-2 text-black border-[#D1D1D1] focus:border-red-600"
                            onChange={(e) => {
                              safe_url_twitter(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-[95%] mt-2 mx-auto borderdashad h-1"></div>
                    <div className="mt-10">
                      <div className="mx-auto w-fit">
                        <div
                          onClick={() => {
                            // !disable &&
                             chain == "solana"
                              ? apply()
                              : chain == "ETH" && apply_eth();
                          }}
                          className="px-16 py-2 transition-all rounded-full cursor-pointer active:scale-105 savee2 contt"
                        >
                          Send Application
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {secondinput && (
                  <>
                    <div className="w-full mx-auto mt-4">
                      <div className="mt-3 mx-auto w-[300px] md:ml-9 md:mx-2">
                        <div className="flex justify-center w-full md:justify-start">
                          <div className="mr-32 text-white">Networks:</div>
                          <div className=" group text-[#F1F8FD] relative">
                            <span className="p-3 w-[250px] text-white text-center rounded-lg absolute -top-[70px] -right-[30px] md:right-[50%] md:translate-x-[50%] bg-gray-800 text-sm scale-0 group-hover:scale-100 duration-300 delay-200 md:origin-bottom  origin-bottom-right ">
                              Solana is the only supposed network at the moment.
                            </span>
                            <MdHelp className="text-[#aeb6bb]" />
                          </div>
                        </div>
                        {/* choose a chain */}
                        <div className="flex justify-center mt-2 md:justify-start">
                          <div
                            onClick={() => {
                              setSelection(null);
                              setnft("Select");
                              setToken("Select");
                              setchain("solana");
                            }}
                            className={`py-4 px-5 rounded-lg  hover:scale-105 mr-3 hover:bg-[#FB923C] cursor-pointer transition-all ${
                              chain === "solana"
                                ? "scale-105 bg-[#FB923C] "
                                : "bg-white"
                            }`}
                          >
                            <Image src={soll} width={28} height={20} alt=" " />
                          </div>
                          <div
                              onClick={() => {
                                setSelection(null)
                                setnft("Select");
                                setToken("Select");
                                setchain("aptos")
                            }}
                            title="coming soon!"
                            className={`py-4 px-5 rounded-lg bg-white mr-3 cursor-not-allowed transition-all ${
                              chain === "aptos" && "scale-105 bg-[#FB923C] "
                            }`}
                          >
                            <Image
                              src={aptosicon}
                              width={28}
                              height={20}
                              alt=" "
                            />
                          </div>
                          <div
                            onClick={() => {
                              setSelection();
                              setnft("Select");
                              setToken("Select");
                              setchain("ETH");
                            }}
                            className={`py-4 px-5 rounded-lg cursor-not-allowed  transition-all ${
                              chain === "ETH"
                                ? "scale-105 bg-[#FB923C] "
                                : "bg-white"
                            }`}
                          >
                            <Image
                              src={ethicon}
                              width={28}
                              height={20}
                              alt=" "
                            />
                          </div>
                        </div>
                      </div>
                      <div className="w-[80%] ml-9">
                        <div className="flex items-center justify-between w-full md:flex-row sm:flex-col">
                          {/* <div className="relative my-4 tweetsid">
                          <div className="flex items-center justify-between px-2 ">
                            <div className="text-white">Select Token:</div>
                            <div className="group text-[#F1F8FD] relative">
                              <span className="p-3 text-white text-center rounded-lg absolute bg-gray-800 -top-[96px] -right-[30px] md:right-[50%] md:translate-x-[50%] w-80 scale-0 group-hover:scale-100 duration-300 delay-200 md:origin-bottom  origin-bottom-right ">
                                Solana tokens support decimals (2.1), Non-Solana
                                tokens have to be whole numbers (3).
                              </span>
                              <MdHelp className="text-[#aeb6bb]" />
                            </div>
                          </div>
                          <div className="relative z-10 mt-1 input">
                            <div
                              onClick={() =>
                                setshowoptionsinput1(!showoptionsinput1)
                              }
                              className="px-4 w-[210px] flex justify-between items-center cursor-pointer text-sm rounded-lg outline-none border focus:scale-y-105 transition-all py-2 border-[#D1D1D1] focus:border-red-600 bg-[#171717] text-white/60"
                            >
                              <div>{token}</div>
                              <div
                                className={`-rotate-90 ${
                                  showoptionsinput1 === true && "rotate-90"
                                }`}
                              >
                                <MdOutlineArrowBackIosNew />
                              </div>
                            </div>
                            {showoptionsinput1 && (
                              <div
                                className="absolute w-full mt-[36px] top-0 left-0 z-50 max-h-[200px] overflow-y-scroll"
                                id="selectT"
                              >
                                {chain == "solana"
                                  ? AnchorWallet && (
                                      <div
                                        className="my-1 px-4 text-xs bg-[var(--dwtop)] rounded-xl text-white cursor-pointer py-2"
                                        onClick={() => {
                                          setSelection(null);
                                          setToken("solana");
                                          setshowoptionsinput1(false);
                                          setnft("Select");
                                          setNativeCoin(true);
                                        }}
                                      >
                                        <div className="flex items-center">
                                          <div>
                                            <Image
                                              src={soll}
                                              width={17}
                                              height={30}
                                              alt=""
                                              className="mr-1"
                                            />
                                          </div>
                                          <span>Solana /</span>
                                          <span> {sol_balance}</span>
                                        </div>
                                      </div>
                                    )
                                  : chain == "ETH" && (
                                      <div
                                        className="my-1 px-4 text-xs bg-[var(--dwtop)] rounded-xl text-white cursor-pointer py-2"
                                        onClick={() => {
                                          setSelection(null);
                                          setToken("ETH");
                                          setshowoptionsinput1(false);
                                          setnft("Select");
                                          setNativeCoin(true);
                                          setIsNft(false);
                                        }}
                                      >
                                        <div className="flex items-center">
                                          <div>
                                            <Image
                                              src={ethicon}
                                              width={17}
                                              height={30}
                                              alt=""
                                              className="mr-1"
                                            />
                                          </div>
                                          <span>ETH</span>
                                          <span> / </span>
                                          <span>{eth_balance}</span>
                                        </div>
                                      </div>
                                    )}
                                {AnchorWallet && chain == "solana"
                                  ? resource &&
                                    resource.map(
                                      (token) =>
                                        token.amount > 1 &&
                                        token.name && 
                                        (
                                          <div
                                            className="my-1 px-4 text-sm bg-[var(--dwtwo)] rounded-xl text-white cursor-pointer py-2"
                                            onClick={() => {
                                              setSelection(token.id);
                                              setToken(token.name);
                                              setshowoptionsinput1(false);
                                              setnft("Select");
                                              setNativeCoin(false);
                                            }}
                                          >
                                            <div>
                                              <div>
                                                <Image
                                                  src={token.image}
                                                  width={17}
                                                  height={30}
                                                  alt=""
                                                  className="mr-1 rounded-full"
                                                />
                                              </div>
                                              <span>{token.name}</span>
                                            </div>
                                          </div>
                                        )
                                    )
                                  : chain == "ETH" &&
                                    eth_token &&
                                    eth_token.map((token) => (
                                      <div
                                        className="my-1 px-4 text-sm bg-[var(--dwtwo)] rounded-xl text-white cursor-pointer py-2"
                                        onClick={() => {
                                          setIsNft(false);
                                          setSelection(token.id);
                                          setToken(token.name);
                                          setshowoptionsinput1(false);
                                          setnft("Select");
                                          setNativeCoin(false);
                                        }}
                                      >
                                        <div className="flex items-center">
                                          <div className="mr-1">
                                            {token.symbol}
                                          </div>
                                          <span>{token.name}</span>
                                          <span> / </span>
                                          <span>{token.amount}</span>
                                        </div>
                                      </div>
                                    ))}
                              </div>
                            )}
                          </div>
                          <div
                            className={`absolute left-0 w-full tran ${
                              token != "Select" ? "top-[102%]" : "top-[50%]"
                            } `}
                          >
                            <input
                              type="text"
                              placeholder="Amount"
                              value={amount}
                              onChange={(e) => safe_number(e.target.value)}
                              className="w-full px-4 py-2 text-xs outline-none bg-white/80 rounded-xl"
                            />
                          </div>
                        </div> */}
                          <div className="w-full my-4 tweetsid sm:ml-0">
                            <div className="flex items-center justify-between w-full px-2">
                              <div className="text-white">Select NFT:</div>
                              <div className="group text-[#F1F8FD] relative">
                                <span className="p-3 text-white  text-center rounded-lg absolute bg-gray-800 -top-[125px] -right-[30px] md:right-[50%] md:translate-x-[50%] w-80 scale-0 group-hover:scale-100 duration-300 delay-200 md:origin-bottom  origin-bottom-right z-50 ">
                                  Use a wallet with less NFTs, Can only select
                                  one NFT as reward, Cannot reward Token and NFT
                                  together, have to select one reward.
                                </span>
                                <MdHelp className="text-[#aeb6bb]" />
                              </div>
                            </div>
                            <div className="w-full mt-1 input ">
                              <div
                                onClick={() =>
                                  setshowoptionsinput2(!showoptionsinput2)
                                }
                                className="px-4 w-full flex justify-between items-center cursor-pointer text-sm rounded-lg outline-none border focus:scale-y-105 transition-all py-2 h-[37px] border-[#D1D1D1] focus:border-red-600 bg-[#171717] text-white/60"
                              >
                                <div>
                                  {nft === "Select" ? (
                                    nft
                                  ) : (
                                    <div className="flex items-center text-xs">
                                      {token == "Select" && selection >= 0 && (
                                        <div>
                                          <Image
                                            src={
                                              chain == "solana"
                                                ? resource[selection].image
                                                : active &&
                                                  (eth_nft[
                                                    selection
                                                  ].rawMetadata.image.includes(
                                                    "ipfs://"
                                                  )
                                                    ? eth_nft[
                                                        selection
                                                      ].rawMetadata.image.replaceAll(
                                                        "ipfs://",
                                                        "https://nftstorage.link/ipfs/"
                                                      )
                                                    : eth_nft[selection]
                                                        .rawMetadata.image)
                                            }
                                            width={24}
                                            height={30}
                                            alt=""
                                            className="mr-1 rounded-full"
                                          />
                                        </div>
                                      )}
                                      <div className="text-xs">
                                        {nft.slice(0, 20)}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div
                                  className={`-rotate-90 ${
                                    showoptionsinput2 === true && "rotate-90"
                                  }`}
                                >
                                  <MdOutlineArrowBackIosNew />
                                </div>
                              </div>
                              {/*  */}
                              {/*  */}
                              {showoptionsinput2 && (
                                <div className="fixed  top-0 left-0 w-screen h-screen z-[200] backdrop-blur-sm grid place-items-center">
                                  <div
                                    className="absolute top-0 left-0 w-screen h-screen -z-10"
                                    onClick={() => setshowoptionsinput2(false)}
                                  ></div>
                                  <div className="md:w-[700px] sm:w-full h-[520px] rounded-xl bg-gradient-to-t from-[var(--dwtop)] to-[var(--dwtrakc)] p-[1.9px]">
                                    <div className="w-full bg-gradient-to-t from-[#222222] to-[#2B2B36] rounded-xl h-full">
                                      <div className="text-xl text-center">
                                        Select your nft
                                      </div>
                                      <div
                                        className="flex sm:justify-center md:justify-start px-3 flex-wrap overflow-y-scroll gap-2 h-[480px] mx-auto "
                                        id="my-scrollable-component"
                                      >
                                        {chain == "solana"
                                          ? resource &&
                                            resource.map((nft) => (
                                              // <div className="my-1 px-4 text-sm bg-[var(--dwtwo)] rounded-xl text-white cursor-pointer py-2"
                                              <div
                                                className="my-1 z-[500] text-center border border-white/60 rounded-xl w-[160px] h-fit text-sm text-white cursor-pointer "
                                                onClick={() => {
                                                  setRewardBundle("Select");
                                                  setAmount(1);
                                                  setSelection(nft.id);
                                                  setnft(nft.name);
                                                  setshowoptionsinput2(false);
                                                  setToken("Select");
                                                  setNativeCoin(false);
                                                }}
                                              >
                                                <div>
                                                  <Image
                                                    src={nft.image}
                                                    width={280}
                                                    height={180}
                                                    alt=""
                                                    className=" rounded-xl"
                                                  />
                                                </div>
                                                <div className="mt-1 font-semibold">
                                                  {nft.name}
                                                </div>
                                              </div>
                                            ))
                                          : active &&
                                            chain == "ETH" &&
                                            eth_nft &&
                                            eth_nft.map((nft, i) => (
                                              // <div className="my-1 px-4 text-sm bg-[var(--dwtwo)] rounded-xl text-white cursor-pointer py-2"
                                              <div
                                                className="my-1 z-[500] text-center border border-white/60 rounded-xl w-[160px] text-sm text-white cursor-pointer h-fit min-h-[200px]"
                                                onClick={() => {
                                                  setIsNft(true);
                                                  setAmount(1);
                                                  setSelection(i);
                                                  setnft(nft.title);
                                                  setshowoptionsinput2(false);
                                                  setToken("Select");
                                                  setNativeCoin(false);
                                                }}
                                              >
                                                <div>
                                                  <Image
                                                    src={
                                                      nft.rawMetadata.image.includes(
                                                        "ipfs://"
                                                      )
                                                        ? nft.rawMetadata.image.replaceAll(
                                                            "ipfs://",
                                                            "https://nftstorage.link/ipfs/"
                                                          )
                                                        : nft.rawMetadata.image
                                                    }
                                                    width={280}
                                                    height={30}
                                                    alt=""
                                                    className="rounded-xl"
                                                  />
                                                </div>
                                                <div className="mt-1 font-semibold">
                                                  {nft.title}
                                                </div>
                                              </div>
                                            ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-5">
                          <div className="z-0 flex items-center justify-between w-full md:flex-row sm:flex-col">
                            {/* hadii hya lwela */}

                            <div className="w-full my-4 tweetsid md:ml-0 sm:ml-0 md:w-auto ">
                              <div className="flex px-2 w-full md:w-[210px] items-center justify-between">
                                <div className="text-white">
                                  Select Reward Bundle:
                                </div>

                                <div className="group  text-[#F1F8FD] relative">
                                  <span className="p-3 text-white  text-center rounded-lg absolute w-[280px] -top-[65px] -right-[30px] md:right-[50%] md:translate-x-[50%] z-10 bg-gray-800 text-sm scale-0 group-hover:scale-100 duration-300 delay-200 md:origin-bottom  origin-bottom-right ">
                                    You can choose the reward that will be
                                    splited between Holder
                                  </span>
                                  <MdHelp className="text-[#aeb6bb]" />
                                </div>
                              </div>
                              <div className="w-full md:w-[210px]  ">
                                <div className="relative h-full mt-1 input ">
                                  <div
                                    onClick={() =>
                                      setshowoptionsinput4(!showoptionsinput4)
                                    }
                                    className="px-4 w-full flex justify-between  items-center cursor-pointer text-sm rounded-lg outline-none border focus:scale-y-105 transition-all py-2 border-[#D1D1D1] focus:border-red-600 bg-[#171717] text-white/60"
                                  >
                                    <div className="">{reward_bundle}</div>
                                    <div
                                      className={`-rotate-90 ${
                                        showoptionsinput4 === true &&
                                        "rotate-90"
                                      }`}
                                    >
                                      <MdOutlineArrowBackIosNew />
                                    </div>
                                  </div>
                                  {showoptionsinput4 && (
                                    <div className="absolute w-full top-[100%] mt-2  rounded-lg h-full bg-[#131313] left-0 z-50">
                                      <div
                                        className=" px-4 text-sm text-center bg-[#131313] rounded-t-lg hover:bg-[#313131]  text-white cursor-pointer py-3"
                                        onClick={() => {
                                          setToken("solana");
                                          setnft("Select");
                                          setNativeCoin(true);
                                          setClaim(100);
                                          setAmount(1);
                                          setRewardBundle(
                                            "1 SOL / 100 participated"
                                          );
                                          setshowoptionsinput4(false);
                                        }}
                                      >
                                        <div className="text-center">
                                          1 SOL / 100 participated
                                        </div>
                                      </div>
                                      <div
                                        className=" px-4 text-sm text-center bg-[#131313]  hover:bg-[#313131]  text-white cursor-pointer py-3"
                                        onClick={() => {
                                          setToken("solana");
                                          setnft("Select");
                                          setNativeCoin(true);
                                          setClaim(200);
                                          setAmount(2);
                                          setRewardBundle(
                                            "2 SOL / 200 participated"
                                          );
                                          setshowoptionsinput4(false);
                                        }}
                                      >
                                        <div className="text-center">
                                          2 SOL / 200 participated{" "}
                                        </div>
                                      </div>
                                      <div
                                        className="px-4 text-sm text-center bg-[#131313]  hover:bg-[#313131]  text-white cursor-pointer py-3"
                                        onClick={() => {
                                          setToken("solana");
                                          setnft("Select");
                                          setNativeCoin(true);
                                          setClaim(300);
                                          setAmount(3);
                                          setRewardBundle(
                                            "3 SOL / 300 participated"
                                          );
                                          setshowoptionsinput4(false);
                                        }}
                                      >
                                        <div className="text-center">
                                          3 SOL / 300 participated{" "}
                                        </div>
                                      </div>
                                      <div
                                        className="px-4 text-sm text-center bg-[#131313]   hover:bg-[#313131] rounded-b-lg text-white cursor-pointer py-3"
                                        onClick={() => {
                                          setToken("solana");
                                          setnft("Select");
                                          setNativeCoin(true);
                                          setClaim(400);
                                          setAmount(4);
                                          setRewardBundle(
                                            "4 SOL / 400 participated"
                                          );
                                          setshowoptionsinput4(false);
                                        }}
                                      >
                                        <div className="text-center">
                                          4 SOL / 400 participated{" "}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            {/* hadii hya tanya */}
                            <div className="w-full my-4 tweetsid md:ml-0 md:w-auto sm:ml-0 ">
                              <div className="flex px-2 w-full md:w-[210px] items-center justify-between">
                                <div className="text-white">Select Bundle:</div>

                                <div className="group  text-[#F1F8FD] relative">
                                  <span className="p-3 text-white  text-center rounded-lg absolute w-[280px] -top-[65px] -right-[30px] md:right-[50%] md:translate-x-[50%] z-10 bg-gray-800 text-sm scale-0 group-hover:scale-100 duration-300 delay-200 md:origin-bottom  origin-bottom-right ">
                                    Only free for Abbathor holders, bundle fee
                                    for non-holders.
                                  </span>
                                  <MdHelp className="text-[#aeb6bb]" />
                                </div>
                              </div>

                              <div className={`w-full md:w-[210px] h-[35px] `}>
                                <div className="relative h-full mt-1 input ">
                                  <div
                                    onClick={() =>
                                      setshowoptionsinput3(!showoptionsinput3)
                                    }
                                    className="px-2 w-full flex justify-between  items-center cursor-pointer text-sm rounded-lg outline-none border focus:scale-y-105 transition-all py-2 border-[#D1D1D1] focus:border-red-600 bg-[#171717] text-white/60"
                                  >
                                    <div className="">{bundle}</div>
                                    <div
                                      className={`-rotate-90 ${
                                        showoptionsinput3 === true &&
                                        "rotate-90"
                                      }`}
                                    >
                                      <MdOutlineArrowBackIosNew />
                                    </div>
                                  </div>
                                  {showoptionsinput3 && (
                                    <div className="absolute w-full top-[100%] mt-2  rounded-lg h-full bg-[#131313] left-0 z-50">
                                      <div
                                        className=" px-4 text-sm text-center bg-[#131313] rounded-t-lg hover:bg-[#313131]  text-white cursor-pointer py-3"
                                        onClick={() => {
                                          setBundle("Like comment retweet");
                                          setshowoptionsinput3(false);
                                        }}
                                      >
                                        Like/comment/retweet
                                        <div className="text-center">
                                          1 SOL
                                        </div>{" "}
                                      </div>
                                      <div
                                        className=" px-4 text-sm text-center bg-[#131313]  hover:bg-[#313131]  text-white cursor-pointer py-3"
                                        onClick={() => {
                                          setBundle(
                                            "Like comment retweet follow"
                                          );
                                          setshowoptionsinput3(false);
                                        }}
                                      >
                                        Like/comment/retweet/
                                        <br />
                                        follow
                                        <div className="text-center">
                                          1.25 SOL
                                        </div>{" "}
                                      </div>
                                      <div
                                        className="px-4 text-sm text-center bg-[#131313]  hover:bg-[#313131]  text-white cursor-pointer py-3"
                                        onClick={() => {
                                          setBundle(
                                            "like comment retweet join discord"
                                          );
                                          setshowoptionsinput3(false);
                                        }}
                                      >
                                        Like/comment/retweet/
                                        <br />
                                        discord
                                        <br />
                                        <div className="text-center">
                                          1.5 SOL
                                        </div>{" "}
                                      </div>
                                      <div
                                        className="px-4 text-sm text-center bg-[#131313]   hover:bg-[#313131] rounded-b-lg text-white cursor-pointer py-3"
                                        onClick={() => {
                                          setBundle(
                                            "follow like comment retweet join discord"
                                          );
                                          setshowoptionsinput3(false);
                                        }}
                                      >
                                        Like/comment/retweet/
                                        <br />
                                        discord/follow
                                        <div className="text-center">
                                          2 SOL
                                        </div>{" "}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            {/* hadii hya lii zdet ana */}
                            {/* <div className="my-4 tweetsid md:ml-4 sm:ml-0 ">
                          <div className="flex px-2 w-[210px] items-center justify-between">
                            <div className="text-white">Select Bundle:</div>

                            <div className="group text-[#F1F8FD] relative">
                              <span className="p-3 text-white  text-center rounded-lg absolute w-[280px] -top-[65px] -right-[30px] md:right-[50%] md:translate-x-[50%] z-10 bg-gray-800 text-sm scale-0 group-hover:scale-100 duration-300 delay-200 md:origin-bottom  origin-bottom-right ">
                                Only free for Abbathor holders, bundle fee for
                                non-holders.
                              </span>
                              <MdHelp className="text-[#aeb6bb]" />
                            </div>
                          </div>
                          <div className="relative mt-1 input ">
                            <div
                              onClick={() =>
                                setshowoptionsinput3(!showoptionsinput3)
                              }
                              className="px-4 w-[210px] flex justify-between items-center cursor-pointer text-sm rounded-lg outline-none border focus:scale-y-105 transition-all py-2 border-[#D1D1D1] focus:border-red-600 bg-[#171717] text-white/60"
                            >
                              <div className="">{bundle}</div>
                              <div
                                className={`-rotate-90 ${
                                  showoptionsinput3 === true && "rotate-90"
                                }`}
                              >
                                <MdOutlineArrowBackIosNew />
                              </div>
                            </div>
                            {showoptionsinput3 && (
                              <div className="absolute w-full top-[101%]  left-0 z-50">
                                <div
                                  className="my-1 px-4 text-sm bg-[var(--dwtop)] rounded-xl text-white cursor-pointer py-2"
                                  onClick={() => {
                                    setBundle("Like comment retweet");
                                    setshowoptionsinput3(false);
                                  }}
                                >
                                  Like/comment/retweet
                                  <div className="text-center">1 SOL</div>
                                </div>
                                <div
                                  className="my-1 px-4 text-sm bg-[var(--dwtop)] rounded-xl text-white cursor-pointer py-2"
                                  onClick={() => {
                                    setBundle("Like comment retweet follow");
                                    setshowoptionsinput3(false);
                                  }}
                                >
                                  Like/comment/retweet/
                                  <br />
                                  follow
                                  <div className="text-center">1.25 SOL</div>
                                </div>
                                <div
                                  className="my-1 px-4 text-sm bg-[var(--dwtop)] rounded-xl text-white cursor-pointer py-2"
                                  onClick={() => {
                                    setBundle(
                                      "like comment retweet join discord"
                                    );
                                    setshowoptionsinput3(false);
                                  }}
                                >
                                  like/comment/retweet/
                                  <br />
                                  discord
                                  <br />
                                  <div className="text-center">1.5 SOL</div>
                                </div>
                                <div
                                  className="my-1 px-3  text-sm bg-[var(--dwtop)] rounded-xl text-white cursor-pointer py-2"
                                  onClick={() => {
                                    setBundle(
                                      "follow like comment retweet join discord"
                                    );
                                    setshowoptionsinput3(false);
                                  }}
                                >
                                  like/comment/retweet/
                                  <br />
                                  discord/follow
                                  <div className="text-center">2 SOL</div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div> */}
                          </div>

                          <div className="mt-1">
                            <div
                              onClick={() => setFeatured(!featured)}
                              className="flex items-center justify-center text-center"
                            >
                              <Switch />{" "}
                              <div className="mx-1">
                                Featured Request (+1 SOL)
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* number of wins */}
                        {/* <div className="mx-5 my-4 ">
                        <div className="flex items-center mx-auto w-[260px] justify-between h-[20px">
                          <div className="text-white">Number of winners:</div>
                          <div className="flex items-center justify-center">
                            <div
                              onClick={() => setWins(wins - 1)}
                              className="mx-1 text-[#FFA115] text-2xl cursor-pointer"
                            >
                              <MdRemoveCircle />
                            </div>
                            <div className=" grid place-items-center w-[20px] rounded-full mx-2 text-white">
                              {wins}
                            </div>
                            <div
                              onClick={() => setWins(wins + 1)}
                              className=" mx-1 text-[#FFA115] text-2xl cursor-pointer"
                            >
                              <AiFillPlusCircle />
                            </div>
                          </div>
                        </div>
                      </div> */}
                        {/* number of wins */}
                        <div className="">
                          <div className="my-4 tweetsid">
                            <div className="flex px-2 text-[#F1F8FD] items-center justify-between">
                              <div className="text-white">
                                Description/Profile:
                              </div>

                              <div className="relative group">
                                <span className="p-3 text-white text-center rounded-lg absolute -top-[69px] -right-[30px] md:right-[50%] md:translate-x-[50%] w-[280px] bg-gray-800 text-sm scale-0 group-hover:scale-100 duration-300 delay-200 md:origin-bottom  origin-bottom-right ">
                                  Details about your content, tweet or
                                  community.
                                </span>
                                <MdHelp className="text-[#aeb6bb]" />
                              </div>
                            </div>
                            <div className="mt-1 input">
                              <textarea
                                value={discription}
                                type="text"
                                cols="50"
                                rows="3"
                                placeholder="Dworfz"
                                className="px-5 py-1 text-white/70 w-full text-sm rounded-lg outline-none border focus:scale-y-105 transition-all  border-[#D1D1D1] focus:border-red-600 bg-[#171717]"
                                onChange={(e) => {
                                  setDiscription(e.target.value);
                                }}
                              />
                            </div>
                            <div className="hidden mt-1">
                              <div className="flex items-center justify-end text-center">
                                <Switch />{" "}
                                <div className="mx-1">Use Twitter Profile</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mx-auto mt-4 w-fit">
                        <div
                          // onClick={() => {
                          //   !disable && chain == "solana"
                          //     ? apply()
                          //     : chain == "ETH" && apply_eth();
                          // }}
                          onClick={() => {
                            // twitter_id &&
                            //   name &&
                            //   discord_constact &&
                            //   discord_url &&
                            //   twitter_url &&
                            //   server_id &&
                            //   setSecondinput(false);
                            // twitter_id &&
                            //   name &&
                            //   discord_constact &&
                            //   discord_url &&
                            //   twitter_url &&
                            //   server_id &&
                            //   setFirstinput(true);
                            if (
                              (token == "Select" && nft == "Select") ||
                              bundle == "Select" ||
                              !discription ||
                              !chain ||
                              !amount
                            ) {
                              return;
                            }
                            setFirstinput(true);
                            setSecondinput(false);
                          }}
                          className={`text-lg px-20 py-2 bg-[#EFF6FA] text-[#141415] rounded-2xl savee2 cursor-pointer ${
                            disable && "cursor-not-allowed"
                          }`}
                        >
                          Continue
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {therdinputt && (
                  // <>
                  //   <div className="w-[80%] mx-auto mt-12 text-center">
                  //     <div className="text-4xl text-[#ADFF00]/90">
                  //       We have succsefuly sent your application.
                  //     </div>
                  //     <div className="flex justify-center w-full mt-6">
                  //       <Image
                  //         src={CircleWavyCheck}
                  //         width={80}
                  //         height={30}
                  //         alt=""
                  //       />
                  //     </div>
                  //     <div className="mt-8 text-xl">
                  //       Your project is currently under review, please check back
                  //       later.
                  //     </div>
                  //     <div className="mt-12">
                  //       <div className="w-[95%] mt-2 mx-auto borderdashad h-1"></div>
                  //     </div>
                  //     <div className="mx-auto mt-16 w-fit ">
                  //       <Link
                  //         href={"/"}
                  //         onClick={() => {
                  //           setSecondinput(false);
                  //           settherdinput(true);
                  //         }}
                  //         className="px-10 py-2 text-lg rounded-full cursor-pointer savee2"
                  //       >
                  //         Go back home
                  //       </Link>
                  //     </div>
                  //   </div>
                  // </>
                  <Wait_approve />
                )}
              </div>
            </div>
          </div>
          <div className="gif">
            <img
              src={
                "https://media.discordapp.net/attachments/1030474275662082098/1043147131185274961/red-crystal.gif"
              }
              width={400}
              height="auto"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* {!upload_tweet && (
                          <div className="uploadbtn sm:w-[280px] lg:w-fit relative active:scale-105 overflow-hidden mx-3 my-2  rounded-2xl transition-all flex items-center justify-center  font-semibold px-1 cursor-pointer py-[5px] h-fit text-center text-sm ">
                            <div className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer form-outline">
                              <input
                                onChange={handleTwitterImage}
                                type="file"
                                id="formupload"
                                name="image"
                                className="form-control cursor-pointer py-2 uploadbtn h-fit  mx-4 px-3 w-[260px] rounded-xl text-white "
                                multiple
                              />
                            </div>
                            <div className="mx-1">Choose Your tweet Image</div>
                            <div>
                              <Image
                                src={uploadimage}
                                width={37}
                                height={20}
                                alt=""
                              />
                            </div>
                          </div>
                        )} */
}
{
  /* <div
                          onClick={() => setShowwalletpic(true)}
                          className="uploadbtn  sm:w-[280px] lg:w-fit  active:scale-105 overflow-hidden mx-3 my-2  rounded-2xl transition-all flex items-center justify-center  font-semibold px-1 cursor-pointer py-[5px] h-fit text-center text-sm "
                        >
                          <div className="mx-1">
                            Choose Your PFP from your wallet
                          </div>
                          <div className="-ml-[6px]">
                            <Image
                              src={uploadimage}
                              width={37}
                              height={20}
                              alt=""
                            />
                          </div>
                        </div> */
}
{
  /* {showwalletpic && (
                          <div className="fixed top-0 left-0  w-screen h-screen z-[200] backdrop-blur-sm grid place-items-center">
                            <div
                              className="absolute w-screen h-screen -z-10"
                              onClick={() => setShowwalletpic(false)}
                            ></div>

                            <div className="md:w-[700px] sm:w-full h-[520px] rounded-xl bg-gradient-to-t from-[var(--dwtop)] to-[var(--dwtrakc)] p-[1.9px]">
                              <div className="w-full bg-gradient-to-t from-[#222222] to-[#2B2B36] rounded-xl h-full">
                                <div className="flex justify-center pt-2">
                                  <div
                                    onClick={() => {
                                      setPfpNetwork("ETH");
                                    }}
                                    className="text-base font-semibold text-center cursor-pointer px-5 py-1 border border-[var(--dwtwo)] rounded-full mx-4 hover:scale-105 transition-all h-fit w-fit "
                                  >
                                    ETH
                                  </div>
                                  <div
                                    onClick={() => {
                                      setPfpNetwork("solana");
                                    }}
                                    className="text-base font-semibold text-center cursor-pointer px-5 py-1 border border-[var(--dwtwo)] rounded-full mx-4 hover:scale-105 transition-all h-fit w-fit"
                                  >
                                    solana
                                  </div>
                                </div>
                                {pfp_network == "solana" ? (
                                  AnchorWallet ? (
                                    <div className="w-[97%] px-3 pt-2 sm:justify-center md:justify-start flex flex-wrap gap-2 h-[81%] overflow-y-scroll">
                                      {resource &&
                                        resource.map(
                                          (d, i) =>
                                            d.image && (
                                              <div
                                                className={`card w-[120px] h-[114px] overflow-hidden cursor-pointer rounded-xl transition-all ${
                                                  selectwalletpic === d.id &&
                                                  "border-2 border-[var(--dwtop)] transition-all"
                                                } `}
                                                key={d.id}
                                                onClick={() =>
                                                  setselectwalletpic(d.id)
                                                }
                                              >
                                                <Image
                                                  src={d.image}
                                                  width={200}
                                                  height={200}
                                                  alt=""
                                                />
                                              </div>
                                            )
                                        )}
                                    </div>
                                  ) : (
                                    <div className="text-center h-[81%]">
                                      connect your{" "}
                                      <span className="text-[var(--dwtwo)]">
                                        solana
                                      </span>{" "}
                                      wallet first
                                    </div>
                                  )
                                ) : pfp_network == "ETH" && active ? (
                                  <div className="w-[97%] px-3 pt-2 sm:justify-center md:justify-start flex flex-wrap gap-2 h-[81%] overflow-y-scroll">
                                    {eth_nft &&
                                      eth_nft.map((d, i) => (
                                        <div
                                          className={`card w-[120px] h-[114px] overflow-hidden cursor-pointer rounded-xl transition-all ${
                                            selectwalletpic === i &&
                                            "border-2 border-[var(--dwtop)] transition-all"
                                          } `}
                                          key={i}
                                          onClick={() => {
                                            setselectwalletpic(i),
                                          }}
                                        >
                                          <Image
                                            src={
                                              d.rawMetadata.image.includes(
                                                "ipfs://"
                                              )
                                                ? d.rawMetadata.image.replaceAll(
                                                    "ipfs://",
                                                    "https://nftstorage.link/ipfs/"
                                                  )
                                                : d.rawMetadata.image
                                            }
                                            width={200}
                                            height={200}
                                            alt=""
                                          />
                                        </div>
                                      ))}
                                  </div>
                                ) : (
                                  <div className="text-center h-[81%]">
                                    connect your{" "}
                                    <span className="text-[var(--dwtwo)]">
                                      ETH
                                    </span>{" "}
                                    wallet first
                                  </div>
                                )}
                                <div
                                  onClick={() => {
                                    if (selectwalletpic >= 0) {
                                      if (pfp_network == "solana") {
                                        setProjectImage(
                                          resource[selectwalletpic].imageUrl
                                        );
                                      } else if (pfp_network == "ETH") {
                                        setProjectImage(
                                          eth_nft[
                                            selectwalletpic
                                          ].rawMetadata.image.includes(
                                            "ipfs://"
                                          )
                                            ? eth_nft[
                                                selectwalletpic
                                              ].rawMetadata.image.replaceAll(
                                                "ipfs://",
                                                "https://nftstorage.link/ipfs/"
                                              )
                                            : eth_nft[selectwalletpic]
                                                .rawMetadata.image
                                        );

                                      }
                                    }
                                    setShowwalletpic(false);
                                  }}
                                  className="text-center border border-[var(--dwtop)] mt-2 rounded-full hover:scale-105 w-fit mx-auto px-4 py-2 cursor-pointer"
                                >
                                  Conferm
                                  
                                </div>
                              </div>
                            </div>
                          </div>
                        )} */
}
