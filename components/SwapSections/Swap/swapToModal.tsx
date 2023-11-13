import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Box, Modal, CircularProgress } from "@mui/material";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";

// icons
import { BiSearch } from "react-icons/bi";

interface SwapToModalProps {
  setToken: Function;
  opened: boolean;
  close: Function;
}

const SwapToModal = ({ setToken, opened, close }: SwapToModalProps) => {
  const [currencyData, setCurrencyData] = useState<any>(null);
  const [searchedData, setSearchedData] = useState<any>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://api.changenow.io/v2/exchange/currencies?active=&flow=standard&buy=&sell="
      )
      .then((res) => {
        const dataWithId = res.data.map((element: any) => {
          return { ...element, id: uuidv4() };
        });
        setCurrencyData(dataWithId);
        setSearchedData(dataWithId);
      })
      .catch((error) => {
        setError(error.message);
        return;
      });
  }, []);

  const handleSearchInput = (e: any) => {
    const filteredData = currencyData.filter(
      (currency: any) =>
        currency.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        currency?.legacyTicker
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        currency?.ticker
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        currency.network.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchedData(filteredData);
  };

  return (
    <Modal
      open={opened}
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
    >
      <Fade in={opened}>
        <Box className="bg-[#272730] outline-none absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] w-full h-full max-w-sm mmd:max-w-md max-h-[500px] overflow-auto shadow-xl px-4 pb-4 rounded-xl">
          <div className="flex justify-between items-center px-3 sticky top-0 bg-[#272730] pt-4 border-b-2 border-[#363655]">
            <div>
              <BiSearch className="text-white w-6 h-auto " />
            </div>
            <input
              onChange={handleSearchInput}
              type="text"
              name=""
              id=""
              className="text-lg p-2 flex-1 text-white bg-transparent outline-none"
            />
          </div>

          <div className="">
            <div className="flex flex-col justify-center items-center space-y-2 mt-2 h-full pb-0 flex-grow">
              {!searchedData ? (
                <CircularProgress className="mt-6 lg:mt-8 xl:mt-10 text-gray-300" />
              ) : searchedData.length < 1 ? (
                <span className="text-base text-cusLightGray mt-10">
                  No data found
                </span>
              ) : (
                searchedData.map((item: any) => {
                  const {
                    id,
                    // buy,
                    // featured,
                    // hasExternalId,
                    // isFiat,
                    // isStable,
                    // legacyTicker,
                    // sell,
                    // supportsFixedRate,
                    // tokenContract,
                    image,
                    name,
                    network,
                    ticker,
                  } = item;
                  return (
                    <div
                      key={id}
                      onClick={() =>
                        setToken({
                          name: name,
                          image: image,
                          ticker: ticker,
                          network: network,
                        })
                      }
                      className="flex justify-between items-center w-full p-2 transition-all duration-200 hover:bg-cusBGColor/50 cursor-pointer"
                    >
                      <div className="flex justify-start items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img src={image} alt="" className="w-full h-full" />
                        </div>
                        <div className="text-left ml-2">
                          <h5 className="text-xs mmd:text-sm font-semibold text-white tracking-normal">
                            {name}
                          </h5>
                          <p className="text-2xs mmd:text-xs font-semibold text-gray-300">
                            {ticker?.toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <h5 className="text-xs mmd:text-sm font-medium text-white tracking-normal">
                        {network?.toUpperCase()} Network
                      </h5>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SwapToModal;
