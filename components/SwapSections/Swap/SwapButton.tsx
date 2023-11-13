import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";

// icons
import { MdOutlineSwitchRight, MdOutlineSwitchLeft } from "react-icons/md";

interface SwapButtonProps {
  handleSwapButton: Function;
}

const SwapButton = ({ handleSwapButton }: SwapButtonProps) => {
  const [swapBtnClick, setSwapBtnClick] = useState(false);

  return (
    <div
      onClick={() => {
        handleSwapButton();
        setSwapBtnClick(!swapBtnClick);
      }}
      className="absolute flex justify-center items-center left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] w-10 xsm:w-12 md:w-14 h-10 xsm:h-12 md:h-14 bg-[#363655] hover:bg-cusViolet rounded-full overflow-hidden"
    >
      <IconButton size="large">
        {swapBtnClick ? (
          <MdOutlineSwitchRight className="w-5 xsm:w-6 md:w-8 h-auto text-white rotate-90" />
        ) : (
          <MdOutlineSwitchLeft className="w-5 xsm:w-6 md:w-8 h-auto text-white rotate-90" />
        )}
      </IconButton>
    </div>
  );
};

export default SwapButton;
