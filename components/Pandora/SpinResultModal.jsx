import { Box, Button, IconButton, Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Badge from "@mui/material/Badge";
import Fade from "@mui/material/Fade";
import React, { useRef, useState } from "react";

// icons
import { IoClose } from "react-icons/io5";

const SpinResultModal = ({ opened, close, spinResult }) => {
  // // console.log(spinResult);
  // const [msg, setMsg] = useState("") ;
  var msg;
  switch (spinResult) {
    case 4:
      msg = "Better luck next time";
      break;
    case 3:
      msg = "Lucky you, you won 1 box";
      break;
    case 1:
      msg = "Lucky you, you won 1 box";
      break;
    case 2:
      msg = "Lucky you, you won 2 boxes";
      break;

    default:
      break;
  }
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
      classes={{
        backdrop: "backdrop-blur",
      }}
    >
      <Fade in={opened}>
        <Box className="bg-[#25354D] outline-none absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] w-full max-w-sm mmd:max-w-md h-fit overflow-auto shadow-xl p-4 mmd:p-5 rounded-xl">
          <div className="flex justify-end items-center -mt-1">
            <IconButton
              onClick={() => close(false)}
              className="text-white text-3xl"
              aria-label="add an alarm"
            >
              <IoClose />
            </IconButton>
          </div>

          <div className="text-center">
            {spinResult === 4 && (
              <div className="w-[240px] mx-auto">
                <img
                  src="/pandora/images/sadEmoji.png"
                  alt=""
                  className="w-auto h-full mx-auto"
                />
              </div>
            )}

            {spinResult !== 4 && (
              <Badge
                overlap="circular"
                badgeContent={spinResult === 2 ? "x2" : "x1"}
                classes={{
                  badge:
                    "bg-white text-[#ff6f01] rounded-full font-extrabold text-2xl leading-none h-11 px-4 ",
                }}
              >
                <div className="w-fit h-fit rounded-full mx-auto relative">
                  <div className="bg-yellowGradient w-[250px] h-[250px] px-5 rounded-full overflow-hidden flex justify-center items-center">
                    <img
                      src={
                        spinResult === 2
                          ? "/pandora/images/boxs.png"
                          : "/pandora/images/1box.png"
                      }
                      alt=""
                      className="w-full h-auto mx-auto scale-[0.8]"
                    />
                  </div>
                </div>
              </Badge>
            )}

            <h3 className="text-gray-200 text-xl font-medium mt-3">{msg}</h3>

            <div className="w-fit h-fit mx-auto mt-6 rounded-full bg-[linear-gradient(0deg,#e46e00_0%,#ffd43e_100%)] p-1 shadow-[0px_6px_8px_#00000090] relative">
              <Button
                onClick={() => close(false)}
                className="font-semibold rounded-full px-12 text-xl h-full w-full text-white relative overflow-hidden lightOnHoverViolet bg-[linear-gradient(180deg,#e46e00_0%,#ffd43e_100%)]"
              >
                Ok
              </Button>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SpinResultModal;
