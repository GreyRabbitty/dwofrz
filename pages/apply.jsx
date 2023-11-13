import Head from "next/head";
import React, { useEffect, useState, useContext } from "react";
import Formeone from "../components/formone/Formeone";
import { getSession } from "next-auth/client";
import { CircleLoader } from "react-spinners";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import {Wait_approve} from "../components/formone/wait_approve"
import { useWeb3React } from "@web3-react/core";
import {HolderContext, SetHolderContext} from "../components/utils/holder_context"
import {LoadingContext, SetLoadingContext} from "../components/utils/holder_context_loading"


export default function test() { 

    // this for set the holder verification
    const setHolder = useContext(SetHolderContext)
    // this for the holder verification
    const holder = useContext(HolderContext)
    // set loading holder verification
    const setLoadingHolder = useContext(SetLoadingContext)
    // loading holder verification
    const loading_holder = useContext(LoadingContext)


  const AnchorWallet = useAnchorWallet();
  const {
    active,
    account,
  } = useWeb3React();

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!AnchorWallet && !active) return;
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const session = await getSession();
        setLoad(true);
        if (session) {
          setConnected(true);
        }
      } catch (e) {
      } finally {
        setLoad(false);
      }
    })();
    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  }, [AnchorWallet, active, account]);
  const [load, setLoad] = useState(true); 
return (
    <div>
      <Head>
        <title>Apply</title>
      </Head> 
      {<div>
        {(AnchorWallet || active) ?
        !load ? (
          connected ? (
            <Formeone />
          ) : (
            <div className=" w-full h-[80vh] grid place-content-center">
              connnect you twitter first
            </div>
          )
        ) : (
          <div className=" w-full h-[80vh] grid place-content-center">
            <CircleLoader size={70} color="#ffa800" />
          </div>
        )
          :
          <div className=" w-full h-[80vh] grid place-content-center">
              connnect you Wallet first
          </div>
      }
      </div>

        // :
        // <div className=" w-full h-[80vh] grid place-content-center">
        //     <CircleLoader size={70} color="#ffa800" />
        //   </div>
      }
    </div>
  );
}