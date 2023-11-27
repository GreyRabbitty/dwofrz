import { Modal, Box, IconButton, Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { useEffect, useState } from "react";
import SellerDetailsModal from "./SellerDetailsModal";

// wallet
import {
  sendWithHiroPlain,
  sendWithUniPlain,
  sendWithXVersePlain,
} from "../../../data/BTCSendTX";

// icons
import { IoClose, IoPizzaOutline, IoDiamondOutline } from "react-icons/io5";
import { BsDice6 } from "react-icons/bs";
import { CgSandClock } from "react-icons/cg";
import { GiStoneBlock } from "react-icons/gi";
import axios from "axios";
import { BASE_URL2 } from "../../../pages/api/pandora/pandora_apis";
import UserListModal from "./UserListModal";
import { truncate } from "../../utils/utils";
import { sign } from "jsonwebtoken";
import { SendTransactionError } from "@solana/web3.js";

const bosStyle =
  "bg-[linear-gradient(7deg,#121417_0%,#282A33_100%)] outline-none absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] w-full h-fit overflow-auto shadow-xl p-5 ssm:rounded-lg mdd:rounded-2xl";

const ClaimModal = ({ open, close, pandora, wallet, xverse, address }) => {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [receivingAddress, setReceivingAddress] = useState("");
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");
  const [satOption, setSatOption] = useState("random");
  const winners = [
    "bc1qc28l0g004vv06zntzy7rnqmq2d09mj08ymyyhe",
    "3DsacJnJYoXjxWLFHWWLoV9xw8MmcyUfpB",
    "bc1p09ddppj4mrg8nsv2m5pr98t2wj3jcgt0vje963ygt4jucw750ycqkl6xzt",
    "35bjRUbjyiVvUaZf1FfJZWSxBYASgoF5Wp",
    "3LSqXhZQNqqjpvEPLDzCPWPsvtq1EgbKrK",
    "bc1p0fhhfpw3ysqgmhvvdr40caxrza5wa8mrulhsk0qd0nhrx2zzgngshdauta",
    "bc1qv228zxp0yucul40y4fnugauhzvzf740smtdmm9",
    "tb1qv228zxp0yucul40y4fnugauhzvzf740s3dkgqk",
    "bc1pxuegecyl6gdr5lxus5uutul05kvc25mmkqndgqcdpamwjecpvnpsa6zt09",
    "bc1pzxm0zen0u06pr8u08na87t4370pypzl5ejvvl3nt24a8jhhu6d3s2rkggw",
    "bc1p36q28ymdda60ldwhh6s2c7ku7ltsq4zuu02pxlds4p3lt6ut22aqrdxpcy",
    "bc1p8y7gzctzpjfdfwqu0gf00walz26yss7f9rcxf9st59t5n3tsg3nq7ymzx8",
    "bc1p6ntnlm0urrxc5j9cq72agwqdec49jkezxa873wr9x40u2u06jslqvccydn",
  ];

  const handleTransfer = async (price, to) => {
    if (wallet === 0) {
      return "No Wallet connected";
    }
    if (wallet === 1) {
      let tx = await sendWithHiroPlain(price, to);
    } else if (wallet === 2) {
      let tx = await sendWithUniPlain(price, to);
    } else if (wallet === 3) {
      let btcPayload = {
        network: "Mainnet",
        amountSats: price,
        recipientAddress: to,
        userAddress: xverse,
        message: `Inscription for 256 Mint`,
      };

      let sendTxOptions = {
        payload: btcPayload,
        onFinish: (response) => {
          // console.log(response);
        },
        onCancel: () => {
          // console.log("User cancelled transaction");
        },
      };

      await sendWithXVersePlain(sendTxOptions);
    }
  };

  const isWinner = () => {
    for (let i = 0; i < winners.length; i++) {
      if (
        winners[i].toString() === receivingAddress.toString() ||
        address.toString()
      ) {
        return true;
      }
    }
    return false;
  };

  const sendClaim = () => {
    let winner = isWinner();
    if (winner) {
      setError("");
      let data = {
        fee: 12,
        collection: {
          id: "256BTC",
          count: 1,
        },
        rareSats: satOption,
        receiveAddress: receivingAddress,
        lowPostage: true,
      };

      axios
        .post("https://api2.ordinalsbot.com/collectionorder", data, {
          headers: {
            "x-api-key": "8c0688e6-ef81-4ddf-8fa7-68a654894f46",
          },
        })
        .then((res) => {
          handleTransfer(res.data.charge.amount, res.data.charge.address);
          setOrderId(res.data.charge.id);
        });
    } else {
      setError("Claim is for winners only");
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => close(false)}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      classes={{
        root: "z-[99999]",
        backdrop: "backdrop-blur",
      }}
    >
      <Fade in={open}>
        <Box
          className={`${bosStyle} max-w-screen-ssm xsm:max-w-screen-md mdd:max-w-screen-mdd llg:max-w-screen-mmd`}
        >
          <div className="mb-3 llg:mb-5 flex justify-between items-center -mt-2">
            <h1 className="text-2xl self-center llg:text-3xl font-bold text-white">
              Claim your {pandora} Ordinal
            </h1>

            <IconButton
              onClick={() => close(false)}
              className="text-white text-2xl llg:text-3xl"
            >
              <IoClose />
            </IconButton>
          </div>

          <div className="bg-cusEL-200/40 px-4 llg:px-5 py-2 llg:py-3 self-center rounded-lg max-w-screen-md llg:max-w-screen-mdd">
            <h2 className="text-lg mdd:text-xl llg:text-2xl font-extrabold text-transparent bg-clip-text bg-yellowGradient">
              Inscribe on
            </h2>
            <div className="flex flex-row justify-between">
              <div
                onClick={() => setSatOption("pizza")}
                className="bg-[linear-gradient(7deg,#f28337_0%,#f45e0b_100%)] gap-2 text-center cursor-pointer flex active:-translate-y-3 shadow-md flex-row rounded-md p-2 w-fit m-1 justify-between content-center"
              >
                <IoPizzaOutline size={50} />
                <div className="flex flex-col">
                  <h3 className="text-gray-200">Pizza Block</h3>
                  <p className="text-black">10k BTC Pizza transaction</p>
                </div>
              </div>
              <div
                onClick={() => setSatOption("uncommon")}
                className="bg-[linear-gradient(7deg,#f28337_0%,#f45e0b_100%)] shadow-md active:-translate-y-3 gap-2 text-center cursor-pointer flex flex-row rounded-md p-2 w-fit m-1 justify-between content-center"
              >
                <IoDiamondOutline size={50} />
                <div className="flex flex-col">
                  <h3 className="text-gray-200">Uncommon</h3>
                  <p className="text-black">First Sat/Block</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div
                onClick={() => setSatOption("random")}
                className="bg-[linear-gradient(7deg,#f28337_0%,#f45e0b_100%)] shadow-md active:-translate-y-3 gap-2 text-center cursor-pointer flex flex-row rounded-md p-2 w-fit m-1 justify-between content-center"
              >
                <BsDice6 size={50} />
                <div className="flex flex-col">
                  <h3 className="text-gray-200">Random</h3>
                  <p className="text-black">Inscribe on anything(cheapest)</p>
                </div>
              </div>
              <div
                onClick={() => setSatOption("block78")}
                className="bg-[linear-gradient(7deg,#f28337_0%,#f45e0b_100%)] shadow-md active:-translate-y-3 gap-2 text-center cursor-pointer flex flex-row rounded-md p-2 w-fit m-1 justify-between content-center"
              >
                <GiStoneBlock size={50} />
                <div className="flex flex-col">
                  <h3 className="text-gray-200">Block 78</h3>
                  <p className="text-black">Mined by Hal Finney</p>
                </div>
              </div>
            </div>
            <h3 className="self-center text-orange-500">
              {" "}
              Sat Option: {satOption}
            </h3>
            <div>
              <h2 className="text-lg mdd:text-xl llg:text-2xl font-extrabold text-transparent bg-clip-text bg-yellowGradient">
                Receiving Address
              </h2>
              <input
                onChange={(e) => setReceivingAddress(e.target.value)}
                type={"text"}
                placeholder="Ordinals Address"
                className="rounded-md text-orange-500 border-white border p-2 w-full h-10"
              ></input>
            </div>
            <Button
              size="large"
              onClick={() => sendClaim()}
              className="px-10 m-1 lightOnHoverVioletFull self-center font-semibold rounded-md text-sm mdd:text-base lgg:text-lg h-10 ssm:h-11 lg:h-14 bg-yellowGradient text-white relative overflow-hidden"
            >
              Claim
            </Button>
            {error !== "" ? (
              <h3 className="self-center font-bold text-orange-500">{error}</h3>
            ) : null}
            {orderId !== "" ? (
              <h3 className="self-center font-bold text-orange-500">
                {" "}
                ORDER ID: {orderId} ,
                <span className="m-2">
                  Keep your Order ID a secret, if any issue arises contact the
                  team with this Order #
                </span>
              </h3>
            ) : null}
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ClaimModal;
