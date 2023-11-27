import React, { useEffect, useState } from "react";
import { Modal, Box, IconButton, Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { sign } from "jsonwebtoken";

// icons
import { IoClose } from "react-icons/io5";
import { truncate } from "../../utils/utils";
import axios from "axios";
import { BASE_URL2 } from "../../../pages/api/pandora/pandora_apis";

const bosStyle =
  "bg-[linear-gradient(7deg,#121417_0%,#282A33_100%)] outline-none absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] w-full h-fit overflow-auto shadow-xl p-6 xsm:p-8 ssm:rounded-lg mdd:rounded-2xl border border-cusEL-200";

const UserListModal = ({
  open,
  close,
  collection,
  id,
  outcome,
  selling,
  trading,
  price,
  user,
  collectionFp,
  seller,
}) => {
  const [userPrice, setUserPrice] = useState();
  const [priceError, setPriceError] = useState("");
  const imageMap = {
    1: "/pandora/images/lootboxes2.png",
    2: "/pandora/images/lootboxes3.png",
    3: "/pandora/images/lootboxes1.png",
  };

  async function sendListing() {
    if (priceError !== "") {
      return;
    }
    let data = {
      pandora: collection,
      id: id,
      price: userPrice,
    };

    try {
      axios.post(BASE_URL2 + "list-box", data).then((res) => {
        close(!open);
      });
    } catch (err) {
      // console.log(err);
    }
  }

  async function delistBox() {
    let data = {
      pandora: collection,
      id: id,
    };

    try {
      axios.post(BASE_URL2 + "delist-box", data).then((res) => {
        close(!open);
      });
    } catch (err) {
      // console.log(err);
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
              Box Details
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
              <div className="flex justify-between items-center text-sm xsm:text-base lg:text-xl pb-3 border-b border-white/10">
                <h3 className="text-gray-200">Collection FP:</h3>
                <h3 className="font-bold text-transparent bg-clip-text bg-yellowGradient">
                  {collectionFp}
                </h3>
              </div>
              <div className="flex justify-between items-center text-sm xsm:text-base lg:text-xl pb-3 border-b border-white/10 mt-4">
                <h3 className="text-gray-200">Seller Address:</h3>
                <h3 className="font-bold text-transparent bg-clip-text bg-yellowGradient">
                  {seller}
                </h3>
              </div>
              <div className="flex justify-between items-center text-sm xsm:text-base lg:text-xl pb-3 border-b border-white/10 mt-4">
                {!selling ? (
                  <>
                    <h3 className="text-gray-200">Listing Price:</h3>
                    <input
                      type={"number"}
                      onChange={(e) => setUserPrice(e.target.value)}
                      placeholder="1 BTC"
                      className="font-bold rounded-md text-center text-transparent bg-clip-text bg-yellowGradient"
                    ></input>
                  </>
                ) : (
                  <div></div>
                )}
              </div>
              {priceError !== "" ? (
                <h3 className="text-red-500 font-bold">{priceError}</h3>
              ) : (
                ""
              )}

              <div className="mt-4 lg:mt-6 w-full">
                {trading ? (
                  !selling ? (
                    <Button
                      size="large"
                      fullWidth
                      onClick={() => sendListing()}
                      className="px-10 lightOnHoverVioletFull font-semibold rounded-md text-sm mdd:text-base lgg:text-lg h-10 ssm:h-11 lg:h-14 bg-yellowGradient text-white relative overflow-hidden"
                    >
                      LIST NOW
                    </Button>
                  ) : (
                    <Button
                      size="large"
                      fullWidth
                      onClick={() => delistBox()}
                      className="px-10 lightOnHoverVioletFull font-semibold rounded-md text-sm mdd:text-base lgg:text-lg h-10 ssm:h-11 lg:h-14 bg-yellowGradient text-white relative overflow-hidden"
                    >
                      DELIST
                    </Button>
                  )
                ) : (
                  <Button
                    size="large"
                    fullWidth
                    className="px-10 lightOnHoverVioletFull font-semibold rounded-md text-sm mdd:text-base lgg:text-lg h-10 ssm:h-11 lg:h-14 bg-yellowGradient text-white relative overflow-hidden"
                  >
                    Not Trading Yet
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default UserListModal;
