import React, { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ShowContext, SetShowContext } from "./utils/navContext";
import { useWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import { useWeb3React } from "@web3-react/core";
import { navItemsData } from "../../data/LeftSidebarData";

// images
import page7_1 from "../../public/page7.1.png";

export default function Leftnavbar() {
  const router = useRouter();
  const { pathname } = router;
  const AnchorWallet = useAnchorWallet();
  const { select, disconnect } = useWallet();
  const {
    active,
    activate,
    deactivate,
    chainId,
    account,
    library: provider,
  } = useWeb3React();

  // this the value that will show true or false
  const show = useContext(ShowContext);
  // this the function that will set the show value to either true or false
  const set_show = useContext(SetShowContext);

  const [shownotification, setshownotification] = useState(true);

  return (
    <>
      <div
        style={{ zIndex: 99999 }}
        className={`fixed top-[50%] translate-y-[-50%] left-0 hidden mdd:block ${
          pathname === "/confirm" && "hidden"
        }`}
      >
        <div
          className={`flex flex-col rounded-tr-2xl rounded-br-2xl shadow-[0px_0px_48px_#00000026] ${
            pathname === "/pandora/mint"
              ? "bg-cusEL-100/50 backdrop-blur-lg"
              : "bg-cusEL-100"
          }`}
        >
          {navItemsData.map((item, index) => {
            const { id, href, img, label, heightClass } = item;
            const imgUrl =
              pathname === "/swap" && href === "/swap" ? page7_1 : img;
            const isLast = index + 1 === navItemsData.length;
            const isFirst = navItemsData.indexOf(item) === 0;

            return (
              <Link key={id} href={href}>
                <div
                  className={`relative w-[60px] llg:w-[65px] 2xl:w-[70px] h-[60px] llg:h-[65px] 2xl:h-[70px] flex flex-row justify-center items-center ${
                    pathname === href
                      ? "bg-cusYellow shadow-[0px_0px_64px_#ffa801e6] rounded-xl"
                      : isFirst
                      ? "hover:bg-cusEL-200 rounded-tr-2xl"
                      : isLast
                      ? "hover:bg-cusEL-200 rounded-br-2xl"
                      : "hover:bg-cusEL-200"
                  } `}
                >
                  <Image
                    src={imgUrl}
                    width={60}
                    height={60}
                    alt=""
                    className={`${heightClass} w-auto mx-auto drop-shadow-[0px_4px_10px_#00000090]`}
                  />
                  <span className="opacity-0 hover:opacity-100 transition-opacity duration-200 absolute text-center w-16 left-1/2 transform -translate-x-1/2 text-white">
                    {label}
                  </span>
                </div>
                {!isLast && (
                  <div className="gradientLineNavItem w-full h-[1px]"></div>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col px-5 mdd:hidden">
        {navItemsData.map((item) => {
          const { id, href, img, heightClass, label } = item;
          const imgUrl =
            pathname === "/swap" && href === "/swap" ? page7_1 : img;

          return (
            <Link key={id} href={href}>
              <div
                className={`flex justify-start items-center p-2 ssm:p-3 ${
                  pathname === href
                    ? "bg-cusYellow rounded-md ssm:rounded-xl"
                    : ""
                } `}
              >
                <div className="w-8 h-8 flex justify-center items-center">
                  <Image
                    src={imgUrl}
                    width={60}
                    height={60}
                    alt=""
                    className={`w-auto ${heightClass} mx-auto`}
                  />
                </div>
              </div>
              <div className="gradientLineNavItem w-full h-[1px]"></div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
