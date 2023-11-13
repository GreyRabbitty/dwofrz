import Head from "next/head";
import React, { useEffect, useState } from "react";
import Entr from "../components/usertrack/entries";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useWeb3React } from "@web3-react/core";
import { CircleLoader } from "react-spinners";
import { getSession } from "next-auth/client";

export default function entries() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [notify, setNotifications] = useState([]);

  const AnchorWallet = useAnchorWallet();
  const { active, account } = useWeb3React();

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (!AnchorWallet && !active) return;
      try {
        let address;
        const session = await getSession();
        if (!session) return;
        let twitter_id;
        const twitter_id_resp = await fetch("/api/twitter/get_session");
        twitter_id = (await twitter_id_resp.json()).twitter_id;
        const respp = await fetch(
          `/api/database?database=user_raffle&collection=${twitter_id}`
        );
        const resp_jsonn = await respp.json();
        if (resp_jsonn && resp_jsonn.length > 0) {
          setData(resp_jsonn);
        }

        // const resp = await fetch(
        //   `/api/database?database=Notification&collection=${address}`
        // );
        // const resp_json = await resp.json();
        // if (resp_json && resp_json.length > 0) {
        //   setNotifications(resp_json);
        // }
      } catch (e) {
      } finally {
        setLoading(false);
      }
    })();
  }, [AnchorWallet, active, account]);

  return (
    <div className="md:pl-20 sm:pl-0">
      <Head>
        <title>My Entries</title>
        <link rel="rel" href="/favicon.ico" />
      </Head>
      {!loading ? (
        active || AnchorWallet ? (
          <Entr data={data} notifys={notify} />
        ) : (
          <div className=" w-full h-[80vh] grid place-content-center">
            Connnect you Wallet first
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
