import React, { useEffect, useRef, useState } from "react";
import { Badge, Button, Skeleton } from "@mui/material";
import {
  sendWithHiro,
  sendWithUni,
  sendWithXVerse,
  sendWithHiroPlain,
  sendWithUniPlain,
  sendWithXVersePlain,
} from "../../../data/BTCSendTX";
import SpinResultModal from "../SpinResultModal";
import ParticleBackground from "../ParticleBackground";
import ConnectWalletModal from "../ConnectWalletModal";
import axios from "axios";
import UserBoxModal from "../PandoraMarketplace/UserBoxesModal";
import { BASE_URL2, SPIN } from "../../../pages/api/pandora/pandora_apis";
import { truncate } from "../../utils/utils";
// icons
import { GiMusicalNotes } from "react-icons/gi";
import PandoraMarketplace from "../PandoraMarketplace/PandoraMarketplace";
import ClaimModal from "../PandoraMarketplace/Claim";

const PandoraMintBTC = ({ stateValues }) => {
  const { item } = stateValues || {};
  const [spinResultModalOpen, setSpinResultModalOpen] = useState(false);
  const [spinResult, setSpinResult] = useState(null);
  const [firstSpinEnd, setFirstSpinEnd] = useState(true);
  const [secondSpinEnd, setSecondSpinEnd] = useState(true);
  const [thirdSpinEnd, setThirdSpinEnd] = useState(true);
  const [open, setOpen] = useState(false);
  const [xverseAddr, setXVerseAddress] = useState("");
  const [wallet, setWallet] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [skip, setSkip] = useState(false);
  const [address, setAddress] = useState();
  const [ordinalsAddress, setOrdinalsAddress] = useState("");
  const [firstRow, setFirstRow] = useState([1, 2, 3]);
  const [secondRow, setSecondRow] = useState([2, 3, 1]);
  const [thirdRow, setThirdRow] = useState([1, 1, 3]);
  const conversion = 100000000;
  const [claimOpen, setClaimOpen] = useState(false);
  const [buttonAllowed, setButtonAllowed] = useState(false);
  const [claim_fund, setClaimFund] = useState();
  const [collName, setCollName] = useState(null);
  const [music_mute, setMusicMute] = useState(false);
  const [boxes, setBoxes] = useState([]);
  const [showBoxes, setShowBoxes] = useState(false);

  // marketplace
  const [marketplaceOpen, setMarketplaceOpen] = useState(false);
  // user boxes
  const [userOpen, setUserOpen] = useState(false);

  const audioRef = useRef(null);
  const spinAudioRef = useRef(null);
  const WinAudioRef = useRef(null);

  const onSpinClick = async () => {
    if (!item?.minting) {
      return;
    }
    if (item?.claiming) {
      return;
    }
    if (wallet === 0) {
      return "No Wallet connected";
    }

    if (wallet === 1) {
      let tx = await sendWithHiro(item.price, item.treasury);
      if (tx) {
        setSpinning(true);
        startSpin();
      }
    } else if (wallet === 2) {
      let tx = await sendWithUni(item.price, item.treasury);
      if (tx) {
        setSpinning(true);
        startSpin();
      }
    } else if (wallet === 3) {
      let btcPayload = {
        network: "Mainnet",
        amountSats: item.price * conversion,
        recipientAddress: item.treasury,
        userAddress: xverseAddr,
        message: `Minting Box for ${name} Pandora by Dworfz`,
      };

      let sendTxOptions = {
        payload: btcPayload,
        onFinish: (response) => {
          setSpinning(true);
          startSpin();
        },
        onCancel: (res) => {
          // console.log("User cancelled transaction", res);
        },
      };
      let tx = await sendWithXVerse(sendTxOptions);
    }
  };

  // Mint from Pandora
  // trigger spin animation
  const startSpin = async () => {
    try {
      setSpinning(true);
      spinAudioRef.current.play();
      setFirstSpinEnd(false);
      setSecondSpinEnd(false);
      setThirdSpinEnd(false);

      let data = {
        pandora: item.name,
        wallet: ordinalsAddress,
      };

      const spin = axios.post(BASE_URL2 + SPIN, data).then((res) => {
        setFirstRow(res.data.array[0]);
        setSecondRow(res.data.array[1]);
        setThirdRow(res.data.array[2]);
        setSpinResult(res.data.msg);
      });

      setTimeout(() => {
        setFirstSpinEnd(true);
      }, 1200);

      setTimeout(() => {
        setSecondSpinEnd(true);
      }, 2000);

      setTimeout(() => {
        setThirdSpinEnd(true);
        spinAudioRef.current.currentTime = 0;
        spinAudioRef.current.pause();
      }, 2600);

      setTimeout(() => {
        setSpinResultModalOpen(true);
      }, 3200);
    } catch (error) {
    } finally {
      setSpinning(false);
    }
  };

  useEffect(() => {
    if (skip) {
      setFirstSpinEnd(true);
      setSecondSpinEnd(true);
      setThirdSpinEnd(true);
    }
  }, [skip, firstSpinEnd]);

  useEffect(() => {
    if (skip) {
      setFirstSpinEnd(true);
      setSecondSpinEnd(true);
      setThirdSpinEnd(true);
    }
  }, [skip, firstSpinEnd]);
  return (
    <>
      <div
        className="mt-[-70px] mmd:mt-[-80px] w-screen h-screen flex justify-stretch items-center mmd:items-end overflow-hidden relative z-[1]"
        style={{
          backgroundImage: `url(/pandora/images/256BG2.png)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute right-14 top-[9.5%] z-20">
          {wallet === 0 ? (
            <Button
              onClick={() => setOpen(!open)}
              className="px-4 llg:px-6 mx-auto customStylesButton2 lightOnHoverViolet"
            >
              Connect BTC Wallet
            </Button>
          ) : (
            <Button
              onClick={() => setOpen(!open)}
              className="px-4 llg:px-6 mx-auto customStylesButton2 lightOnHoverViolet"
            >
              {truncate(ordinalsAddress, 20)}
            </Button>
          )}
        </div>
        <audio
          ref={spinAudioRef}
          src="/pandora/audio/customSpin.mp3"
          className="hidden"
          loop={false}
        ></audio>

        <audio
          ref={WinAudioRef}
          src="/pandora/audio/win.mp3"
          className="hidden"
          loop={false}
        ></audio>

        <div
          className="h-[60vh] ssm:h-[70vh] md:h-[75vh] mmd:h-[88vh] w-[200vh] -mr-[30vh] mmd:-mr-0 mdd:w-[170vh] relative"
          style={{
            backgroundImage: `url(/pandora/images/board2.png)`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "100% 100%",
          }}
        >
          <div className="absolute left-[10%] top-[7.5%] h-[66.8%] w-[45%] z-20">
            <div className="grid grid-cols-3 w-full h-full relative overflow-hidden">
              {/* First Column */}
              {firstSpinEnd ? (
                <div className="grid grid-cols-1 grid-rows-3 w-full h-full relative overflow-hidden">
                  <div className="overflow-hidden flex justify-center items-center relative z-20">
                    <img
                      src={`/pandora/images/img${firstRow[0]}.png`}
                      alt=""
                      className="w-auto h-[80%] mmd:h-[90%]"
                    />
                  </div>
                  <div className="overflow-hidden flex justify-center items-center relative z-20">
                    <img
                      src={`/pandora/images/img${secondRow[0]}.png`}
                      alt=""
                      className="w-auto h-[80%] mmd:h-[90%]"
                    />
                  </div>
                  <div className="overflow-hidden flex justify-center items-center relative z-20">
                    <img
                      src={`/pandora/images/img${thirdRow[0]}.png`}
                      alt=""
                      className="w-auto h-[80%] mmd:h-[90%]"
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="overflow-hidden flex justify-center items-center relative w-[70%] mx-auto z-20 imgBox"
                  style={{
                    backgroundImage: `url(/pandora/images/imgsBg.png)`,
                    backgroundPosition: "top",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                ></div>
              )}

              {/* Second Column */}
              {secondSpinEnd ? (
                <div className="grid grid-cols-1 grid-rows-3 w-full h-full relative overflow-hidden">
                  <div className="overflow-hidden flex justify-center items-center relative z-20">
                    <img
                      src={`/pandora/images/img${firstRow[1]}.png`}
                      alt=""
                      className="w-auto h-[80%] mmd:h-[90%]"
                    />
                  </div>
                  <div className="overflow-hidden flex justify-center items-center relative z-20">
                    <img
                      src={`/pandora/images/img${secondRow[1]}.png`}
                      alt=""
                      className="w-auto h-[80%] mmd:h-[90%]"
                    />
                  </div>
                  <div className="overflow-hidden flex justify-center items-center relative z-20">
                    <img
                      src={`/pandora/images/img${thirdRow[1]}.png`}
                      alt=""
                      className="w-auto h-[80%] mmd:h-[90%]"
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="overflow-hidden flex justify-center items-center relative w-[70%] mx-auto z-20 imgBox"
                  style={{
                    backgroundImage: `url(/pandora/images/imgsBg.png)`,
                    backgroundPosition: "top",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                ></div>
              )}

              {/* Third Column */}
              {thirdSpinEnd ? (
                <div className="grid grid-cols-1 grid-rows-3 w-full h-full relative overflow-hidden">
                  <div className="overflow-hidden flex justify-center items-center relative z-20">
                    <img
                      src={`/pandora/images/img${firstRow[2]}.png`}
                      alt=""
                      className="w-auto h-[80%] mmd:h-[90%]"
                    />
                  </div>
                  <div className="overflow-hidden flex justify-center items-center relative z-20">
                    <img
                      src={`/pandora/images/img${secondRow[2]}.png`}
                      alt=""
                      className="w-auto h-[80%] mmd:h-[90%]"
                    />
                  </div>
                  <div className="overflow-hidden flex justify-center items-center relative z-20">
                    <img
                      src={`/pandora/images/img${thirdRow[2]}.png`}
                      alt=""
                      className="w-auto h-[80%] mmd:h-[90%]"
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="overflow-hidden flex justify-center items-center relative w-[70%] mx-auto z-20 imgBox"
                  style={{
                    backgroundImage: `url(/pandora/images/imgsBg.png)`,
                    backgroundPosition: "top",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                ></div>
              )}
              {/* Matched Background  */}
              <div
                className="absolute top-[33.33%] left-0 w-full h-[33.33%] z-10 bg-yellowGradient opacity-50"
                style={{
                  backgroundImage: `url(/pandora/images/matchBg.png)`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "100% 100%",
                }}
              ></div>

              {/* Matched Line */}
              {/* <div className="absolute top-[48.5%] left-0 w-full h-[3%] z-20 bg-yellowGradient rounded-full"></div> */}
            </div>
          </div>

          {/* Marketplace Icon */}
          <div className="absolute left-[47%] mmd:left-[44.5%] top-[80.5%] mmd:top-[82.2%] h-fit w-fit z-20">
            <div
              onClick={() =>
                item?.trading ? setMarketplaceOpen(!marketplaceOpen) : null
              }
              className="w-[5vh] ssm:w-[6vw] mmd:w-[6vh] h-[5vh] ssm:h-[6vw] mmd:h-[6vh] text-center rounded-[9.5vh] bg-[linear-gradient(0deg,#e46e00_0%,#ffd43e_100%)] p-[0.4vh] transition-all duration-300 relative cursor-pointer"
            >
              <div className="rounded-[9.4vh] h-full w-full bg-[linear-gradient(180deg,#e46e00_0%,#ffd43e_100%)] flex justify-center items-center">
                <img
                  src="/marketplace.png"
                  alt=""
                  className="w-[2.4vh] ssm:w-[2.8vw] md:w-[2.2vh] mdd:w-[2.8vh] -mt-[3px]"
                />
              </div>
            </div>
          </div>

          {/* Spin Button */}
          <div className="absolute left-[22%] mmd:left-[25%] top-[81%] h-[8%] w-[20%] mmd:w-[15%] z-20">
            <div className="w-full h-full  text-center rounded-[9.5vh] bg-[linear-gradient(0deg,#e46e00_0%,#ffd43e_100%)] p-[0.4vh] shadow-[0px_8px_10px_#00000090] hover:shadow-[0px_8px_10px_#00000040] transition-all duration-300 relative">
              <Button
                onClick={() => {
                  setClaimOpen(true);
                }}
                className={`font-bold rounded-[9.4vh] text-[2vh] mdd:text-[2.5vh] h-full w-full text-white relative overflow-hidden lightOnHoverViolet bg-[linear-gradient(180deg,#e46e00_0%,#ffd43e_100%)]   ${
                  buttonAllowed && "cursor-not-allowed"
                }`}
              >
                Claim
              </Button>
              {/* <Button
                onClick={(e) => claim()}
                className={`font-bold rounded-[9.4vh] text-[2.5vh] h-full w-full text-white relative overflow-hidden lightOnHoverViolet bg-[linear-gradient(180deg,#e46e00_0%,#ffd43e_100%)]   ${
                  buttonAllowed && "cursor-not-allowed"
                }`}
              >
                claim
              </Button> */}

              {/* Side Images */}
              <img
                src="/pandora/images/crystal.png"
                alt=""
                className="absolute top-[50%] translate-y-[-58%] -left-[18%] h-full w-auto z-[-1] transform scale-x-[-1]"
              />
              <img
                src="/pandora/images/crystal.png"
                alt=""
                className="absolute top-[50%] translate-y-[-58%] -right-[18%] h-full w-auto z-[-1]"
              />
            </div>
          </div>
          {/* Claim Button */}
          <div
            className={`absolute left-[48%] mmd:left-[46%] top-[81%] mdd:top-[81%] z-20 ${
              !claim_fund && "hidden"
            }`}
          >
            <div className="w-full h-full  text-center rounded-[9.5vh] bg-[linear-gradient(0deg,#e46e00_0%,#ffd43e_100%)] p-[0.4vh] shadow-[0px_8px_10px_#00000090] hover:shadow-[0px_8px_10px_#00000040] transition-all duration-300 relative">
              <Button
                onClick={() => {
                  !buttonAllowed && claim();
                }}
                className={`font-bold rounded-[9.4vh] text-[2vh] mdd:text-[2.5vh] h-full w-full text-white relative overflow-hidden lightOnHoverViolet bg-[linear-gradient(180deg,#e46e00_0%,#ffd43e_100%)] mdd:px-[4.6vh] py-[0.4vh] mdd:py-[0.9vh] `}
              >
                Claim
              </Button>

              {/* Side Images */}
              <img
                src="/pandora/images/crystal.png"
                alt=""
                className="absolute top-[50%] translate-y-[-58%] -left-[18%] h-full w-auto z-[-1] transform scale-x-[-1]"
              />
              <img
                src="/pandora/images/crystal.png"
                alt=""
                className="absolute top-[50%] translate-y-[-58%] -right-[18%] h-full w-auto z-[-1]"
              />
            </div>
          </div>
          {/* Claim Button */}

          {/* Collections Name */}
          <div className="bg-[#84575B] w-[40%] mdd:w-[20%] absolute bottom-[-20%] md:bottom-[-15%] mdd:bottom-auto mdd:top-[36%] left-[6%] mdd:left-[56.8%] z-20 rounded-none mdd:rounded-r-[1vh]">
            <div className="p-2 mdd:p-[0.8vh] text-white font-bold text-[2.6vw] mdd:text-[1.9vh]">
              <h2 className="grid grid-cols-2 border-b border-white/30 py-[1vw] mdd:py-[1vh]">
                <span className="text-[#FED13C]">Collection</span>
                <span>: {item?.name}</span>
              </h2>
              <h2 className="grid grid-cols-2 border-b border-white/30 py-[1vw] mdd:py-[1vh]">
                <span className="text-[#FED13C]">Boxes Minted</span>
                <span>: {item?.boxesMinted}</span>
              </h2>
              <h2 className="grid grid-cols-2 py-[1vw] mdd:py-[1vh]">
                <span className="text-[#FED13C]">Price</span>
                <span>: {item?.price}</span>
              </h2>
            </div>
          </div>

          {/* audio */}
          <div className="absolute left-[2%] mmd:left-[12.5%] top-[81%] mmd:top-[82.5%] h-fit w-fit z-20">
            <div className="absolute left-[-100px] hidden">
              <audio className="" controls>
                <source src="/pandora/audio/win.mp3" type="audio/ogg" />
              </audio>
            </div>
            <Badge>
              <div className="w-[5vh] ssm:w-[6vw] mmd:w-[6vh] h-[5vh] ssm:h-[6vw] mmd:h-[6vh] text-center rounded-[9.5vh] bg-[linear-gradient(0deg,#e46e00_0%,#ffd43e_100%)] p-[0.4vh] transition-all duration-300 relative">
                <div
                  // onClick={() => setShowBoxes(!showBoxes)}
                  className="rounded-[9.4vh] h-full w-full bg-[linear-gradient(180deg,#e46e00_0%,#ffd43e_100%)] flex justify-center items-center"
                >
                  {/* <img
                    src="/pandora/images/boxs.png"
                    alt=""
                    className="w-[3.4vh] ssm:w-[3.8vw] md:w-[3.8vh] h-auto"
                  /> */}

                  <div
                    onClick={() => {
                      setMusicMute(!music_mute);
                      spinAudioRef.current.pause();
                    }}
                    className="relative overflow-hidden cursor-pointer"
                  >
                    {/* line */}
                    <div
                      className={`absolute top-[34%] -left-0  ${
                        !music_mute && "hidden"
                      }`}
                    >
                      <div className="w-[40px] h-[1.7px] rounded bg-black/50 -rotate-[38deg]"></div>
                    </div>
                    {/* line */}
                    <GiMusicalNotes className="text-[3.4vh] text-black/50 ssm:text-[3.8vw] md:text-[3.8vh]" />
                  </div>
                </div>
              </div>
            </Badge>
          </div>
          {/* audio */}
          {/* Boxes */}
          <div className="absolute left-[9%] cursor-pointer mmd:left-[17%] top-[81%] mmd:top-[82.5%] h-fit w-fit z-20">
            <Badge
              badgeContent={boxes.length}
              classes={{
                badge:
                  "bg-cusViolet text-white text-[1.6vh] ssm:text-[2.0vh] font-bold h-[2.8vh] px-[1.2vh] rounded-full",
              }}
            >
              <div className="w-[5vh] ssm:w-[6vw] mmd:w-[6vh] h-[5vh] ssm:h-[6vw] mmd:h-[6vh] text-center rounded-[9.5vh] bg-[linear-gradient(0deg,#e46e00_0%,#ffd43e_100%)] p-[0.4vh] transition-all duration-300 relative">
                <div
                  onClick={() => setUserOpen(!userOpen)}
                  className="rounded-[9.4vh] h-full w-full bg-[linear-gradient(180deg,#e46e00_0%,#ffd43e_100%)] flex justify-center items-center"
                >
                  <img
                    src="/pandora/images/boxs.png"
                    alt=""
                    className="w-[3.4vh] ssm:w-[3.8vw] md:w-[3.8vh] h-auto"
                  />
                </div>
              </div>
            </Badge>
          </div>
        </div>

        <div className="mmd:hidden bg-[#382639] fixed h-[20vh] ssm:h-[17vh] w-full left-0 bottom-0 z-0"></div>

        <div className="w-screen h-screen fixed left-0 bottom-0 translate-y-20 z-10 flex justify-center items-end">
          <img
            src="/pandora/images/256MAN2.png"
            alt=""
            className="h-auto mmd:h-full w-full object-fill mmd:object-cover object-bottom"
          />
          {/* This line right here */}
          <h4 className="text-small z-100 absolute bottom-0 left-0 font-bold text-white leading-none -mt-[0.5vh] whitespace-nowrap uppercase">
            Displayed Results may not be 100% accurate during first releases.
          </h4>
        </div>

        {spinResultModalOpen && (
          <SpinResultModal
            opened={spinResultModalOpen}
            spinResult={spinResult}
            close={setSpinResultModalOpen}
          />
        )}

        <ConnectWalletModal
          open={open}
          close={setOpen}
          setXverse={setXVerseAddress}
          setAddress={setOrdinalsAddress}
          wallet={wallet}
          setWallet={setWallet}
        />

        <div style={{ zIndex: 11 }}>
          <ParticleBackground />
        </div>
      </div>

      {/* Marketplace */}
      <PandoraMarketplace
        open={marketplaceOpen}
        trading={item?.trading}
        state={stateValues}
        address={ordinalsAddress}
        wallet={wallet}
        close={setMarketplaceOpen}
        pandora={item?.name}
      />

      {/* User Boxes */}
      <UserBoxModal
        open={userOpen}
        close={setUserOpen}
        price={item?.price}
        xverse={xverseAddr !== "" ? xverseAddr : null}
        user={ordinalsAddress}
        pandora={item?.name}
      />

      <ClaimModal
        open={claimOpen}
        pandora={item?.name}
        wallet={wallet}
        address={ordinalsAddress}
        xverse={xverseAddr}
        close={setClaimOpen}
      />
    </>
  );
};

export default PandoraMintBTC;
