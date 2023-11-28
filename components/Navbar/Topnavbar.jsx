import { Button, Drawer } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { web3 } from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import * as auth from "@supabase/auth-helpers-react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { Alchemy, Network } from "alchemy-sdk";
import { signIn, signOut, useSession } from "next-auth/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { BiArrowBack, BiLogInCircle, BiSearch } from "react-icons/bi";
import { BsUpload } from "react-icons/bs";
import { CiCircleRemove } from "react-icons/ci";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { MdArrowBackIos } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import wallet98 from "../../public/98wallet.png";
import aptimage1 from "../../public/aptimage1.png";
import aptimage2 from "../../public/aptimage2.png";
import aptimage3 from "../../public/aptimage3.png";
import aptimage4 from "../../public/aptimage4.png";
import aptimage5 from "../../public/aptimage5.png";
import backk from "../../public/backk.png";
import dwofrzlogo from "../../public/dwofrzlogo.png";
import editlogo from "../../public/editlogo.png";
import ethimage1 from "../../public/ethimage1.png";
import ethimage3 from "../../public/ethimage3.png";
import ethicon from "../../public/ethlogo.png";
import ledger from "../../public/ledger.png";
import Linee from "../../public/lining.png";
import nopfp from "../../public/nopfp.png";
import Phantomicon from "../../public/Phantom-wallet.png";
import aptoslogo from "../../public/polygon.png";
import Slop from "../../public/slop.png";
import solanaicon from "../../public/solanalogo.png";
import Solflarelogo from "../../public/Solflarelogo.png";
import Dbutton from "../../public/token2.png";
import linemenu from "../../public/wiw.png";
import { claim } from "../instraction/ETH/claim";
import { change_pfp_eth } from "../instraction/ETH/pfp";
import { change_pfp_sol } from "../instraction/solana/pfp";
import { useMetaplex } from "../MetaplexProvider/useMetaplex";
import {
  DworfzHolderContext,
  SetDworfzHolderContext
} from "../utils/dworfz_holder_context";
import { HolderContext, SetHolderContext } from "../utils/holder_context";
import {
  LoadingContext,
  SetLoadingContext
} from "../utils/holder_context_loading";
import { nftContext, SetnftContext } from "../utils/nft";
import { findTokenAccounts } from "../utils/utils";
import Leftnavbar from "./Leftnavbar";
import Profile from "./profile";
import { SetShowContext, ShowContext } from "./utils/navContext";

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new web3.PublicKey(
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
);

