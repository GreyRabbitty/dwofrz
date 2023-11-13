import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";

interface SwapResultProps {
  data: any;
  close: Function;
}

const SwapResult = ({ data, close }: SwapResultProps) => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState();
  const [payAddress, setPayAddress] = useState();
  const [payAmt, setPayAmt] = useState();
  const [receivingAddress, setReceivingAddress] = useState();
  const [receivingFunds, setReceivingFunds] = useState();
  const statusClass = `${
    status === "waiting"
      ? "bg-[#F08800]"
      : status === "confirmed"
      ? "bg-green-500"
      : "bg-red-500"
  }`;

  const sendReferral = () => {
    if (status === 'confirmed') {
      // Send Referral 
      // ....
    }
  }

  const getInfo = () => {
    setLoading(true);
    const id = data?.id?.toString();

    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api.changenow.io/v1/transactions/${id}/007f96b07a1f1f7d982b077d5802297ead70c942fcbcc8b340da7eebff4b5de6`,
      headers: {},
    };

    axios(config)
      .then((response) => {
        setStatus(response.data.status);
        setPayAddress(response.data.payinAddress);
        setPayAmt(response.data.expectedSendAmount);
        setReceivingAddress(response.data.payoutAddress);
        setReceivingFunds(
          response.data.expectedReceiveAmount > 0
            ? response.data.expectedReceiveAmount
            : response.data.amount
        );

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        return
      });
  };

  useEffect(() => {
    setLoading(true);
    getInfo();
    sendReferral()
  }, [data]);


  return (
    <>
      {loading ? (
        <div className="h-full w-full flex justify-center items-center py-20">
          <CircularProgress className="text-gray-300" />
        </div>
      ) : (
        <div>
          <h2 className="text-center font-bold text-xl md:text-2xl mb-5">
            Swap Result
          </h2>

          <div className="flex mb-5 justify-between items-center text-white text-xs md:text-sm lgg:text-base">
            <h4 className="font-medium">Status</h4>
            <div
              className={`${statusClass} text-white px-5 py-1 rounded  relative`}
            >
              <span className="font-bold uppercase">{status}</span>
            </div>
          </div>

          <div className="mb-5 text-xs md:text-sm lgg:text-base">
            <h4 className="text-gray-200 mb-1 font-thin">
            Address to send Payment
            </h4>
            <h4 className="text-white font-semibold tracking-wide break-words">
              {payAddress}
            </h4>
          </div>

          <div className="mb-5 text-xs md:text-sm lgg:text-base">
            <h4 className="text-gray-200 mb-1 font-thin">
              Amount Address waiting for
            </h4>
            <h4 className="text-white font-semibold tracking-wide">
              {payAmt} {data?.fromCurrency?.toUpperCase()}
            </h4>
          </div>

          <div className="mb-5 text-xs md:text-sm lgg:text-base">
            <h4 className="text-gray-200 mb-1 font-thin">
              Address receiving funds
            </h4>
            <h4 className="text-white font-semibold tracking-wide break-words">
              {receivingAddress}
            </h4>
          </div>

          <div className="mb-5 text-xs md:text-sm lgg:text-base">
            <h4 className="text-gray-200 mb-1 font-thin">Funds receiving</h4>
            <h4 className="text-white font-semibold tracking-wide break-words">
              {receivingFunds} {data?.toCurrency?.toUpperCase()}
            </h4>
          </div>

          <div className="text-end">
            <Button
              size="medium"
              fullWidth
              onClick={() => close()}
              className="px-8 capitalize bg-yellowGradient font-semibold text-white text-xs xsm:text-sm lgg:text-base h-8 xsm:h-9 mdd:h-11 xsm:w-fit ml-auto rounded-md"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default SwapResult;
