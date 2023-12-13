import Image from "next/image";
import React, { useEffect, useState } from "react";
import solanaicon from "../../public/solanalogo.png";
import ethicon from "../../public/ethlogo.png";
import aptoslogo from "../../public/polygon.png";
import Linee from "../../public/lining.png";
import { signIn, signOut, useSession } from "next-auth/client";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import "react-toastify/dist/ReactToastify.css";
import { useWeb3React } from "@web3-react/core";
import * as auth from "@supabase/auth-helpers-react";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { BsUpload } from "react-icons/bs";
import nopfp from "../../public/nopfp.png";
import editlogo from "../../public/editlogo.png";

export default function Profile() {
  const [chosepfp, setchosepfp] = useState(false);
  const [pfp_network, setPfpNetwork] = useState();
  const [pfp_image, setPfpImage] = useState();
  const [user_profile, setUserProfile] = useState(null);
  const supabase = auth.useSupabaseClient();
  const supabase_session = auth.useSession();
  const [session] = useSession();
  const AnchorWallet = useAnchorWallet();
  const {
    active,
    activate,
    deactivate,
    chainId,
    account,
    library: provider,
  } = useWeb3React();

  useEffect(() => {
    console.log('session in profile ====> ', session);
  }, [])
  
  return (
    <div
      className="w-screen z-[500] h-screen fixed top-0 left-0 backdrop-blur-sm grid place-items-center"
      id="pov"
    >
      <div
        className="absolute w-full h-full -z-10"
        // onClick={() => setprofile(false)}
      ></div>
      <div className="sm:w-full md:w-[600px] pb-8 border border-black/20 rounded-3xl profilebg">
        {/* <div
      className="flex justify-start cursor-pointer"
      onClick={() => setprofile(false)}
    >
      <Image src={backk} width={60} height={20} alt="" />
    </div> */}
        <div className="text-2xl text-center ">Profile Settings</div>
        <div
          onClick={() => setchosepfp(true)}
          className="relative flex justify-center mx-auto mt-5 cursor-pointer w-fit"
        >

            {/* src={pfp_image ? pfp_image : user_profile
                                        ? user_profile.length > 0 ? user_profile[0].pfp
                                                                    ? user_profile[0].pfp : nopfp
                                                                                                  : nopfp
                                                                                                        : nopfp
            } */}

          <Image
            src={
              pfp_image
                ? pfp_image
                : user_profile
                ? user_profile.length > 0
                  ? user_profile[0].pfp
                    ? user_profile[0].pfp
                    : nopfp
                  : nopfp
                : nopfp
            }
            className="border-2 border-[var(--dwtwo)] rounded-full"
            width={80}
            height={69}
            alt=""
          />
          <div className="absolute -right-[3px] top-[60%] z-[60]">
            <Image src={editlogo} width={26} height={30} alt="" />
          </div>
          <div className="absolute w-full rounded-full z-50 h-full grid place-items-center bg-black/25 backdrop-blur-[2px] opacity-0 hover:opacity-100 transition-all text-3xl text-white/60">
            <BsUpload />
          </div>
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
                      scopes: "guilds.join"
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
              {active && account}
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
  );
}
