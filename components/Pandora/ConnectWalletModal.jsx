import { Modal, Box } from "@mui/material";
import { getAddress, signTransaction } from "sats-connect";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";

const ConnectWalletModal = ({
  open,
  close,
  setAddress,
  wallet,
  setXverse,
  setWallet,
}) => {
  const connectToUni = async () => {
    const unisat = window.unisat;
    const [address] = await unisat.requestAccounts();
    setAddress(address);
    setWallet(2);

    const publicKey = await unisat.getPublicKey();

    const balance = await unisat.getBalance();

    const network = await unisat.getNetwork();
    close(!open);
  };

  const connectToHiro = async () => {
    const userAddresses = await window.btc?.request("getAddresses");
    setAddress(userAddresses.result.addresses[1].address);
    setWallet(1);
    close(!open);
  };

  const connectToXVerse = async () => {
    const getAddressOptions = {
      payload: {
        purposes: ["ordinals", "payment"],
        message: "Address for receiving Ordinals and payments",
        network: {
          type: "Mainnet",
        },
      },
      onFinish: (response) => {
        console.log(response);
        setAddress(response.addresses[0].address);
        setXverse(response.addresses[1].address);
      },
      onCancel: () => alert("Request canceled"),
    };

    const addresses = await getAddress(getAddressOptions).then((res) => {
      setWallet(3);
      close(!open);
    });
  };

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
        backdrop: "backdrop-blur",
      }}
    >
      <Fade in={open}>
        <Box className="bg-cusEL-200 outline-none absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] w-full max-w-sm mmd:max-w-md h-fit overflow-auto shadow-xl p-2 mmd:p-3 rounded-xl">
          <div className="flex flex-col content-center justify-center align-middle space-y-2">
            <div
              onClick={() => connectToXVerse()}
              className="bg-cusEL-100/50 rounded-lg flex justify-start items-center space-x-3 p-2"
            >
              <img
                className="w-7 ssm:w-9 md:w-12 mmd:w-14 lgg:w-16 h-auto rounded-full"
                src="/pandora/images/xverse.png"
              ></img>
              <h2 className="text-white font-bold font-mono text-base md:text-lg mmd:text-xl lgg:text-2xl">
                XVERSE
              </h2>
            </div>
            <div
              onClick={() => connectToUni()}
              className="bg-cusEL-100/50 rounded-lg flex justify-start items-center space-x-3 p-2"
            >
              <img
                className="w-7 ssm:w-9 md:w-12 mmd:w-14 lgg:w-16 h-auto rounded-full"
                src="/pandora/images/unisats.png"
              ></img>
              <h2 className="text-white font-bold font-mono text-base md:text-lg mmd:text-xl lgg:text-2xl">
                UNISAT
              </h2>
            </div>
            <div
              onClick={() => connectToHiro()}
              className="bg-cusEL-100/50 rounded-lg flex justify-start items-center space-x-3 p-2"
            >
              <img
                className="w-7 ssm:w-9 md:w-12 mmd:w-14 lgg:w-16 h-auto rounded-full"
                src="/pandora/images/hiro.jpg"
              ></img>
              <h2 className="text-white font-bold font-mono text-base md:text-lg mmd:text-xl lgg:text-2xl">
                HIRO
              </h2>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ConnectWalletModal;
