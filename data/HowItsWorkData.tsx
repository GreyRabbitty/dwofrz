import { BsFillPeopleFill, BsSendFill } from "react-icons/bs";
import { GiConfirmed, GiReceiveMoney } from "react-icons/gi";

export const howItsWorksData = [
  {
    id: 1,
    icon: <BsFillPeopleFill className="w-4 xl:w-6 h-auto text-white" />,
    title: "Choose Pair",
    description:
      "Select the currency you want to swap from or use to purchase to the crypto you want to receive",
  },
  {
    id: 2,
    icon: <GiConfirmed className="w-4 xl:w-6 h-auto text-white" />,
    title: "Confirm Order",
    description: "Confirm that you want to proceed with this transaction",
  },
  {
    id: 3,
    icon: <BsSendFill className="w-4 xl:w-5 h-auto text-white" />,
    title: "Send Funds",
    description: `If you are swapping, you will be required to send your "From" funds to the designated address in order to receive the "to" funds on the designated address`,
  },
  {
    id: 4,
    icon: <GiReceiveMoney className="w-4 xl:w-6 h-auto text-white" />,
    title: "Receive Funds",
    description:
      "Within 5 minutes of sending your funds you should receive your correct amount of chosen crypto.",
  },
];
