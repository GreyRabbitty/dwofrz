import React from "react";
import { Box, Button, Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";

interface EnterAddressModalProps {
  onChange: Function;
  postExchange: Function;
  opened: boolean;
  close: Function;
}

const EnterAddressModal = ({
  onChange,
  postExchange,
  opened,
  close,
}: EnterAddressModalProps) => {
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
          className={`${modalCommonStyles} max-w-sm mmd:max-w-md max-h-[300px]`}
        >
          <div className="text-center mb-8">
            <h1 className="block text-2xl font-bold text-white dark:text-white">
              Enter Receiving Address
            </h1>
          </div>

          <div>
            <div className="mb-1">
              <input
                type="text"
                placeholder="0xa8...."
                onChange={(e) => onChange(e.target.value)}
                className="text-base md:text-lg llg:text-xl text-white pr-2 outline-none font-medium w-full py-3.5 px-3 rounded-sm bg-[#2c2c38]"
              />
            </div>
            <Button
              size="medium"
              fullWidth
              onClick={(e) => postExchange(e)}
              className="bg-yellowGradient font-semibold text-white text-xs xsm:text-sm lgg:text-base h-8 xsm:h-9 mdd:h-11 rounded-md relative overflow-hidden lightOnHoverVioletFull mt-5"
            >
              Confirm
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
    // <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
    //   <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
    //     <div className="p-4 sm:p-7">
    //       <div className="text-center">
    //         <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
    //           Enter Receiving Address
    //         </h1>
    //       </div>

    //       <div className="mt-5">
    //         <form>
    //           <div className="grid gap-y-4">
    //             <div>
    //               <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">
    //                 Address to receive funds
    //               </label>
    //               <div className="relative">
    //                 <input
    //                   type="text"
    //                   placeholder="0xa8...."
    //                   onChange={(e) => onChange(e.target.value)}
    //                   className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-[#ff9240] focus:ring-[#ff9240] shadow-sm"
    //                   required
    //                 />
    //               </div>
    //             </div>
    //             <button
    //               onClick={(e) => postExchange(e)}
    //               className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#ff9240] text-white hover:bg-[#ff9240] focus:outline-none focus:ring-2 focus:ring-[#ff9240] focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
    //             >
    //               Confirm
    //             </button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </main>
  );
};

export default EnterAddressModal;
