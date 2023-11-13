import React, { useEffect, useRef, useState } from "react";
// import { shuffle, getRandNum } from "../../hooks/shuffle";
import { Button } from "@mui/material";
import Badge from "@mui/material/Badge";
import Skeleton from "@mui/material/Skeleton";
import * as anchor from "@project-serum/anchor";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import Image from "next/image";
import { GiMusicalNotes } from "react-icons/gi";
import { toast } from "react-toastify";
import winners from "../../../data/raffle.json";
import {
    getPandora,
    spinPandora,
} from "../../../pages/api/pandora/pandora_calls";
import redhorn from "../../../public/pandora/images/red_stone.jpg";
import pandoraclaim from "../../../public/pandoraclaim.png";
import ParticleBackground from "../../Pandora/ParticleBackground";
import SpinResultModal from "../../Pandora/SpinResultModal";
import {
    generateRandomNumber,
    mintBox,
    revealBox,
} from "../../programs/solana/pandora/calls";
import { initialze_claim } from "../../programs/solana/pandora/claim";
import idl from "../../programs/solana/pandora/idl.json";
import PandoraMarketplace from "../PandoraMarketplace/PandoraMarketplace";

const PandoraMintSOL = () => {
  const [spinResultModalOpen, setSpinResultModalOpen] = useState(false);
  const [firstSpinEnd, setFirstSpinEnd] = useState(true);
  const [secondSpinEnd, setSecondSpinEnd] = useState(true);
  const [thirdSpinEnd, setThirdSpinEnd] = useState(true);
  const [firstRow, setFirstRow] = useState([1, 2, 3]);
  const [secondRow, setSecondRow] = useState([2, 3, 1]);
  const [thirdRow, setThirdRow] = useState([1, 1, 3]);
  const [boxesMinted, setBoxesMinted] = useState(0);
  const [buttonAllowed, setButtonAllowed] = useState(false);
  const [claim_fund, setClaimFund] = useState();
  const [loading, setLoading] = useState(true);
  const [showBoxes, setShowBoxes] = useState(false);
  const [boxes, setBoxes] = useState([]);
  const [music_mute, setMusicMute] = useState(false);

  // marketplace
  const [marketplaceOpen, setMarketplaceOpen] = useState(false);

  // const boxes22 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  const [spinResult, setSpinResult] = useState(null);
  const wallet = useWallet();
  const anchorWallet = useAnchorWallet();

  const { setVisible } = useWalletModal();
  const [nbrOutcome, setNbrOutcome] = useState(0);

  // console.log(secondRow);
  const spinAudioRef = useRef(null);
  const WinAudioRef = useRef(null);

  // const connection = new Connection(clusterApiUrl("devnet"));
  const connection = new anchor.web3.Connection(
    "https://necessary-blue-tab.solana-mainnet.quiknode.pro/add199e47039f22ea6b07d8eade4cec69b1908b9/"
  );
  const pandoraPDA = new PublicKey(
    "9DmAGVkQ3DiRL5QvrTceMJfK1oNpzSXpMG8D3bmhavKv"
  );
  const programId = new PublicKey(
    "6a5yq8MBcizhoqEv1GSJzNHfc7XYPNMN3wzrHd9nBEPU"
  );

  const randomTables = [
    [
      [1, 2, 3],
      [2, 3, 1],
      [1, 2, 3],
      [3, 2, 1],
      [2, 1, 3],
    ],
    [
      [3, 2, 1],
      [1, 3, 2],
      [1, 2, 3],
      [3, 2, 1],
      [2, 1, 3],
    ],
    [
      [2, 1, 3],
      [3, 2, 1],
      [1, 3, 2],
      [2, 1, 3],
      [1, 3, 2],
    ],
    [
      [2, 1, 3],
      [1, 2, 3],
      [2, 3, 1],
      [1, 2, 3],
      [3, 1, 2],
    ],
    [
      [2, 1, 3],
      [1, 2, 3],
      [3, 2, 1],
      [1, 2, 3],
      [3, 1, 2],
    ],
  ];
  const winTable = [
    [1, 2, 3],
    [3, 3, 3],
    [2, 2, 2],
    [1, 1, 1],
    [2, 3, 1],
  ];
  /* function getRandomInt1() {
    let row2 = Math.floor(Math.random() * 9);
    return row2;
  }
  let res1 = getRandomInt1();
  let res2 = getRandomInt2();
  function getRandomInt2() {
    let row2 = Math.floor(Math.random() * 9);
    return row2;
  } */
  const option = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const randomforfirstrow = () => {
    return option[Math.floor(Math.random() * option.length)];
  };

  const claim = async () => {
    try {
      setButtonAllowed(true);
      notify_laoding("Transaction Pending...");
      if (!anchorWallet) return;
      const tx = await initialze_claim(anchorWallet, connection, pandoraPDA);
      const signed_tx = await wallet.signTransaction(tx);

      const hash = await connection.sendRawTransaction(signed_tx.serialize());
      const confirmation = await connection.confirmTransaction(
        hash,
        "finalized"
      );

      if (confirmation.value.err) {
        return console.error(confirmation.value.err);
      }
      setClaimFund(false);
      notify_delete();
      notify_success("Transaction Success!");
      setButtonAllowed(false);
    } catch (e) {
      notify_delete();
      notify_error("Transaction Failed!");
      console.log(e);
    } finally {
      setButtonAllowed(false);
    }
  };

  // Mint from Pandora
  const mintBoxes = async (e) => {
    try {
      e.preventDefault();
      setButtonAllowed(true);
      // notify_laoding("Transaction Pending...")
      await mintBox(pandoraPDA, 50, wallet).then(async (res) => {
        const { transaction, pandoraBoxPda, program, random, number } = res;
        const signed_tx = await wallet.signTransaction(transaction);

        const hash = await connection.sendRawTransaction(signed_tx.serialize());
        startSpin();

        const confirmation = await connection.confirmTransaction(
          hash,
          "processed"
        );
        if (confirmation.value.err) {
          endSpin(4);
          return console.error(confirmation.value.err);
        }
        const resp_index = await fetch("/api/database/update_user_pda_id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address: wallet.publicKey.toBase58(),
            index: number,
          }),
        });
        // const account = await program.account.pandoraBox.fetch(pandoraBoxPda);
        // 1 is for minting 1 box
        // 2 is for minting 2 box with the price of one
        // 3 is for minting 1 box with half the price
        // 4 mint nothing
        if (random == 4 || random == 3) {
          setTimeout(() => {
            setClaimFund(true);
          }, 5000);
        }
        endSpin(random);
      });
      // .catch((err) => {
      //   console.log(err);
      //   return;
      // });
      // notify_delete()
      // notify_success("Transaction Success!")
    } catch (err) {
      setButtonAllowed(false);
      // notify_delete()
      // notify_error("Transaction Failed!")
    }
  };
  // trigger spin animation
  const startSpin = async () => {
    if (!wallet) {
      return;
    }
    // Will just hard-code this one since this wont be to scale and is different than all other pandoras will be
    try {
      setFirstSpinEnd(false);
      setSecondSpinEnd(false);
      setThirdSpinEnd(false);
      if (music_mute == false) {
        spinAudioRef.current.play();
      }
      // let num = randomNum();
      // const spinResult = await spinPandora(num);
      // const parseRes = JSON.parse(spinResult.data);
      // console.log(parseRes);
      // if (!parseRes) {
      //   throw new Error("Something wrong here");
      // }
      // console.log(parseRes);
      // // console.log(getRandomInt1(9));
      // // console.log(getRandomInt2(9));
      // // console.log(randomTables[4][parseRes.array[0][2]]);

      // setFirstRow(randomTables[outcome][parseRes.array[2][2]]);
      // setSecondRow(
      //   outcome !== 4
      //     ? winTable[outcome]
      //     : randomTables[outcome][parseRes.array[1][1]]
      // );
      // setThirdRow(randomTables[outcome][parseRes.array[0][0]]);
      // setSpinResult(parseRes.msg);

      // setTimeout(() => {
      //   setFirstSpinEnd(true);
      // }, 1800);

      // setTimeout(() => {
      //   setSecondSpinEnd(true);
      // }, 3000);

      // setTimeout(() => {
      //   setThirdSpinEnd(true);
      //   spinAudioRef.current.currentTime = 0;
      //   spinAudioRef.current.pause();
      // }, 3800);

      // setTimeout(() => {
      //   setSpinResultModalOpen(true);
      //   setButtonAllowed(false);
      // }, 4500);
    } catch (e) {
      console.log(e);
    }
  };

  const endSpin = async (outcome) => {
    try {
      setNbrOutcome(outcome);
      const spinResult = await spinPandora(outcome);
      const parseRes = JSON.parse(spinResult.data);

      if (!parseRes) {
        throw new Error("Something wrong here");
      }
      setFirstRow(parseRes.array[0]);
      setSecondRow(parseRes.array[1]);
      setThirdRow(parseRes.array[2]);
      // console.log(getRandomInt1(9));
      // console.log(getRandomInt2(9));
      // console.log(randomTables[4][parseRes.array[0][2]]);

      setFirstRow(randomTables[outcome][parseRes.array[2][2]]);
      setSecondRow(
        outcome !== 4
          ? winTable[outcome]
          : randomTables[outcome][parseRes.array[1][1]]
      );
      setThirdRow(randomTables[outcome][parseRes.array[0][0]]);
      setSpinResult(parseRes.msg);

      // setTimeout(() => {
      setTimeout(() => {
        setFirstSpinEnd(true);
        // }, 4000);
      }, 1800);

      setTimeout(() => {
        setSecondSpinEnd(true);
      }, 1000);

      setTimeout(() => {
        setThirdSpinEnd(true);
        spinAudioRef.current.currentTime = 0;
        spinAudioRef.current.pause();
      }, 2400);

      setTimeout(() => {
        setSpinResultModalOpen(true);
        setButtonAllowed(false);
      }, 3500);
    } catch (e) {
      console.log(e);
    }
  };

  async function get_boxes() {
    try {
      const resp_index = await fetch("/api/database/get_user_pda_id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: wallet.publicKey.toBase58(),
        }),
      });

      const index = (await resp_index.json()).index;
      let finishing = false;
      const arr = [];
      let i = 1;
      do {
        const bnAmt = new anchor.BN(i);
        const bufferAmount = bnAmt.toArrayLike(Buffer, "le", 8);

        const [pandoraBoxPda] = PublicKey.findProgramAddressSync(
          [
            Buffer.from("PANDORABOX"),
            wallet.publicKey.toBuffer(),
            pandoraPDA.toBuffer(),
            bufferAmount,
            Buffer.from("ONE"),
          ],
          programId
        );

        const [pandoraBoxPda2] = PublicKey.findProgramAddressSync(
          [
            Buffer.from("PANDORABOX"),
            wallet.publicKey.toBuffer(),
            pandoraPDA.toBuffer(),
            bufferAmount,
            Buffer.from("TWO"),
          ],
          programId
        );

        const balance = await connection.getBalance(pandoraBoxPda);
        console.log(balance);
        if (balance > 0) {
          const provider = new anchor.AnchorProvider(connection, wallet, {
            preflightCommitment: "processed",
          });
          const program = new anchor.Program(idl, programId, provider);
          try {
            const claimer_output1 = await program.account.pandoraBox.fetch(
              pandoraBoxPda
            );
            if (claimer_output1.isBox) {
              const box = {
                box: pandoraBoxPda.toBase58(),
                is_winner: false,
              };

              winners.map((winner) => {
                if (winner.box == pandoraBoxPda.toBase58()) {
                  console.log("winner");
                  box.is_winner = true;
                }
              });

              arr.push(box);
            }
          } catch (e) {
            console.log(e);
          }
          try {
            const claimer_output = await program.account.pandoraBox.fetch(
              pandoraBoxPda2
            );
            if (claimer_output.isBox) {
              const box = {
                box: pandoraBoxPda2.toBase58(),
                is_winner: false,
              };

              winners.map((winner) => {
                if (winner.box == pandoraBoxPda2.toBase58()) {
                  console.log("winner");
                  box.is_winner = true;
                }
              });

              arr.push(box);
            }
          } catch (e) {
            console.log(e);
          }
        } else {
          finishing = true;
        }
        i++;
      } while (i <= index);
      // } while (finishing == false);
      console.log(arr);
      setBoxes(arr);
    } catch (e) {
      console.log(e);
    }
  }

  async function reveal(index) {
    try {
      notify_laoding("Transaction Pending...");
      const box_pub = new PublicKey(boxes[index].box);
      const tx = await revealBox(wallet, pandoraPDA, box_pub);

      const signed_tx = await wallet.signTransaction(tx);

      const hash = await connection.sendRawTransaction(signed_tx.serialize());

      const confirmation = await connection.confirmTransaction(
        hash,
        "confirmed"
      );
      notify_delete();
      if (confirmation.value.err) {
        notify_error("Transaction Failed!");
        return console.log(confirmation.value.err);
      }
      notify_success("Transaction Successful!");
    } catch (e) {
      notify_delete();
      notify_error("Transaction Failed!");
      console.log(e);
    }
  }

  const [collName, setCollName] = useState(null);
  useEffect(() => {
    if (!anchorWallet) return;
    (async () => {
      try {
        setLoading(true);
        const provider = new anchor.AnchorProvider(connection, wallet, {
          preflightCommitment: "processed",
        });
        const program = new anchor.Program(idl, programId, provider);

        const [claimer] = PublicKey.findProgramAddressSync(
          [
            Buffer.from("CLAIMER"),
            wallet.publicKey.toBuffer(),
            pandoraPDA.toBuffer(),
          ],
          programId
        );
        const claimer_output = await program.account.claimer.fetch(claimer);
        if (claimer_output.state !== "nothing") {
          setClaimFund(true);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
    get_boxes();

    const getPandoraApi = async () => {
      try {
        const res = await getPandora("0");
        setCollName(res.data.name);
        setBoxesMinted(res.data.boxesMinted);
      } catch (error) {
        console.log(error);
      }
    };
    getPandoraApi();
  }, [anchorWallet]);
  // -------------------

  useEffect(() => {
    if (
      spinResultModalOpen &&
      (nbrOutcome === 1 ||
        nbrOutcome === 2 ||
        nbrOutcome === 3 ||
        nbrOutcome === 4)
    ) {
      WinAudioRef.current.play();
    } else {
      WinAudioRef.current.currentTime = 0;
      WinAudioRef.current.pause();
    }
  }, [spinResultModalOpen]);

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

  return (
    <>
      <div
        className="mt-[-70px] mmd:mt-[-80px] w-screen h-screen flex justify-stretch items-center mmd:items-end overflow-hidden relative z-[1]"
        style={{
          backgroundImage: `url(/pandora/images/pandoraBg.png)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
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
            backgroundImage: `url(/pandora/images/board.png)`,
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
              onClick={() => setMarketplaceOpen(!marketplaceOpen)}
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
                // onClick={(e) => {
                //   !loading &&
                //   !buttonAllowed &&
                //   //  !claim_fund &&
                //     mintBoxes(e);
                // }}
                className={`font-bold rounded-[9.4vh] text-[2vh] mdd:text-[2.5vh] h-full w-full text-white relative overflow-hidden lightOnHoverViolet bg-[linear-gradient(180deg,#e46e00_0%,#ffd43e_100%)]   ${
                  buttonAllowed && "cursor-not-allowed"
                }`}
              >
                Spin End
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
          <div className="absolute left-[28.6%] mmd:left-[26.6%] top-[2.4%] mdd:top-[2.4%] h-[6%] w-[20%] mmd:w-[15%] z-20">
            {!collName ? (
              <Skeleton
                classes={{
                  root: "bg-[#573A4990] rounded-[0.7vh] h-[2.4vh] w-[76%]",
                }}
              />
            ) : (
              <h2 className="text-[2.4vw] sm:text-[2vw] md:text-[1.6vw] lg:text-[2.4vh] -translate-x-6 font-bold text-[#f09a1b] leading-none -mt-[0.5vh] whitespace-nowrap uppercase">
                {collName}
              </h2>
            )}
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
          <div className="absolute left-[9%] mmd:left-[17%] top-[81%] mmd:top-[82.5%] h-fit w-fit z-20">
            <Badge
              badgeContent={boxes.length}
              classes={{
                badge:
                  "bg-cusViolet text-white text-[1.6vh] ssm:text-[2.0vh] font-bold h-[2.8vh] px-[1.2vh] rounded-full",
              }}
            >
              <div className="w-[5vh] ssm:w-[6vw] mmd:w-[6vh] h-[5vh] ssm:h-[6vw] mmd:h-[6vh] text-center rounded-[9.5vh] bg-[linear-gradient(0deg,#e46e00_0%,#ffd43e_100%)] p-[0.4vh] transition-all duration-300 relative">
                <div
                  onClick={() => setShowBoxes(!showBoxes)}
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

        <div className="w-screen h-screen fixed left-0 bottom-0 z-10 flex justify-center items-end">
          <img
            src="/pandora/images/man_gif.png"
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
            close={setSpinResultModalOpen}
            spinResult={nbrOutcome}
          />
        )}

        <div style={{ zIndex: 11 }}>
          <ParticleBackground />
        </div>
      </div>

      {/* show boxes pop */}
      {showBoxes && (
        <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-black/30 z-[99999] grid place-items-center">
          {/* hidden */}
          <div
            onClick={() => setShowBoxes(false)}
            className="absolute w-full h-full top-0 left-0 -z-10"
          ></div>
          <div className="md:w-[700px] sm:w-full h-[520px] rounded-xl bg-gradient-to-t from-[var(--dwtop)] to-[var(--dwtrakc)] p-[1.9px]">
            <div className="w-full bg-gradient-to-t from-[#222222] to-[#2B2B36] rounded-xl h-full">
              <div
                className="flex sm:justify-center gap-5 sm:gap-10 md:justify-start items-start px-3 py-2 flex-wrap overflow-y-scroll h-[510px] mx-auto "
                id="my-scrollable-component"
              >
                {boxes.length > 0 &&
                  boxes.map((el, i) => (
                    <div
                      className=" relative min-w-[95px] max-w-[100px] max-h-[100px] hover:scale-105 transition-all"
                      key={i}
                    >
                      <Image
                        src={el.is_winner ? redhorn : pandoraclaim}
                        width={100}
                        height={200}
                        alt=""
                      />
                      {!el.is_winner && (
                        <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[1px] grid place-items-center opacity-0 hover:opacity-100 transition-all delay-150">
                          <Button
                            onClick={() => {
                              reveal(i);
                            }}
                            className="uppercase cursor-pointer px-3 customStylesButton4 lightOnHoverViolet h-fit text-xs py-1"
                          >
                            claim
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* hidden */}
        </div>
      )}

      {/* Marketplace */}
      <PandoraMarketplace open={marketplaceOpen} close={setMarketplaceOpen} />
    </>
  );
};

export default PandoraMintSOL;
