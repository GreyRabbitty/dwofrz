import { Modal, Box, IconButton } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { useEffect, useState } from "react";
import SellerDetailsModal from "./SellerDetailsModal";
import { truncate } from "../../utils/utils";
// icons
import { IoClose } from "react-icons/io5";

// net
import axios from "axios";
import { BASE_URL2 } from "../../../pages/api/pandora/pandora_apis";
import { sign } from "jsonwebtoken";

const bosStyle =
  "bg-[linear-gradient(7deg,#121417_0%,#282A33_100%)] outline-none absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] w-full h-fit overflow-auto shadow-xl p-5 ssm:rounded-lg mdd:rounded-2xl";

const PandoraMarketplace = ({
  open,
  close,
  state,
  trading,
  pandora,
  address,
  wallet,
}) => {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [boxId, setBoxId] = useState(null);
  const [boxes, setBoxes] = useState([
    {
      user: "Swervo",
      price: "1",
    },
    {
      user: "Swervo",
      price: "1",
    },
  ]);
  const [fp, setFP] = useState(0);
  const imageMap = {
    1: "/pandora/images/lootboxes2.png",
    2: "/pandora/images/lootboxes3.png",
    3: "/pandora/images/lootboxes1.png",
  };

  useEffect(() => {
    function getBoxesOnSale() {
      if (pandora) {
        let data = {
          pandora: pandora,
        };
        axios.post(BASE_URL2 + "on-sale", data).then((res) => {
          setBoxes(res.data);
        });
      }
    }

    function getFloor() {
      if (pandora) {
        let data = {
          pandora: pandora,
        };
        axios.post(BASE_URL2 + "get-fp", data).then((res) => {
          setFP(res.data);
        });
      }
    }

    getBoxesOnSale();
    getFloor();
  }, [open, close]);

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
            <h1 className="text-2xl llg:text-3xl font-bold text-white">
              Marketplace
            </h1>

            <IconButton
              onClick={() => close(false)}
              className="text-white text-2xl llg:text-3xl"
            >
              <IoClose />
            </IconButton>
          </div>

          <div className="bg-cusEL-200/40 px-4 llg:px-5 py-2 llg:py-3 grid grid-cols-2 ssm:grid-cols-3 xsm:grid-cols-5 gap-2 xsm:gap-5 rounded-lg max-w-screen-md llg:max-w-screen-mdd">
            <div>
              <h2 className="text-lg mdd:text-xl llg:text-2xl font-extrabold text-transparent bg-clip-text bg-yellowGradient">
                {fp} BTC
              </h2>
              <h4 className="text-xs mdd:text-sm llg:text-base -mt-0.5">
                Floor Price
              </h4>
            </div>
            <div>
              <h2 className="text-lg mdd:text-xl llg:text-2xl font-extrabold text-transparent bg-clip-text bg-yellowGradient">
                {state?.item?.totalVolume}BTC
              </h2>
              <h4 className="text-xs mdd:text-sm llg:text-base -mt-0.5">
                Total Volume
              </h4>
            </div>
            <div>
              <h2 className="text-lg mdd:text-xl llg:text-2xl font-extrabold text-transparent bg-clip-text bg-yellowGradient">
                {state?.item?.volume24hr} BTC
              </h2>
              <h4 className="text-xs mdd:text-sm llg:text-base -mt-0.5">
                24HR Volume
              </h4>
            </div>
            <div>
              <h2 className="text-lg mdd:text-xl llg:text-2xl font-extrabold text-transparent bg-clip-text bg-yellowGradient">
                {state?.item?.boxes?.length}
              </h2>
              <h4 className="text-xs mdd:text-sm llg:text-base -mt-0.5">
                Total Boxes
              </h4>
            </div>
            <div>
              <h2 className="text-lg mdd:text-xl llg:text-2xl font-extrabold text-transparent bg-clip-text bg-yellowGradient">
                {boxes.length > 0 ? boxes.length : "0"}
              </h2>
              <h4 className="text-xs mdd:text-sm llg:text-base -mt-0.5">
                Boxes Listed
              </h4>
            </div>
          </div>

          <div className="grid grid-cols-2 xsm:grid-cols-4 mdd:grid-cols-5 gap-5 mt-5 llg:mt-6 max-h-[50vh] overflow-auto">
            {boxes.length > 0 ? (
              boxes?.map((item, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setSelectedBox(item);
                      setBoxId(item.id);
                      setDetailsModalOpen(!detailsModalOpen);
                    }}
                    className="card h-[170px] ssm:h-[190px] llg:h-[230px] rounded-lg overflow-hidden shadow-xl border border-cusEL-200 cursor-pointer"
                  >
                    <div className="back">
                      <div className="back-content bg-darkGradient flex flex-col">
                        <div className="w-full h-32 ssm:h-36 llg:h-44 relative rounded-t-lg overflow-hidden flex justify-center items-center">
                          <img
                            src={imageMap[item?.outcome]}
                            alt=""
                            className="h-auto w-24 xsm:w-[80%] mx-auto object-center object-cover"
                          />
                        </div>
                        <div className="text-center flex-1 flex flex-col justify-center items-center bg-cusEL-100 border-t border-cusEL-200 rounded-b-lg mb-1">
                          <h4 className="text-gray-200 text-sm mdd:text-base font-bold break-words break-all">
                            Box #{item.id}
                          </h4>
                          <h4 className="text-gray-200 text-sm mdd:text-base font-bold break-words break-all">
                            Price: {item.price} BTC
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h4 className="text-gray-200 text-sm mdd:text-base font-bold break-words break-all">
                No boxes listed
              </h4>
            )}
          </div>

          <SellerDetailsModal
            open={detailsModalOpen}
            close={setDetailsModalOpen}
            collectionFp={fp}
            price={selectedBox?.price}
            id={boxId}
            outcome={selectedBox?.outcome}
            user={address}
            wallet={wallet}
            collection={pandora}
            seller={
              selectedBox?.userAddress
                ? truncate(selectedBox?.userAddress)
                : selectedBox?.userAddress
            }
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default PandoraMarketplace;
