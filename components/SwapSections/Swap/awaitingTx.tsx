import React from "react";
import { Box, Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import SwapResult from "./SwapResult";

interface AwaitingTxProps {
  data: any;
  opened: boolean;
  close: Function;
}

const AwaitingTx = ({ data, opened, close }: AwaitingTxProps) => {
  const modalCommonStyles = `bg-[#363655] outline-none absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] w-full h-fit overflow-auto shadow-xl p-4 md:p-5 px-5 md:px-7 rounded-lg`;
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
        <Box
          className={`${modalCommonStyles} max-w-sm mmd:max-w-[440px] max-h-[520px]`}
        >
          <SwapResult close={close} data={data} />
        </Box>
      </Fade>
    </Modal>
  );
};

export default AwaitingTx;
