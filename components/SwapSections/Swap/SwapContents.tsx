import { LoadingButton } from "@mui/lab";
import { Avatar, Container } from "@mui/material";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import AwaitingTx from "./awaitingTx";
import EnterAddressModal from "./entreAddress";
import SwapButton from "./SwapButton";
import SwapToModal from "./swapToModal";

// icons
import { IoMdArrowDropdown } from "react-icons/io";

// Getting address
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useWeb3React } from "@web3-react/core";

const SwapContents = () => {
  const [swapToModalOpened, setSwapToModalOpened] = useState(false);
  const [awaitingTxOpened, setAwaitingTxOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [priceLoading, setPriceLoading] = useState(false);
  const [position, setPosition] = useState("To");
  const [address, setAddress] = useState<string | null>("");
  const [fromToken, setFromToken] = useState({
    name: "bitcoin",
    image: "https://content-api.changenow.io/uploads/btc_d8db07f87d.svg",
    ticker: "btc",
    network: "btc",
  });
  const [toToken, setToToken] = useState({
    name: "ethereum",
    image: "https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg",
    ticker: "eth",
    network: "eth",
  });
  const [fromValue, setFromValue] = useState(1);
  const [toValue, setToValue] = useState(1);
  const [swapRatio, setSwapRatio] = useState(0);
  const [extraId, setExtraId] = useState("");
  const [userId, setUserId] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [refundAddress, setRefundAddress] = useState<string | null>("");
  const [refundExtraId, setRefundExtraId] = useState("");
  const [payinAddress, setPayInAddress] = useState("");
  const [txId, setTxId] = useState();
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const [waitingTx, setAwaitingTx] = useState(false);
  const [txStatus, setTxStatus] = useState();
  const [minXAmount, setMinXAmount] = useState(0);
  const [settingAddress, setSettingAddress] = useState(false);

  let _from = fromValue;
  let minEx = minXAmount;
  const isMinimumOrMore = Boolean(_from >= minEx);

  const Anchor = useAnchorWallet();
  const solAccount = Anchor?.publicKey.toBase58();
  const { account, active } = useWeb3React();

  const changeRecAddress = (value: any) => {
    setAddress(value);
  };

  const checkAccountStatus = () => {
    if (solAccount || account === undefined) {
      // setError("Please connect wallet first");
      return;
    } else if (solAccount !== undefined) {
      setRefundAddress(solAccount);
      setAddress(solAccount);
    } else if (account !== undefined || null) {
      setRefundAddress(account);
      setAddress(account);
    }
  };

  const enterAddress = (e: any) => {
    e.preventDefault();
    setSettingAddress(true);
  };

  const setTokenToPosition = (token: any) => {
    if (position === "To") {
      setToToken(token);
    } else {
      setFromToken(token);
    }
    setSwapToModalOpened(false);
  };

  const chooseForSwapFrom = () => {
    setPosition("From");
    setSwapToModalOpened(true);
  };

  const chooseForSwapTo = () => {
    setPosition("To");
    setSwapToModalOpened(true);
  };

  const handleSwapButton = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  const postExchange = (e: any) => {
    e.preventDefault();

    setSettingAddress(false);

    setIsLoading(true);
    const data = JSON.stringify({
      from: fromToken.ticker,
      to: toToken.ticker,
      address: address,
      amount: fromValue,
      extraId: extraId,
      userId: userId,
      payload: "", // Can set this to the referral to help confirm if a tx was complete
      contactEmail: contactEmail,
      refundAddress: refundAddress,
      refundExtraId: refundExtraId,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.changenow.io/v1/transactions/007f96b07a1f1f7d982b077d5802297ead70c942fcbcc8b340da7eebff4b5de6",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setData(response.data);
        setPayInAddress(response.data.payinAddress);
        setTxId(response.data.id);
        setAwaitingTxOpened(true);
        setIsLoading(false);
      })
      .catch(function (error) {
        setError(
          "Not all pairs available please come back later and try again"
        );
        setIsLoading(false);
        return;
      });
  };

  useEffect(() => {
    checkAccountStatus();
  }, [Anchor, active, account]);

  // const config = {
  //   method: "get",
  //   maxBodyLength: Infinity,
  //   headers: {
  //     Authorization:
  //       "007f96b07a1f1f7d982b077d5802297ead70c942fcbcc8b340da7eebff4b5de6",
  //   },
  // };

  useEffect(() => {
    setPriceLoading(true);
    setError("");
    const url = `https://api.changenow.io/v1/exchange-amount/${fromValue}/${fromToken.ticker}_${toToken.ticker}?api_key=007f96b07a1f1f7d982b077d5802297ead70c942fcbcc8b340da7eebff4b5de6`;
    axios
      .get(url)
      .then((response) => {
        setSwapRatio(response.data?.estimatedAmount);
        setPriceLoading(false);
      })
      .catch((error) => {
        setError(
          "Pair currently not available please come back later and try again"
        );
        setPriceLoading(false);
      });
  }, [fromValue, fromToken, toToken]);

  useEffect(() => {
    setPriceLoading(true);
    setError("");
    const url = `https://api.changenow.io/v1/min-amount/${fromToken.ticker}_${toToken.ticker}?api_key=007f96b07a1f1f7d982b077d5802297ead70c942fcbcc8b340da7eebff4b5de6`;
    axios
      .get(url)
      .then((response) => {
        setMinXAmount(response.data?.minAmount);
        setPriceLoading(false);
      })
      .catch((error) => {
        setError(
          "Pair currently not available please come back later and try again"
        );
        setPriceLoading(false);
      });
  }, [fromToken, toToken]);

  return (
    <Container className="max-w-screen-lgg mt-24 mdd:mt-28 llg:mt-40 xl:mt-48 md:pl-20 llg:pl-0 pb-44">
      <h1
        id="swap"
        className="text-2xl xsm:text-3xl md:text-4xl mdd:text-[40px] llg:text-[44px] xl:text-5xl font-bold text-center"
      >
        Swap
      </h1>

      <Container className="mt-6 md:mt-10 max-w-[550px] ">
        <div className="bg-[#272730] rounded-lg relative flex-col mx-auo">
          {/* Swap To input */}
          <div className="px-4 md:px-6 pt-4 pb-7 md:pb-10 border-b-2 border-[#363655] flex justify-between items-end">
            <div>
              <p className="text-white font-medium text-xs md:text-sm mb-3">
                From
              </p>
              <input
                defaultValue={1}
                type="number"
                placeholder="0"
                onKeyDown={(evt) =>
                  ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
                }
                onChange={(e: any) => setFromValue(e.target.value)}
                className="text-2xl xsm:text-3xl md:text-4xl bg-transparent leading-none text-white pr-2 outline-none font-extrabold w-full py-1 overflow-hidden"
              />
            </div>

            <div
              onClick={chooseForSwapFrom}
              className="flex justify-center items-center cursor-pointer flex-1 space-x-2 w-full px-2 md:px-3 py-2 md:py-2.5 rounded-md bg-[#363655] hover:bg-yellowGradient active:scale-[0.98] transition-all duration-200"
            >
              <Avatar
                src={fromToken?.image}
                className="bg-transparent w-6 md:w-8 h-6 md:h-8"
              />
              <p className="text-white text-sm xsm:text-base md:text-lg font-bold select-none">
                {fromToken?.ticker?.toUpperCase()}
              </p>
              <div>
                <IoMdArrowDropdown className="fill-white w-6 md:w-7 h-auto -ml-2" />
              </div>
            </div>
          </div>

          {/* Swap From input */}
          <div className="px-4 md:px-6 pt-4 pb-7 md:pb-10 flex justify-between items-end">
            <div className="flex-grow">
              <p className="text-white font-medium text-xs md:text-sm mb-3">
                To
              </p>
              {priceLoading ? (
                <h2 className="text-2xl xsm:text-3xl md:text-4xl text-[#3f3f6a] pr-2 outline-none font-extrabold w-full py-1">
                  0.0000
                </h2>
              ) : (
                <input
                  readOnly
                  type="number"
                  placeholder={swapRatio?.toFixed(4)}
                  onKeyDown={(evt) =>
                    ["e", "E", "+", "-"].includes(evt.key) &&
                    evt.preventDefault()
                  }
                  onChange={(e: any) => setFromValue(e.target.value)}
                  className="text-2xl xsm:text-3xl md:text-4xl placeholder:text-white bg-transparent leading-none text-white pr-2 outline-none font-extrabold w-full py-1"
                />
              )}
            </div>

            <div
              onClick={chooseForSwapTo}
              className="flex justify-center items-center cursor-pointer flex-grow-0 flex-1 space-x-2 w-full px-2 md:px-3 py-2 md:py-2.5 rounded-md bg-[#363655] hover:bg-yellowGradient active:scale-[0.98] transition-all duration-200"
            >
              <Avatar
                src={toToken?.image?.toString()}
                className="bg-transparent w-6 md:w-8 h-6 md:h-8"
              />
              <p className="text-white text-sm xsm:text-base md:text-lg font-bold select-none">
                {toToken?.ticker?.toUpperCase()}
              </p>
              <div>
                <IoMdArrowDropdown className="fill-white w-6 md:w-7 h-auto -ml-2" />
              </div>
            </div>
          </div>

          <SwapButton handleSwapButton={handleSwapButton} />
        </div>

        <LoadingButton
          loading={isLoading}
          onClick={enterAddress}
          variant="contained"
          size="large"
          fullWidth
          disabled={fromValue <= 0 ? true : false}
          // disabled
          style={{ color: isLoading ? "#ffffff99" : "#fff" }}
          className="disabled:brightness-50 bg-yellowGradient font-semibold text-xs xsm:text-sm xl:text-lg h-10 md:h-12 mdd:h-14 rounded-md relative overflow-hidden lightOnHoverVioletFull mt-4 ssm:mt-5"
        >
          Confirm
        </LoadingButton>

        {error !== "" ? (
          <h3 className="text-white font-medium mt-2"> {error} </h3>
        ) : null}
      </Container>

      {swapToModalOpened && (
        <SwapToModal
          setToken={setTokenToPosition}
          opened={swapToModalOpened}
          close={setSwapToModalOpened}
        />
      )}

      {awaitingTxOpened && (
        <AwaitingTx
          data={data}
          opened={awaitingTxOpened}
          close={setAwaitingTxOpened}
        />
      )}

      {settingAddress && (
        <EnterAddressModal
          onChange={changeRecAddress}
          postExchange={postExchange}
          opened={settingAddress}
          close={setSettingAddress}
        />
      )}
    </Container>
  );
};

export default SwapContents;
