import { Modal, Box, IconButton, Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import {
  sendWithHiro,
  sendWithUni,
  sendWithXVerse,
} from "../../../data/BTCSendTX";

// icons
import { IoClose } from "react-icons/io5";
import { truncate } from "../../utils/utils";
import axios from "axios";
import { BASE_URL2 } from "../../../pages/api/pandora/pandora_apis";
import { useState } from "react";

const bosStyle =
  "bg-[linear-gradient(7deg,#121417_0%,#282A33_100%)] outline-none absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] w-full h-fit overflow-auto shadow-xl p-6 xsm:p-8 ssm:rounded-lg mdd:rounded-2xl border border-cusEL-200";

const SellerDetailsModal = ({
  open,
  close,
  collection,
  price,
  id,
  user,
  outcome,
  wallet,
  collectionFp,
  seller,
}) => {
  const [purchaseError, setPurchaseError] = useState("");
  const imageMap = {
    1: "/pandora/images/lootboxes2.png",
    2: "/pandora/images/lootboxes3.png",
    3: "/pandora/images/lootboxes1.png",
  };

  const onPurchaseClick = async () => {
    if (seller === user) {
      setPurchaseError("Can't purchase your own box");
      return;
    }
    if (wallet === 0) {
      return "No Wallet connected";
    }
    if (wallet === 1) {
      let tx = await sendWithHiro(price, seller);
      if (tx) {
        sendPurchase();
      }
    } else if (wallet === 2) {
      let tx = await sendWithUni(price, seller);
      if (tx) {
        sendPurchase();
      }
    } else if (wallet === 3) {
      let btcPayload = {
        network: "Testnet",
        amountSats: price,
        recipientAddress: seller,
        message: `Minting Box for ${name} Pandora by Dworfz`,
      };

      let sendTxOptions = {
        payload: btcPayload,
        onFinish: (response) => {
          sendPurchase();
        },
        onCancel: () => {
          console.log("User cancelled transaction");
        },
      };
      let tx = await sendWithXVerse(sendTxOptions);
    }
  };

  async function sendPurchase() {
    let data = {
      pandora: collection,
      userAddress: user,
      id: id,
    };

    try {
      axios.post(BASE_URL2 + "purchase-box", data).then((res) => {
        close(!open);
      });
    } catch (err) {
      console.log(err);
    }
  }

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
          className={`${bosStyle} max-h-screen max-w-screen-ssm xsm:max-w-screen-xsm llg:max-w-screen-md`}
        >
          <div className="mb-7 flex justify-between items-center -mt-3">
            <h1 className="text-2xl llg:text-3xl font-bold text-white">
              Seller Details
            </h1>
            <IconButton
              onClick={() => close(false)}
              className="text-white text-2xl llg:text-3xl"
            >
              <IoClose />
            </IconButton>
          </div>

          <div className="grid grid-cols-1 xsm:grid-cols-2 gap-7">
            <div>
              <div className="bg-cusEL-200/40 p-3 xsm:p-5 rounded-xl h-56 xsm:h-auto">
                <img
                  src={imageMap[outcome]}
                  alt=""
                  className="h-full xsm:h-auto w-auto xsm:w-full mx-auto"
                />
              </div>
              <h2 className="mt-3 text-base xsm:text-lg text-center font-semibold">
                Box #{id}
              </h2>
            </div>

            <div className="">
              <div className="flex justify-between items-center text-sm xsm:text-base lg:text-xl pb-3 border-b border-white/10">
                <h3 className="text-gray-200">Collection:</h3>
                <h3 className="font-bold text-transparent bg-clip-text bg-yellowGradient">
                  {collection}
                </h3>
              </div>
              <div className="flex justify-between items-center text-sm xsm:text-base lg:text-xl pb-3 border-b border-white/10 mt-4">
                <h3 className="text-gray-200">Seller Address:</h3>
                <h3 className="font-bold text-transparent bg-clip-text bg-yellowGradient">
                  {seller ? truncate(seller, 15) : seller}
                </h3>
              </div>
              <div className="flex justify-between items-center text-sm xsm:text-base lg:text-xl pb-3 border-b border-white/10 mt-4">
                <h3 className="text-gray-200">Selling Price:</h3>
                <h3 className="font-bold text-transparent bg-clip-text bg-yellowGradient">
                  {price} BTC
                </h3>
              </div>
              <div className="flex justify-between items-center text-sm xsm:text-base lg:text-xl pb-3 border-b border-white/10 mt-4">
                <h3 className="text-gray-200">Collection FP:</h3>
                <h3 className="font-bold text-transparent bg-clip-text bg-yellowGradient">
                  {collectionFp} BTC
                </h3>
              </div>

              <div className="mt-4 lg:mt-6 w-full">
                <Button
                  size="large"
                  fullWidth
                  onClick={() => onPurchaseClick()}
                  className="px-10 lightOnHoverVioletFull font-semibold rounded-md text-sm mdd:text-base lgg:text-lg h-10 ssm:h-11 lg:h-14 bg-yellowGradient text-white relative overflow-hidden"
                >
                  BUY NOW
                </Button>
                {purchaseError !== "" ? (
                  <h3 className="text-red-500 font-bold">{purchaseError}</h3>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SellerDetailsModal;