export default function Topnavbar() {
  const injected = new InjectedConnector();
  const walletconnect = new WalletConnectConnector({ rpc: { 1: "..." } });

  const connection_sol = new web3.Connection(
    "https://lingering-hardworking-knowledge.solana-mainnet.discover.quiknode.pro/4906da7da32f9fa2de8d4de83aec225ae0197e58/"
  );
  // const connection_sol = new dfvdfvdweb3.Connection(web3.clusterApiUrl("devnet"));

  const contract_address = "0xAa444f823C3cEFcd3776fDC53f95ebbE7a6039B0";

  const [wait_profile_loading, setWaitProfileLoading] = useState(true);

  const supabase = auth.useSupabaseClient();
  const supabase_session = auth.useSession();
  const [session] = useSession();
  const [points, setPoints] = useState(null);
  const [eth_balance, setEthBalance] = useState(null);
  const [sol_balance, setSolBalance] = useState(null);
  const [selection, setSelect] = useState();
  const [sol_nft, setSolNft] = useState();
  const [eth_nft, setEthNft] = useState();

  const [user_profile, setUserProfile] = useState(null);
  const [pfp_image, setPfpImage] = useState();

  // this the value that will show true or false
  const show = useContext(ShowContext);
  // this the function that will set the show value to either true or false
  const set_show = useContext(SetShowContext);
  // this for set the holder verification
  const setHolder = useContext(SetHolderContext);
  // this for the holder verification
  const holder = useContext(HolderContext);
  // set loading holder verification
  const setLoading = useContext(SetLoadingContext);
  // loading holder verification
  const loading = useContext(LoadingContext);
  // get the nfts of an wallet
  const setNFTs = useContext(SetnftContext);
  // the nfts of an wallet
  const nfts = useContext(nftContext);
  // dworfz holder
  const SetDworfzHolder = useContext(SetDworfzHolderContext);

  const { select, disconnect } = useWallet();
  const AnchorWallet = useAnchorWallet();
  const wallet_sol = useWallet();
  const {
    active,
    activate,
    deactivate,
    chainId,
    account,
    library: provider,
  } = useWeb3React();
  const { metaplex } = useMetaplex();

  async function connection(wallet) {
    if (typeof window.ethereum !== "undefined") {
      try {
        await activate(wallet);
      } catch (e) {}
    }
  }

  async function get_user_profile() {
    setLoadingProfile(true);
    try {
      if (AnchorWallet) {
        const resp = await fetch(
          `/api/database?database=user&collection=${AnchorWallet.publicKey.toBase58()}`
        );
        const resp_json = await resp.json();
        if (resp_json && resp_json.length > 0) {
          setUserProfile(resp_json);
        }
      } else if (active) {
        const resp = await fetch(
          `/api/database?database=user&collection=${account}`
        );
        const resp_json = await resp.json();
        if (resp_json && resp_json.length > 0) {
          setUserProfile(resp_json);
        }
      } else {
        setUserProfile(null);
      }
    } catch (e) {
    } finally {
      setLoadingProfile(false);
    }
  }

  async function change_pfp() {
    if (!session) {
      return notify_warning("connect your twitter!");
    }
    if (!supabase_session) {
      return notify_warning("connect your discord!");
    }

    notify_laoding("loading...");

    // logic for pfp
    try {
      if (AnchorWallet) {
        await change_pfp_sol(
          AnchorWallet.publicKey.toBase58(),
          pfp_image,
          wallet_sol,
          supabase_session.user.sub
        );
      } else if (active) {
        const signer = provider.getSigner(account);
        await change_pfp_eth(
          account,
          pfp_image,
          signer,
          supabase_session.user.sub
        );
      }
      let user_info;
      if (user_profile) {
        user_info = user_profile;
        user_info[0].pfp = pfp_image;
      } else {
        user_info = [
          {
            pfp: pfp_image,
          },
        ];
      }
      notify_delete();
      notify_success("you change your pfp successfully!");
      setUserProfile(user_info);
      setPfpImage();
    } catch (e) {
      notify_delete();
      notify_error("there is an error please try again later!");
    }
  }

  async function get_balance() {
    try {
      const mint = new web3.PublicKey(
        "PNTNyw5Yqb2Qf5jMV7jhfDMBaTDpxBKiyYS8uVzCCPH"
      );

      const [user_ata] = await web3.PublicKey.findProgramAddress(
        [
          AnchorWallet.publicKey.toBuffer(),
          TOKEN_PROGRAM_ID.toBuffer(),
          mint.toBuffer(),
        ],
        SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
      );

      const balance = await connection_sol.getBalance(user_ata);
      if (balance > 0) {
        const account_info = await connection_sol.getAccountInfo(user_ata);
        const offsetInBytes = 2 * 32;
        let amount = 0;
        for (let i = 0; i < 8; i++) {
          amount += account_info.data[offsetInBytes + i] * 2 ** (i * 8);
        }
        setDToken(amount / 1000);
      } else {
        setDToken(0);
      }
    } catch (e) {
      // console.log(e);
    }
  }

  const [d_token, setDToken] = useState(null);

  async function get_nfts() {
    try {
      if (!AnchorWallet) return;
      setLoading(true);
      const token = await metaplex
        .nfts()
        .findAllByOwner({ owner: metaplex.identity().publicKey });

      if (token.length > 0) {
        // setSolNft(token);
        // token.map((nft) => {
        //   if (nft.creators[0].address.toBase58() == "7Pz5yfA3iQqQik39azMcw1ND9vBUF54MCNb4yBPTkTAD") {
        //     setHolder(true);
        //     // SetDworfzHolder(true);
        //   }
        // })
        await Promise.all(
          token.map(async (nft, i) => {
            try {
              const response = await fetch(nft.uri, { method: "GET" });
              const data = await response.json();
              nft.image = data["image"];
              token[i].id = i;
              token[i].image = data["image"];
            } catch (e) {
              token[i].image =
                "https://st2.depositphotos.com/2586633/46477/v/600/depositphotos_464771766-stock-illustration-no-photo-or-blank-image.jpg";
            }
          })
        );
        setNFTs(token);
      } else {
        setNFTs(null);
      }
    } catch (e) {
      // console.log(e);
    } finally {
      setLoading(false);
    }
  }

  const [loading_image, setLoadingImage] = useState(false);
  // async function get_nfts_image(sol_nft) {
  //   try {
  //     if (nfts === null) {
  //       const arr = [];
  //       await Promise.all(
  //         sol_nft.map(async (nft) => {
  //           const response = await fetch(nft.uri, { method: 'GET' });
  //           const data = await response.json();
  //           nft.image = data["image"];
  //           arr.push(nft);
  //         })
  //       )
  //       setNFTs(arr)
  //       setLoadingImage(false);
  //     }
  //   } catch(e) {
  //   }
  // }

  async function get_resource() {
    // if (!AnchorWallet) return;
    // try {
    //   setLoading(true);
    //   const [tokens, is_holder] = await findTokenAccounts(
    //     connection_sol,
    //     AnchorWallet.publicKey,
    //     false
    //   );
    //   setHolder(is_holder);
    //   setLoading(false);
    //   if (tokens.length > 0) {
    //     setNFTs(tokens);
    //     setSolNft(tokens);
    //   }
    // } catch (e) {
    // } finally {
    //   setLoading(false);
    // }
  }

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
    if (nfts.ownedNfts) {
      setEthNft(nfts.ownedNfts);
    }
  }

  useEffect(() => {
    setWaitProfileLoading(true);
    const timere = setTimeout(() => {
      setWaitProfileLoading(false);
    }, 2000);
    const controller = new AbortController();
    const signal = controller.signal;
    setEthBalance(null);
    setDToken(null);
    setPoints(null);
    setNFTs(null);
    if (AnchorWallet) {
      get_balance();
      get_nfts();
      // get_resource();
      getsolbalance(signal);
    } else if (active) {
      get_eth_nft();
      get_points(signal);
    }
    get_user_profile();
    return () => {
      clearTimeout(timere),
        // cancel the request before component unmounts
        controller.abort();
    };
  }, [active, account, AnchorWallet]);

  async function getsolbalance() {
    const balance = await connection_sol.getBalance(AnchorWallet.publicKey);
    // console.log('AnchorWallet.publicKey  ===> ', AnchorWallet.publicKey.toBase58());
    setSolBalance((balance / 1000000000).toFixed(5));
  }

  async function get_points(signal) {
    try {
      const eth_balance = await provider.getBalance(account);
      setEthBalance((eth_balance / 1000000000000000000).toFixed(5));
      const points = await fetch(
        `/api/database?database=user&collection=${account}`,
        {
          signal: signal,
        }
      );
      const pointsJson = await points.json();
      if (pointsJson && pointsJson.length > 0) {
        setPoints(pointsJson[0].points);
      }
    } catch (e) {}
  }

  async function eth_point() {
    try {
      if (!active) {
        notify_warning("connect your ETH wallet!");
        return;
      }

      if (points == 0) {
        return;
      }
      notify_laoding("Loading...");
      const signer = provider.getSigner(account);
      if (points && points > 0) {
        await claim(contract_address, signer, account);
      }
      notify_delete();
      notify_success("you claim successfully!");
    } catch (e) {
      notify_delete();
      notify_error("there is an error please try again later!");
    }
  }

  const style1 =
    "bg-[#595959] dark:from-gray-200 dark:to-gray-200 rounded-full p-[2px]";
  const style2 =
    "w-full bg-gradient-to-t from-[#222222] to-[#2B2B36] rounded-xl";
  const style3 =
    "w-full bg-gradient-to-r from-[#ffaa0067] to-[#353535] rounded-full";
  const [showwallets, setshowwallet] = useState(false);
  const [showwallets1, setshowwallet1] = useState(true);
  const [solana, setsolana] = useState(false);
  const [eth, seteth] = useState(false);
  const [aptos, setaptos] = useState(false);
  const [ragnarok, setragnarok] = useState(false);
  const [profile, setprofile] = useState(false);
  const router = useRouter();
  const [projects, setprojects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const path = router.asPath;

  const handleSearch = async (e) => {
    try {
      const collection = e.currentTarget.value;
      setSearchTerm(e.currentTarget.value);

      if (collection.length > 2 || collection.length === 0) {
        const getFlutters = await fetch(`/api/database/tweets/${collection}`);
        const getFluttersJson = await getFlutters.json();
        setprojects(getFluttersJson);
      }
    } catch (e) {}
  };
  const [showmenu, setshowmenu] = useState(false);

  const [chosepfp, setchosepfp] = useState(false);
  const [pfp_network, setPfpNetwork] = useState();
  const [shownotification, setshownotification] = useState(false);

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

  // useEffect(() => {

  //   if (!session || !supabase_session) {
  //     setIsNeedUserProfile(true)
  //   } else {
  //     setIsNeedUserProfile(false)
  //   }

  // },[session,supabase_session])

  useEffect(() => {
    console.log('session in  profile setting ==> ', session);
  }, [session])

  const [loading_profile, setLoadingProfile] = useState();
  const light =
    "dark:border dark:border-gray-800 dark:from-gray-200 dark:to-gray-200 dark:text-gray-800 ";

  // console.log(' ========================== Navbar ========================= ');
  // console.log('Session : ', session);

  return (
    <>
      {/* <ToastContainer theme="dark" /> */}

      <header
        className={`w-full h-[70px] mmd:h-[80px] py-4 px-6 xsm:px-10 mmd:px-14 flex justify-between items-center sticky top-0 ${
          router.pathname === "/pandora/mint"
            ? ""
            : " bg-cusEL-100/80 backdrop-blur-xl"
        }`}
        style={{ zIndex: 99999 }}
      >
        {/* Search bar and Logo */}
        <div className="flex items-center justify-start flex-1 space-x-3 xsm:space-x-6">
          <div>
            <Link href={"/"}>
              <Image
                className="w-10 llg:w-[43px] h-auto"
                src={dwofrzlogo}
                width={55}
                height={50}
                alt=""
              />
            </Link>
          </div>

          <div className="relative w-full max-w-sm pr-1 lgg:max-w-lg xxl:max-w-2xl xsm:pr-5">
            <div
              className={`rounded-full overflow-hidden relative flex justify-start items-center ${
                router.pathname === "/pandora/mint"
                  ? "bg-[#232528]/30 backdrop-blur-lg"
                  : "bg-[#232528]"
              }`}
            >
              <BiSearch className="absolute top-[50%] translate-y-[-50%] text-lg xsm:text-xl left-3 xsm:left-4 text-white/50" />
              <input
                value={searchTerm}
                type="text"
                placeholder="Search..."
                className="bg-transparent pl-9 xsm:pl-11 mr-2 llg:pr-6 py-2.5 llg:py-3 text-xs ssm:text-sm xsm:text-base text-white outline-none w-full"
                onChange={(e) => handleSearch(e)}
              />
            </div>

            {searchTerm != 0 && projects.length != 0 && (
              <div className="absolute top-[105%] left-0 py-2 px-4 z-[200] text-base bg-cusEL-200 shadow-xl border border-white/10 w-full rounded-lg">
                <div className="px-1 mb-2 font-semibold">Resultes:</div>
                <div>
                  {projects.map((value, key) => {
                    return (
                      <div className="flex items-center">
                        <div className="mr-[5px]">
                          <Image
                            className="rounded-full"
                            src={value.project_image}
                            width={30}
                            height={30}
                            alt=""
                          />
                        </div>
                        <a
                          className=""
                          href={`/${value.name}/${value.twitter_id}`}
                        >
                          <p>{value.name}</p>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side Icons/Buttons */}
        <div className="flex items-center justify-end w-fit">
          <div className="items-center justify-end hidden mdd:flex">
            { AnchorWallet ? (AnchorWallet.publicKey.toBase58() == '5oxRC2qUZhVdMHiETJ7RrEbFnnuGa2XNVRhS3bGG1Ywg' 
              ? 
              <Link href = '/admin'>
                <Button className="px-0 mx-auto mr-3 customStylesButton2 llg:mr-4">
                {/* <div>
                  <Image
                    src={Dbutton}
                    width={23}
                    height={24}
                    alt=""
                    className="mr-1 w-5 llg:w-6 h-auto -mt-0.5"
                  />
                </div> */}
                <span className="-mt-0.5 px-4">
                  {/* {d_token ? d_token : 0} */}
                  Admin Page
                </span>
              </Button>
            </Link>
            : 
            <></>) : <></>
          }

            <Button
              onClick={() => {
                router.push("/apply");
              }}
              className="px-3 mx-auto mr-3 llg:px-4 customStylesButton2 lightOnHoverViolet llg:mr-4"
            >
              APPLY
            </Button>
            {!AnchorWallet && !active && (
              <Button
                onClick={() => {
                  AnchorWallet
                    ? disconnect()
                    : active
                    ? deactivate()
                    : setprofile(true);
                }}
                className="px-3 mx-auto llg:px-4 customStylesButton2 lightOnHoverViolet"
              >
                <div>
                  <BiLogInCircle className="text-2xl mr-1 -mt-0.5 w-5 h-auto" />
                </div>
                <span className="whitespace-nowrap">LOG IN</span>
              </Button>
            )}

            {(AnchorWallet || active) && (
              <div className="h-8 llg:h-10 rounded-full p-[1px] sm:hidden md:block bg-[#9796F0]"></div>
            )}

            <div>
              {(AnchorWallet || active) &&
                (!loading_profile ? (
                  <div className="w-[36px] llg:w-[40px] 2xl:w-[45px] h-[36px] llg:h-[40px] 2xl:h-[45px] rounded-full overflow-hidden border border-[var(--dwtwo)]  sm:mx-1 md:ml-2">
                    <Image
                      className="w-full h-full"
                      src={session ? session.user.picture : nopfp}
                      width={40}
                      height={20}
                      alt=""
                    />
                  </div>
                ) : (
                  <Skeleton
                    variant="circular"
                    sx={{ bgcolor: "grey.800" }}
                    animation="pulse"
                    width={40}
                    height={40}
                    className="ml-4 mr-3 rounded-full"
                  />
                ))}
            </div>

            {(AnchorWallet || active) &&
              (!loading_profile ? (
                <div className="relative ml-1 profile sm:mr-3 md:ml-4">
                  <div
                    className="flex items-center cursor-pointer text-xs md:text-lg max-w-[110px] max-w-auto"
                    onClick={() => setragnarok(!ragnarok)}
                  >
                    <div className=" sm:mr-0 md:mr-1 fontquickk">
                      {session ? (
                        session.user.name.length > 10 ? (
                          session.user.name.slice(0, 10) + "..."
                        ) : (
                          session.user.name
                        )
                      ) : supabase_session ? (
                        supabase_session.user.user_metadata.full_name.length >
                        10 ? (
                          supabase_session.user.user_metadata.full_name.slice(
                            0
                          ) + "..."
                        ) : (
                          supabase_session.user.user_metadata.full_name
                        )
                      ) : (
                        <>Ragnarok</>
                      )}
                    </div>
                    <div className="-mt-2 -rotate-90">
                      <MdArrowBackIos />
                    </div>
                  </div>

                  {ragnarok && (
                    <div className="absolute dark:text-white z-50 top-[140%] right-0 w-[300px] pb-4 border-2 border-[var(--dwtwo)] rounded-xl backdrop-blur-xl bg-black/60">
                      <div className="mx-4 mt-5 ">
                        <div className="flex items-end t">
                          <div>
                            <Image
                              className="rounded-full"
                              src={session ? session.user.picture : nopfp}
                              width={55}
                              height={20}
                              alt=""
                            />
                          </div>
                          <div className="ml-3">
                            <div>
                              {session ? (
                                session.user.name.length > 10 ? (
                                  session.user.name.slice(0, 10) + "..."
                                ) : (
                                  session.user.name
                                )
                              ) : supabase_session ? (
                                supabase_session.user.user_metadata.full_name
                                  .length > 10 ? (
                                  supabase_session.user.user_metadata.full_name.slice(
                                    0
                                  ) + "..."
                                ) : (
                                  supabase_session.user.user_metadata.full_name
                                )
                              ) : (
                                <>Ragnarok</>
                              )}
                            </div>
                            {AnchorWallet ? (
                              <div className="text-sm text-white/60">
                                {AnchorWallet.publicKey.toBase58().slice(0, 4)}
                                ...
                                {AnchorWallet.publicKey
                                  .toBase58()
                                  .slice(
                                    AnchorWallet.publicKey.toBase58().length -
                                      5,
                                    AnchorWallet.publicKey.toBase58().length
                                  )}
                              </div>
                            ) : (
                              active && (
                                <div className="text-sm text-white/60">
                                  {account.slice(0, 4)}...
                                  {account.slice(
                                    account.length - 4,
                                    account.length
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                        <div className="mx-4 mt-3 text-lg">Your Balance</div>
                        {AnchorWallet && (
                          <div className="mx-4 mt-3 fontquickk">
                            <div className="w-full my-2 rounded-full border-2 py-2 bg-black/70 font border-[var(--dwtwo)] flex justify-between px-4">
                              <div className="flex items-center">
                                <Image
                                  src={solanaicon}
                                  className="mr-1"
                                  width={26}
                                  height={32}
                                  alt=""
                                />{" "}
                                {sol_balance ? sol_balance : <></>} SOL
                              </div>
                              <div className="flex items-center cursor-pointer">
                                {/* Add{" "} */}
                                {/* <div className="rotate-180">
                                <MdArrowBackIos />
                              </div> */}
                              </div>
                            </div>
                          </div>
                        )}

                        {active && (
                          <div className="mx-4 mt-3 fontquickk">
                            <div className="w-full my-2 rounded-full border-2 py-2 bg-black/70 font border-[var(--dwtwo)] flex justify-between px-4">
                              <div className="flex items-center">
                                <Image
                                  src={ethicon}
                                  className="mr-1"
                                  width={26}
                                  height={32}
                                  alt=""
                                />{" "}
                                {eth_balance ? eth_balance : <></>} ETH
                              </div>
                              <div className="flex items-center cursor-pointer">
                                {/* Add{" "} */}
                                {/* <div className="rotate-180">
                                <MdArrowBackIos />
                              </div> */}
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="mx-4 mt-3 fontquickk">
                          <div className="w-full my-2 rounded-full border-2 py-2 text-white/50 bg-gray-700/80 font border-[var(--dwtop)] flex justify-between px-4">
                            <div className="flex items-center">
                              <Image
                                src={aptoslogo}
                                className="mr-1"
                                width={26}
                                height={32}
                                alt=""
                              />{" "}
                              MATIC
                            </div>
                            <div className="flex items-center text-sm">
                              coming soon!{" "}
                              {/* <div className="rotate-180">
                          <MdArrowBackIos />
                        </div> */}
                            </div>
                          </div>
                        </div>
                        <div className="mx-6 mt-4">
                          <div
                            onClick={() => {
                              setprofile(true);
                              setragnarok(false);
                            }}
                            className="w-full mb-2 text-center py-2 border-2 bg-black/70 cursor-pointer border-[var(--dwtwo)] rounded-xl"
                          >
                            Profile Setting
                          </div>
                          <div
                            onClick={() => {
                              router.push("/tracktweets");
                              setragnarok(false);
                            }}
                            className="w-full mb-2 text-center py-2 border-2 bg-black/70 cursor-pointer border-[var(--dwtwo)] rounded-xl"
                          >
                            Track My Tweets
                          </div>
                          <div
                            onClick={() => {
                              router.push("/entries");
                              setragnarok(false);
                            }}
                            className="w-full mb-2 text-center py-2 border-2 bg-black/70 cursor-pointer border-[var(--dwtwo)] rounded-xl"
                          >
                            Track My Entries
                          </div>
                          <div
                            onClick={() => {
                              AnchorWallet
                                ? disconnect()
                                : active
                                ? deactivate()
                                : setshowwallet(true);
                            }}
                            className="w-full my-2 text-center text-[#F00606] py-2 border-2 bg-black/70 cursor-pointer border-[var(--dwtwo)] rounded-xl"
                          >
                            Disconnect
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {chosepfp && (
                    <div className="fixed top-0 left-0 fontquickk w-screen h-screen z-[200] backdrop-blur-sm grid place-items-center">
                      <div
                        className="absolute w-screen h-screen -z-10"
                        onClick={() => setchosepfp(false)}
                      ></div>
                      <div className="md:w-[700px] sm:w-full h-[520px] rounded-xl bg-gradient-to-t from-[var(--dwtop)] to-[var(--dwtrakc)] p-[1.9px]">
                        <div className="w-full bg-gradient-to-t from-[#222222] to-[#2B2B36] rounded-xl h-full">
                          <div className="flex justify-center pt-2"></div>
                          {!loading ? (
                            AnchorWallet ? (
                              <div className="w-[97%] px-3 pt-2 sm:justify-center md:justify-start flex flex-wrap gap-2 h-[81%] overflow-y-scroll">
                                {nfts &&
                                  nfts.map(
                                    (d, i) =>
                                      d.image && (
                                        <div
                                          className={`card w-[120px] h-[114px] overflow-hidden cursor-pointer rounded-xl transition-all ${
                                            selection === d.id &&
                                            "border-2 border-[var(--dwtop)] transition-all"
                                          } `}
                                          key={i}
                                          onClick={() => setSelect(d.id)}
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
                            ) : active ? (
                              <div className="w-[97%] px-3 pt-2 sm:justify-center md:justify-start flex flex-wrap gap-2 h-[81%] overflow-y-scroll">
                                {eth_nft &&
                                  eth_nft.map((d, i) => (
                                    <div
                                      className={`card w-[120px] h-[114px] overflow-hidden cursor-pointer rounded-xl transition-all ${
                                        selection === i &&
                                        "border-2 border-[var(--dwtop)] transition-all"
                                      } `}
                                      key={i}
                                      onClick={() => {
                                        setSelect(i);
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
                                {/* <span className="text-[var(--dwtwo)]">ETH</span> */}
                                wallet first
                              </div>
                            )
                          ) : (
                            // need to loading animation here!
                            <div>loading</div>
                          )}
                          {!loading && (
                            <div className="flex items-center justify-center dark:text-white">
                              <div
                                onClick={() => {
                                  if (selection >= 0) {
                                    if (AnchorWallet) {
                                      setPfpImage(nfts[selection].image);
                                    } else if (active) {
                                      setPfpImage(
                                        eth_nft[
                                          selection
                                        ].rawMetadata.image.includes("ipfs://")
                                          ? eth_nft[
                                              selection
                                            ].rawMetadata.image.replaceAll(
                                              "ipfs://",
                                              "https://nftstorage.link/ipfs/"
                                            )
                                          : eth_nft[selection].rawMetadata.image
                                      );
                                    }
                                  }
                                  setchosepfp(false);
                                }}
                                className="text-center border border-[var(--dwtop)] mt-2 rounded-full hover:scale-105 w-fit px-4 mx-1 py-2 cursor-pointer"
                              >
                                Confirm
                              </div>
                              <div
                                onClick={() => {
                                  setchosepfp(false), setPfpImage();
                                }}
                                className="text-center border border-[var(--dwtop)] mt-2 rounded-full hover:scale-105 w-fit mx-1 px-4 py-2 cursor-pointer"
                              >
                                Cancel
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Skeleton
                  variant="rectangular"
                  sx={{ bgcolor: "grey.800" }}
                  animation="pulse"
                  width={45}
                  height={45}
                  className="ml-2 rounded-full"
                />
              ))}
          </div>

          {/* Sidebar for small Device */}
          <div className="flex items-center justify-center">
            <div>
              {(AnchorWallet || active) &&
                (!loading_profile ? (
                  <div className="relative ml-1 profile sm:mr-3 md:ml-4 mdd:hidden">
                    <div
                      className="flex items-center cursor-pointer text-xs md:text-lg max-w-[110px] max-w-auto"
                      onClick={() => setragnarok(!ragnarok)}
                    >
                      <div className=" sm:mr-0 md:mr-1 fontquickk">
                        {session ? (
                          session.user.name.length > 10 ? (
                            session.user.name.slice(0, 10) + "..."
                          ) : (
                            session.user.name
                          )
                        ) : supabase_session ? (
                          supabase_session.user.user_metadata.full_name.length >
                          10 ? (
                            supabase_session.user.user_metadata.full_name.slice(
                              0
                            ) + "..."
                          ) : (
                            supabase_session.user.user_metadata.full_name
                          )
                        ) : (
                          <>Ragnarok</>
                        )}
                      </div>
                      <div className="-mt-2 -rotate-90">
                        <MdArrowBackIos />
                      </div>
                    </div>

                    {ragnarok && (
                      <div className="absolute dark:text-white z-50 top-[140%] right-0 w-[300px] pb-4 border-2 border-[var(--dwtwo)] rounded-xl backdrop-blur-xl bg-black/60">
                        <div className="mx-4 mt-5 ">
                          <div className="flex items-end t">
                            <div>
                              <Image
                                className="rounded-full"
                                src={
                                  user_profile
                                    ? user_profile.length > 0
                                      ? user_profile[0].pfp
                                        ? user_profile[0].pfp
                                        : nopfp
                                      : nopfp
                                    : nopfp
                                }
                                width={55}
                                height={20}
                                alt=""
                              />
                            </div>
                            <div className="ml-3">
                              <div>
                                {session ? (
                                  session.user.name.length > 10 ? (
                                    session.user.name.slice(0, 10) + "..."
                                  ) : (
                                    session.user.name
                                  )
                                ) : supabase_session ? (
                                  supabase_session.user.user_metadata.full_name
                                    .length > 10 ? (
                                    supabase_session.user.user_metadata.full_name.slice(
                                      0
                                    ) + "..."
                                  ) : (
                                    supabase_session.user.user_metadata
                                      .full_name
                                  )
                                ) : (
                                  <>Ragnarok</>
                                )}
                              </div>
                              {AnchorWallet ? (
                                <div className="text-sm text-white/60">
                                  {AnchorWallet.publicKey
                                    .toBase58()
                                    .slice(0, 4)}
                                  ...
                                  {AnchorWallet.publicKey
                                    .toBase58()
                                    .slice(
                                      AnchorWallet.publicKey.toBase58().length -
                                        5,
                                      AnchorWallet.publicKey.toBase58().length
                                    )}
                                </div>
                              ) : (
                                active && (
                                  <div className="text-sm text-white/60">
                                    {account.slice(0, 4)}...
                                    {account.slice(
                                      account.length - 4,
                                      account.length
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                          <div className="mx-4 mt-3 text-lg">Your Balance</div>
                          {AnchorWallet && (
                            <div className="mx-4 mt-3 fontquickk">
                              <div className="w-full my-2 rounded-full border-2 py-2 bg-black/70 font border-[var(--dwtwo)] flex justify-between px-4">
                                <div className="flex items-center">
                                  <Image
                                    src={solanaicon}
                                    className="mr-1"
                                    width={26}
                                    height={32}
                                    alt=""
                                  />{" "}
                                  {sol_balance ? sol_balance : <></>} SOL
                                </div>
                                <div className="flex items-center cursor-pointer">
                                  {/* Add{" "} */}
                                  {/* <div className="rotate-180">
                                <MdArrowBackIos />
                              </div> */}
                                </div>
                              </div>
                            </div>
                          )}

                          {active && (
                            <div className="mx-4 mt-3 fontquickk">
                              <div className="w-full my-2 rounded-full border-2 py-2 bg-black/70 font border-[var(--dwtwo)] flex justify-between px-4">
                                <div className="flex items-center">
                                  <Image
                                    src={ethicon}
                                    className="mr-1"
                                    width={26}
                                    height={32}
                                    alt=""
                                  />{" "}
                                  {eth_balance ? eth_balance : <></>} ETH
                                </div>
                                <div className="flex items-center cursor-pointer">
                                  {/* Add{" "} */}
                                  {/* <div className="rotate-180">
                                <MdArrowBackIos />
                              </div> */}
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="mx-4 mt-3 fontquickk">
                            <div className="w-full my-2 rounded-full border-2 py-2 text-white/50 bg-gray-700/80 font border-[var(--dwtop)] flex justify-between px-4">
                              <div className="flex items-center">
                                <Image
                                  src={aptoslogo}
                                  className="mr-1"
                                  width={26}
                                  height={32}
                                  alt=""
                                />{" "}
                                MATIC
                              </div>
                              <div className="flex items-center text-sm">
                                coming soon!{" "}
                                {/* <div className="rotate-180">
                          <MdArrowBackIos />
                        </div> */}
                              </div>
                            </div>
                          </div>
                          <div className="mx-6 mt-4">
                            <div
                              onClick={() => {
                                setprofile(true);
                                setragnarok(false);
                              }}
                              className="w-full mb-2 text-center py-2 border-2 bg-black/70 cursor-pointer border-[var(--dwtwo)] rounded-xl"
                            >
                              Profile Setting
                            </div>
                            <div
                              onClick={() => {
                                router.push("/tracktweets");
                                setragnarok(false);
                              }}
                              className="w-full mb-2 text-center py-2 border-2 bg-black/70 cursor-pointer border-[var(--dwtwo)] rounded-xl"
                            >
                              Track My Tweets
                            </div>
                            <div
                              onClick={() => {
                                router.push("/entries");
                                setragnarok(false);
                              }}
                              className="w-full mb-2 text-center py-2 border-2 bg-black/70 cursor-pointer border-[var(--dwtwo)] rounded-xl"
                            >
                              Track My Entries
                            </div>
                            <div
                              onClick={() => {
                                AnchorWallet
                                  ? disconnect()
                                  : active
                                  ? deactivate()
                                  : setshowwallet(true);
                              }}
                              className="w-full my-2 text-center text-[#F00606] py-2 border-2 bg-black/70 cursor-pointer border-[var(--dwtwo)] rounded-xl"
                            >
                              Disconnect
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {chosepfp && (
                      <div className="fixed top-0 left-0 fontquickk w-screen h-screen z-[200] backdrop-blur-sm grid place-items-center">
                        <div
                          className="absolute w-screen h-screen -z-10"
                          onClick={() => setchosepfp(false)}
                        ></div>
                        <div className="md:w-[700px] sm:w-full h-[520px] rounded-xl bg-gradient-to-t from-[var(--dwtop)] to-[var(--dwtrakc)] p-[1.9px]">
                          <div className="w-full bg-gradient-to-t from-[#222222] to-[#2B2B36] rounded-xl h-full">
                            <div className="flex justify-center pt-2"></div>
                            {!loading ? (
                              AnchorWallet ? (
                                <div className="w-[97%] px-3 pt-2 sm:justify-center md:justify-start flex flex-wrap gap-2 h-[81%] overflow-y-scroll">
                                  {nfts &&
                                    nfts.map(
                                      (d, i) =>
                                        d.image && (
                                          <div
                                            className={`card w-[120px] h-[114px] overflow-hidden cursor-pointer rounded-xl transition-all ${
                                              selection === d.id &&
                                              "border-2 border-[var(--dwtop)] transition-all"
                                            } `}
                                            key={i}
                                            onClick={() => setSelect(d.id)}
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
                              ) : active ? (
                                <div className="w-[97%] px-3 pt-2 sm:justify-center md:justify-start flex flex-wrap gap-2 h-[81%] overflow-y-scroll">
                                  {eth_nft &&
                                    eth_nft.map((d, i) => (
                                      <div
                                        className={`card w-[120px] h-[114px] overflow-hidden cursor-pointer rounded-xl transition-all ${
                                          selection === i &&
                                          "border-2 border-[var(--dwtop)] transition-all"
                                        } `}
                                        key={i}
                                        onClick={() => {
                                          setSelect(i);
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
                                  {/* <span className="text-[var(--dwtwo)]">ETH</span> */}
                                  wallet first
                                </div>
                              )
                            ) : (
                              // need to loading animation here!
                              <div>loading</div>
                            )}
                            {!loading && (
                              <div className="flex items-center justify-center dark:text-white">
                                <div
                                  onClick={() => {
                                    if (selection >= 0) {
                                      if (AnchorWallet) {
                                        setPfpImage(nfts[selection].image);
                                      } else if (active) {
                                        setPfpImage(
                                          eth_nft[
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
                                            : eth_nft[selection].rawMetadata
                                                .image
                                        );
                                      }
                                    }
                                    setchosepfp(false);
                                  }}
                                  className="text-center border border-[var(--dwtop)] mt-2 rounded-full hover:scale-105 w-fit px-4 mx-1 py-2 cursor-pointer"
                                >
                                  Confirm
                                </div>
                                <div
                                  onClick={() => {
                                    setchosepfp(false), setPfpImage();
                                  }}
                                  className="text-center border border-[var(--dwtop)] mt-2 rounded-full hover:scale-105 w-fit mx-1 px-4 py-2 cursor-pointer"
                                >
                                  Cancel
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Skeleton
                    variant="rectangular"
                    sx={{ bgcolor: "grey.800" }}
                    animation="pulse"
                    width={45}
                    height={45}
                    className="ml-2 rounded-full"
                  />
                ))}
            </div>
            <div
              className={`menu z-50 w-fit h-[28px] relative text-2xl text-[var(--dwselect)] block mdd:hidden ${
                showmenu && "pt-2"
              } `}
            >
              <div
                className={`cursor-pointer transition-all  scale-90 ssm:scale-100 ${
                  showmenu && "-rotate-90 transition-all duration-800"
                } `}
                onClick={() => setshowmenu(!showmenu)}
              >
                <div
                  className={`w-8 p-[2.3px] rounded-full bg-gradient-to-r from-[#EE7607] to-[#FFD600] my-1 transition-all ${
                    showmenu && "rotate-[47deg] transition-all duration-800"
                  } `}
                ></div>
                <div
                  className={`w-8 p-[2.3px] rounded-full bg-gradient-to-r from-[#EE7607] to-[#FFD600] my-1 transition-all ${
                    showmenu && "hidden transition-all"
                  } `}
                ></div>
                <div
                  className={`w-8 p-[2.3px] rounded-full bg-gradient-to-r from-[#EE7607] to-[#FFD600] my-1 transition-all ${
                    showmenu &&
                    "-rotate-[47deg] transition-all -mt-2 duration-800 "
                  } `}
                ></div>
              </div>

              <Drawer
                open={showmenu}
                onClose={() => setshowmenu(false)}
                classes={{
                  root: "z-[999999]",
                  paper:
                    "bg-gradient-to-t from-[#1E2026] to-[#2C2C37] w-[80%] ssm:w-[60%] xsm:w-full xsm:max-w-sm",
                }}
              >
                <div className={`w-full h-full `}>
                  {d_token ? (
                    <div
                      onClick={() => eth_point()}
                      className={`w-full text-xl flex items-center px-4 py-2 text-center justify-center`}
                    >
                      <Image
                        src={Dbutton}
                        width={29}
                        height={24}
                        alt=""
                        className="mr-1"
                      />
                      {d_token}
                    </div>
                  ) : (
                    <></>
                  )}

                  <div className="linos1"></div>

                  <div
                    className={`w-[90%] mx-auto  pt-4 active:scale-105 transition-all flex `}
                  >
                    <a
                      href={"/apply"}
                      className={`aplly text-base rounded-full w-full text-center py-[6px] px-6 bgTopNavbar text-white/80 border-[2px] border-[#595959] fontquickk `}
                    >
                      Apply
                    </a>
                  </div>

                  {!AnchorWallet && !active && (
                    <div
                      onClick={() => {
                        AnchorWallet
                          ? disconnect()
                          : active
                          ? deactivate()
                          : setprofile(true);
                      }}
                      className={` w-[90%] mx-auto mt-4 px-4 py-2 font-normal rounded-full cursor-pointer bgTopNavbar text-white/80 border-[2px] border-[#595959] fontquickk text-center text-sm `}
                    >
                      Log in
                    </div>
                  )}

                  <div className="mdd:hidden">
                    <div className="my-4 linos1"></div>
                    <Leftnavbar />
                  </div>
                </div>
              </Drawer>
            </div>
          </div>
        </div>
      </header>

      {profile && (
        <div className="fixed top-0 left-0 z-50 grid w-screen h-screen dark:text-white backdrop-blur-sm place-items-center dark:bg-black/70">
          <div
            className="absolute w-full h-full -z-10"
            onClick={() => setprofile(false)}
          ></div>
          <div className="sm:w-full md:w-[600px] pb-8 border border-black/20 rounded-3xl profilebg">
            <div
              className="flex justify-start cursor-pointer"
              onClick={() => setprofile(false)}
            >
              <Image src={backk} width={60} height={20} alt="" />
            </div>
            <div className="text-2xl text-center -mt-7">Profile Settings</div>
            <div
              onClick={() => {
                // setchosepfp(true);
              }}
              className="relative flex justify-center mx-auto mt-5 w-fit"
            >
              <Image
                src={session ? session.user.picture : nopfp}
                className="border-2 border-[var(--dwtwo)] rounded-full"
                width={80}
                height={69}
                alt=""
              />
              <div className="absolute -right-[3px] top-[60%] z-[60]">
                <Image src={editlogo} width={26} height={30} alt="" />
              </div>
              {/* <div className="absolute w-full rounded-full z-50 h-full grid place-items-center bg-black/25 backdrop-blur-[2px] opacity-0 hover:opacity-100 transition-all text-3xl text-white/60">
                <BsUpload />
              </div> */}
            </div>
            <div className="text-lg font-semibold text-center">
              {session ? (
                session.user.name.length > 10 ? (
                  session.user.name.slice(0, 10) + "..."
                ) : (
                  session.user.name
                )
              ) : supabase_session ? (
                supabase_session.user.user_metadata.full_name.length > 10 ? (
                  supabase_session.user.user_metadata.full_name.slice(0) + "..."
                ) : (
                  supabase_session.user.user_metadata.full_name
                )
              ) : (
                <>Ragnarok</>
              )}
            </div>
            {/* <div className="text-xs cursor-pointer text-center text-[#6C7072] border-b border-[#6C7072] w-fit mx-auto ">
              Update your username
            </div> */}
            <div className="flex items-center justify-center mt-6">
              <div
                onClick={() => {
                  !supabase_session
                    ? supabase.auth.signInWithOAuth({
                        provider: "discord",
                        options: {
                          scopes: ["guilds", "guilds.members.read"],
                        },
                      })
                    : supabase.auth.signOut();
                }}
                className="px-4 cursor-pointer text-base mx-3 py-2 bg-[#22222A] rounded-xl flex items-center"
              >
                <span className="text-2xl mr-[6px] text-[#2596be]">
                  <FaDiscord />
                </span>
                {!supabase_session ? (
                  <span>Discord</span>
                ) : (
                  <span>
                    {supabase_session.user.user_metadata.full_name.length > 10
                      ? supabase_session.user.user_metadata.full_name.slice(0) +
                        "..."
                      : supabase_session.user.user_metadata.full_name}
                  </span>
                )}
              </div>
              <div
                onClick={() => (!session ? signIn() : signOut())}
                className="px-4 cursor-pointer text-base mx-3 py-2 bg-[#22222A] rounded-xl flex items-center"
              >
                <span className="text-2xl mr-[6px] text-[#2596be]">
                  <FaTwitter />
                </span>
                {!session ? (
                  <span>Twitter</span>
                ) : (
                  <span>
                    {session.user.name.length > 10
                      ? session.user.name.slice(0, 10) + "..."
                      : session.user.name}
                  </span>
                )}
              </div>
            </div>
            {active || AnchorWallet ? (
              <div className="mt-8 w-[94%] mx-auto">
                <div className="my-2 bg-[#22222A] rounded-xl px-3 justify-between flex items-center">
                  <div className="flex items-center">
                    <div>
                      <Image src={solanaicon} width={30} height={20} alt="" />
                    </div>
                    <div>
                      <Image
                        className="mx-1"
                        src={Linee}
                        width={1.6}
                        height={20}
                        alt=""
                      />
                    </div>
                    <div className="md:text-xs lg:text-sm sm:text-[7.5px]">
                      {AnchorWallet && AnchorWallet.publicKey.toBase58()}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div>
                      <Image
                        className="mx-1"
                        src={Linee}
                        width={1.6}
                        height={20}
                        alt=""
                      />
                    </div>
                    <div
                      className={`text-xs ${
                        AnchorWallet ? "text-[#2fd43d]" : "text-[#FF1F00]"
                      }`}
                    >
                      {AnchorWallet ? <>connected</> : <>Disconnected</>}
                    </div>
                  </div>
                </div>
                <div className="my-2 bg-[#22222A] rounded-xl px-3 justify-between flex items-center">
                  <div className="flex items-center">
                    <div>
                      <Image src={ethicon} width={30} height={20} alt="" />
                    </div>
                    <div>
                      <Image
                        className="mx-1"
                        src={Linee}
                        width={1.6}
                        height={20}
                        alt=""
                      />
                    </div>
                    <div className="md:text-xs lg:text-sm sm:text-[7.5px]">
                      {active && account}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div>
                      <Image
                        className="mx-1"
                        src={Linee}
                        width={1.6}
                        height={20}
                        alt=""
                      />
                    </div>
                    <div
                      className={`text-xs ${
                        active ? "text-[#2fd43d]" : "text-[#FF1F00]"
                      }`}
                    >
                      {active ? <>connected</> : <>Disconnected</>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between px-3 my-2 bg-gray-700/60 rounded-xl">
                  <div className="flex items-center">
                    <div>
                      <Image src={aptoslogo} width={30} height={20} alt="" />
                    </div>
                    <div>
                      <Image
                        className="mx-1"
                        src={Linee}
                        width={1.6}
                        height={20}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div>
                      <Image
                        className="mx-1"
                        src={Linee}
                        width={1.6}
                        height={20}
                        alt=""
                      />
                    </div>
                    <div className="text-xs text-white/50">Coming soon!</div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                onClick={() => {
                  AnchorWallet
                    ? disconnect()
                    : active
                    ? deactivate()
                    : setshowwallet(true);
                }}
                className=" w-fit mx-auto mt-7 px-4 py-2 font-normal cursor-pointer bgTopNavbar text-white/80 border-[2px] border-[#595959] fontquickk rounded-full text-center text-sm"
              >
                {<>Connect Wallet</>}
              </div>
            )}
            {pfp_image && (
              <div className="mx-auto mt-10 w-fit ">
                <div
                  onClick={() => {
                    pfp_image && change_pfp();
                  }}
                  className="px-3 py-2 text-sm rounded-full cursor-pointer savee"
                >
                  Save Changes
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showwallets && (
        <div className="fixed top-0 z-50 grid w-screen h-screen dark:text-white place-items-center bg-black/25 backdrop-blur-sm">
          <div
            className="absolute w-full h-full -z-10"
            onClick={() => setshowwallet(false)}
          ></div>
          <div className="w-[280px] bg-gradient-to-t from-[#363331] to-[#47495B] pb-8 text-center rounded-xl border-2 border-[var(--dwtwo)]">
            <div className="flex justify-between mx-3 mt-2 text-2xl cursor-pointer text-white/60 ">
              <div>
                <div
                  className={`${
                    solana === false &&
                    aptos === false &&
                    eth === false &&
                    "hidden"
                  }`}
                  onClick={() => {
                    setshowwallet1(true);
                    setsolana(false);
                    setaptos(false);
                    seteth(false);
                  }}
                >
                  <BiArrowBack />
                </div>
              </div>
              <div onClick={() => setshowwallet(false)}>
                <CiCircleRemove />
              </div>
            </div>
            {showwallets1 && (
              <div className="dark:text-white">
                <div className="mt-3 text-lg">Select Your Network:</div>
                <div className="mt-8 w-[90%] text-base mx-auto">
                  {!AnchorWallet ? (
                    <div
                      onClick={() => {
                        setshowwallet1(false);
                        setsolana(true);
                        seteth(false);
                        setaptos(false);
                      }}
                      className="solatna cursor-pointer my-3 flex items-center w-full px-2 py-1 hover:scale-105 transition-all rounded-full bg-gradient-to-t from-[#363331] to-[#47495B] border border-[--dwtop]"
                    >
                      <span className="mx-3">
                        <Image src={solanaicon} width={30} height={20} alt="" />
                      </span>
                      <span>Solana</span>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        disconnect();
                      }}
                      className="solatna cursor-pointer my-3 flex items-center w-full px-2 py-1 hover:scale-105 transition-all rounded-full bg-gradient-to-t from-[#363331] to-[#47495B] border border-[--dwtop]"
                    >
                      <span className="mx-3">
                        <Image src={solanaicon} width={30} height={20} alt="" />
                      </span>
                      <span>
                        {AnchorWallet.publicKey.toBase58().slice(0, 4)}...
                        {AnchorWallet.publicKey
                          .toBase58()
                          .slice(
                            AnchorWallet.publicKey.toBase58().length - 5,
                            AnchorWallet.publicKey.toBase58().length
                          )}
                      </span>
                    </div>
                  )}
                  {!active ? (
                    <div
                      onClick={() => {
                        setshowwallet1(false);
                        setsolana(false);
                        seteth(true);
                        setaptos(false);
                      }}
                      className="solatna cursor-pointer my-3 flex items-center w-full px-2 py-1 hover:scale-105 transition-all rounded-full bg-gradient-to-t from-[#363331] to-[#47495B] border border-[--dwtop]"
                    >
                      <span className="mx-3">
                        <Image src={ethicon} width={30} height={20} alt="" />
                      </span>
                      <span>Ethereum</span>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        deactivate();
                      }}
                      className="solatna cursor-pointer my-3 flex items-center w-full px-2 py-1 hover:scale-105 transition-all rounded-full bg-gradient-to-t from-[#363331] to-[#47495B] border border-[--dwtop]"
                    >
                      <span className="mx-3">
                        <Image src={ethicon} width={30} height={20} alt="" />
                      </span>
                      <span>
                        {account.slice(0, 4)}...
                        {account.slice(account.length - 4, account.length)}
                      </span>
                    </div>
                  )}
                  <div
                    onClick={() => {
                      setshowwallet1(false);
                      setsolana(false);
                      seteth(false);
                      setaptos(true);
                    }}
                    className="solatna hidden cursor-pointer my-3 items-center w-full px-2 py-1 hover:scale-105 transition-all rounded-full bg-gradient-to-t from-[#363331] to-[#47495B] border border-[--dwtop]"
                  >
                    <span className="mx-3">
                      <Image src={aptoslogo} width={30} height={20} alt="" />
                    </span>
                    <span>Polygon</span>
                  </div>
                </div>
              </div>
            )}
            {solana && (
              <div>
                <div className="mt-3 text-lg">Connect Wallet:</div>
                <div className="mt-8 w-[80%] mx-auto">
                  <div
                    onClick={() => {
                      select("Phantom");
                      setshowwallet(false);
                      setshowwallet1(true);
                      setsolana(false);
                      setaptos(false);
                      seteth(false);
                    }}
                    className="solatna cursor-pointer my-3 flex items-center w-full px-2 py-1 hover:scale-105 transition-all rounded-full bg-gradient-to-t from-[#363331] to-[#47495B] border border-[--dwtop]"
                  >
                    <span className="mx-3">
                      <Image src={Phantomicon} width={30} height={20} alt="" />
                    </span>
                    <span>Phantom</span>
                  </div>
                  <div
                    onClick={() => {
                      select("Slope");
                      setshowwallet(false);
                      setshowwallet1(true);
                      setsolana(false);
                      setaptos(false);
                      seteth(false);
                    }}
                    className="solatna cursor-pointer my-3 flex items-center w-full px-2 py-[7px] hover:scale-105 transition-all rounded-full bg-gradient-to-t from-[#363331] to-[#47495B] border border-[--dwtop]"
                  >
                    <span className="mx-3">
                      <Image src={Slop} width={24} height={20} alt="" />
                    </span>
                    <span> Slope</span>
                  </div>
                  <div
                    onClick={() => {
                      select("Solflare");
                      setshowwallet(false);
                      setshowwallet1(true);
                      setsolana(false);
                      setaptos(false);
                      seteth(false);
                    }}
                    className="solatna cursor-pointer my-3 flex items-center w-full px-2 py-1 hover:scale-105 transition-all rounded-full bg-gradient-to-t from-[#363331] to-[#47495B] border border-[--dwtop]"
                  >
                    <span className="mx-3">
                      <Image src={Solflarelogo} width={30} height={20} alt="" />
                    </span>
                    <span>Solflare</span>
                  </div>
                  <div
                    onClick={() => {
                      select("Coin98");
                      setshowwallet(false);
                      setshowwallet1(true);
                      setsolana(false);
                      setaptos(false);
                      seteth(false);
                    }}
                    className="solatna cursor-pointer my-3 flex items-center w-full px-2 py-1 hover:scale-105 transition-all rounded-full bg-gradient-to-t from-[#363331] to-[#47495B] border border-[--dwtop]"
                  >
                    <span className="mx-3">
                      <Image src={wallet98} width={30} height={20} alt="" />
                    </span>
                    <span>Coin98</span>
                  </div>
                  <div
                    onClick={() => {
                      select("Ledger");
                      setshowwallet(false);
                      setshowwallet1(true);
                      setsolana(false);
                      setaptos(false);
                      seteth(false);
                    }}
                    className="solatna cursor-pointer my-3 flex items-center w-full px-2 py-[7px] hover:scale-105 transition-all rounded-full bg-gradient-to-t from-[#363331] to-[#47495B] border border-[--dwtop]"
                  >
                    <span className="mx-3">
                      <Image src={ledger} width={24} height={20} alt="" />
                    </span>
                    <span>Ledger</span>
                  </div>
                </div>
              </div>
            )}
            {eth && (
              <div>
                <div className="mt-3 text-lg">Connect Wallet:</div>
                <div className="mt-8 w-[80%] mx-auto">
                  <div
                    onClick={() => {
                      connection(injected);
                      setshowwallet(false);
                      setshowwallet1(true);
                      setsolana(false);
                      setaptos(false);
                      seteth(false);
                    }}
                    className="solatna cursor-pointer my-3 flex items-center w-full px-2 py-1 hover:scale-105 transition-all rounded-full bg-gradient-to-t from-[#363331] to-[#47495B] border border-[--dwtop]"
                  >
                    <span className="mx-3">
                      <Image src={ethimage1} width={30} height={20} alt="" />
                    </span>
                    <span>Metamask</span>
                  </div>
                  {/* <div className="solatna cursor-pointer my-3 flex items-center w-full px-2 py-1 hover:scale-105 transition-all rounded-full bg-gradient-to-t from-[#363331] to-[#47495B] border border-[--dwtop]">
                    <span className="mx-3">
                      <Image src={ethimage2} width={25} height={20} alt="" />
                    </span>
                    <span> Coinbase</span>
                  </div> */}
                  <div
                    onClick={() => {
                      connection(walletconnect);
                      setshowwallet(false);
                      setshowwallet1(true);
                      setsolana(false);
                      setaptos(false);
                      seteth(false);
                    }}
                    className="solatna cursor-pointer my-3 flex items-center w-full px-2 py-1 hover:scale-105 transition-all rounded-full bg-gradient-to-t from-[#363331] to-[#47495B] border border-[--dwtop]"
                  >
                    <span className="mx-3">
                      <Image src={ethimage3} width={27} height={20} alt="" />
                    </span>
                    <span>Wallet Connect</span>
                  </div>
                  {/* <div className="solatna cursor-pointer my-3 flex items-center w-full px-2 py-1 hover:scale-105 transition-all rounded-full bg-gradient-to-t from-[#363331] to-[#47495B] border border-[--dwtop]">
                    <span className="mx-3">
                      <Image src={ethimage4} width={27} height={20} alt="" />
                    </span>
                    <span>Cryopto.com </span>
                  </div> */}
                  {/* <div className="solatna cursor-pointer my-3 flex items-center w-full px-2 py-1 hover:scale-105 transition-all rounded-full bg-gradient-to-t from-[#363331] to-[#47495B] border border-[--dwtop]">
                    <span className="mx-3">
                      <Image src={ethimage5} width={26} height={20} alt="" />
                    </span>
                    <span>Trust Wallet</span>
                  </div> */}
                </div>
              </div>
            )}

            {aptos && (
              <div>
                <div className="mt-3 text-lg">Connect Wallet:</div>
                <div className="mt-8 w-[80%] mx-auto">
                  <div className="solatna cursor-pointer my-3 flex items-center w-full px-2 py-1 hover:scale-105 transition-all rounded-full bg-gradient-to-t from-[#363331] to-[#47495B] border border-[--dwtop]">
                    <span className="mx-3">
                      <Image src={aptimage1} width={27} height={20} alt="" />
                    </span>
                    <span>Metamask</span>
                  </div>
                  <div className="solatna cursor-pointer my-3 flex items-center w-full px-2 py-1 hover:scale-105 transition-all rounded-full bg-gradient-to-t from-[#363331] to-[#47495B] border border-[--dwtop]">
                    <span className="mx-3">
                      <Image src={aptimage2} width={25} height={20} alt="" />
                    </span>
                    <span> Coinbase</span>
                  </div>
                  <div className="solatna cursor-pointer my-3 flex items-center w-full px-2 py-1 hover:scale-105 transition-all rounded-full bg-gradient-to-t from-[#363331] to-[#47495B] border border-[--dwtop]">
                    <span className="mx-3">
                      <Image src={aptimage3} width={28} height={20} alt="" />
                    </span>
                    <span>Wallet Connect</span>
                  </div>
                  <div className="solatna cursor-pointer my-3 flex items-center w-full px-2 py-1 hover:scale-105 transition-all rounded-full bg-gradient-to-t from-[#363331] to-[#47495B] border border-[--dwtop]">
                    <span className="mx-3">
                      <Image src={aptimage4} width={25} height={20} alt="" />
                    </span>
                    <span>Cryopto.com </span>
                  </div>
                  <div className="solatna cursor-pointer my-3 flex items-center w-full px-2 py-1 hover:scale-105 transition-all rounded-full bg-gradient-to-t from-[#363331] to-[#47495B] border border-[--dwtop]">
                    <span className="mx-3">
                      <Image src={aptimage5} width={26} height={20} alt="" />
                    </span>
                    <span>Trust Wallet</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* {!wait_profile_loading && is_need_user_profile && <Profile />} */}

      <div
        className={`absolute top-0 left-0 w-full h-screen z-40 ${
          ragnarok === false && "hidden"
        }`}
        onClick={() => setragnarok(false)}
      ></div>
      <div
        className={`absolute top-0 left-0 w-full h-screen z-40 ${
          showmenu === false && "hidden"
        }`}
        onClick={() => setshowmenu(false)}
      ></div>
      <div
        className={`absolute top-0 left-0 w-full h-screen z-40 ${
          shownotification === false && "hidden"
        }`}
        onClick={() => setshownotification(false)}
      ></div>
    </>
  );
}
