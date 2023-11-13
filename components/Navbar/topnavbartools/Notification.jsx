import Image from "next/image";
import React, { useEffect, useState } from "react";
import N1 from "../../../public/n1.png";
import N2 from "../../../public/n2.png";
import N3 from "../../../public/n3.png";
import N4 from "../../../public/n44.png";
import N5 from "../../../public/n5.png";
import { eth_not } from "../../instraction/ETH/notification";
import { eth_not_all } from "../../instraction/ETH/notification_all";
import { sol_not } from "../../instraction/solana/notification";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useWeb3React } from "@web3-react/core";

export default function Notification({ address }) {
  const [notifications, setNotifications] = useState();
  const AnchorWallet = useAnchorWallet();

  const { active, account } = useWeb3React();

  useEffect(() => {
    (async () => {
      const resp = await fetch(
        `/api/database?database=Notification&collection=${address}`
      );
      const resp_json = await resp.json();
      if (resp_json && resp_json.length > 0) {
        setNotifications(resp_json);
      }
    })();
  }, []);

  async function seen(id) {
    if (AnchorWallet) {
      await eth_not(AnchorWallet.publicKey.toBase58(), true, id);
    } else if (active) {
      eth_not(account, true, id);
    }
  }

  async function seen_all() {
    if (AnchorWallet) {
      eth_not_all(AnchorWallet.publicKey.toBase58(), true);
    } else if (active) {
      eth_not_all(account, true);
    }
  }

  return (
    <div className="absolute top-[150%]  right-0 w-[300px] bg-black/60 backdrop-blur-md border-2 border-[var(--dwtwo)]  z-[100] rounded-lg text-center">
      <div className="my-2 text-center text-lg">Notifications</div>
      <div
        id="my-scrollable-component"
        className="w-[97%] px-1 h-[310px] overflow-y-scroll mx-auto mt-3"
      >
        <div>
          {notifications ? (
            notifications.map((not, i) =>
              not.type == "raffle" ? (
                <div
                  key={i}
                  className="my-2 w-full px-[10px] bg-[var(--dwtwo)]  py-[7px] flex items-center justify-center rounded-xl"
                >
                  <Image
                    src={N1}
                    className="hidden"
                    width={40}
                    height={30}
                    alt=""
                  />
                  <div className="text-[15px]">you win in this raffle</div>
                  <div className="relative font-semibold">
                    <div className="text-[11px] w-[60px] text-[#ADFF00]">
                      0.5 SOL$
                    </div>
                    <div className="absolute top-[90%] right-0 text-[10px]">
                      3 min
                    </div>
                  </div>
                </div>
              ) : not.type == "apply" && not.success ? (
                <div
                  key={i}
                  className="my-2 w-full px-[10px] text-white bg-[var(--dwtwo)] py-[6px] flex items-center justify-center rounded-xl"
                >
                  {/* <Image src={N3} width={40} height={30} alt="" /> */}
                  <div className="text-[15px]">
                    your application is approved
                  </div>
                  <div className="relative font-semibold"></div>
                </div>
              ) : (
                <div
                  key={i}
                  className="my-2 w-full px-[10px] text-white bg-[var(--dwtwo)] text-center py-[7px] flex items-center justify-center rounded-xl"
                >
                  {/* <Image src={N3} width={40} height={30} alt="" /> */}
                  <div
                    className={`text-[15px] ${not.seen && "text-[#ADFF00]"}`}
                  >
                    {not.info}
                  </div>
                  <div className="relative font-semibold"></div>
                </div>
              )
            )
          ) : (
            <div>there is no notification</div>
          )}
        </div>
      </div>
      <div className="px-2 flex items-center justify-center mb-2">
        <div
          onClick={() => seen_all()}
          className="text-[16px] font-semibold leading-3 border-b border-white cursor-pointer"
        >
          Make all as read
        </div>
        <div className="text-white/60 cursor-pointer text-[12px] hidden">
          See all
        </div>
      </div>
    </div>
  );
}
function Notify1() {
  return (
    <div>
      <div className="my-2 w-full px-[10px] bg-[#C97300]  py-[6px] flex items-center justify-between">
        <Image src={N1} className="hidden" width={40} height={30} alt="" />
        <div className="text-[15px]">Claim Reward</div>
        <div className="relative font-semibold">
          <div className="text-[11px] w-[60px] text-[#ADFF00]">0.5 SOL$</div>
          <div className="absolute top-[90%] right-0 text-[10px]">3 min</div>
        </div>
      </div>
    </div>
  );
}
