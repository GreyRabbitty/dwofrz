import Head from "next/head";
import React, { useEffect, useState } from "react";
import Entr from "../components/usertrack/tracktweets";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useWeb3React } from "@web3-react/core";
import { CircleLoader } from "react-spinners";

export default function entries() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [live, setLive] = useState();
  const [pending, setPending] = useState();
  const [finish, setFinish] = useState();

  const AnchorWallet = useAnchorWallet();
  const { active, account } = useWeb3React();

  useEffect(() => {
    (async () => {
      if (!active && !AnchorWallet) return setLoading(false);
      setLoading(true);
      let address;
      try {
        if (AnchorWallet) {
          address = AnchorWallet.publicKey.toBase58();
        } else if (active) {
          address = account;
        }

        const resp = await fetch(
          `/api/database?database=user_apply&collection=${address}`
        );
        const resp_json = await resp.json();
        let arr_pending = [];
        let arr_finish = [];
        let arr_live = [];

        const date = Date.now();
        const day = 1000 * 60 * 60 * 24;

        if (resp_json && resp_json.length > 0) {
          resp_json.map((el, i) => {
            if (el.approve) {
              if (el.postAt + day * 2 < date) {
                arr_finish.push(el);
              } else {
                arr_live.push(el);
              }
            } else {
              arr_pending.push(el);
            }
          });
          setLive(arr_live);
          setPending(arr_pending);
          setFinish(arr_finish);
        }
      } catch (e) {
      } finally {
        setLoading(false);
      }
    })();
  }, [AnchorWallet, active, account]);

  return (
    <div className="md:pl-20 sm:pl-0">
      <Head>
        <title>My Tweets</title>
        <link rel="rel" href="/favicon.ico" />
      </Head>
      {!loading ? (
        active || AnchorWallet ? (
          <Entr live={live} pending={pending} finish={finish} />
        ) : (
          <div className=" w-full h-[80vh] grid place-content-center">
            Connnect your Wallet first
          </div>
        )
      ) : (
        <div className=" w-full h-[80vh] grid place-content-center">
          <CircleLoader size={70} color="#ffa800" />
        </div>
      )}
    </div>
  );
}
