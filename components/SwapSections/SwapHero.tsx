import React from "react";
import { motion } from "framer-motion";
import { Button, Container } from "@mui/material";

// icons
import { IoMdArrowDropdown } from "react-icons/io";

const SwapHero = () => {
  const goTo = (id: string) => {
    let destination: HTMLElement | null = document.querySelector(id);
    if (destination) {
      let yCoord = destination.offsetTop - 150;
      window.scrollTo({
        top: yCoord,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="min-h-screen w-full -mt-[47.8px] overflow-hidden flex justify-center items-start md:items-center pt-16 ssm:pt-24 md:pt-0"
      style={{
        background: `url(/swap/home/hero_bg_.png)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container className="w-full max-w-screen-lgg md:pl-20 llg:pl-0">
        <div className="w-full md:justify-between flex flex-col md:flex-row items-center grid-cols-2">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="relative text-left order-2 md:order-1"
          >
            <h1 className="capitalize text-white text-center md:text-left text-3xl ssm:text-4xl mdd:text-5xl lgg:text-[56px] llg:text-6xl xl:text-[65px] font-bold flex flex-col space-y-1 xsm:space-y-2 lg:space-y-3 tracking-tight">
              <motion.span
                initial={{ y: -30 }}
                whileInView={{ y: 0 }}
                className="text-cusLightBlue"
              >
                Make your life
              </motion.span>
              <motion.span
                initial={{ y: 30 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.4 }}
              >
                easier with
              </motion.span>
              <motion.span
                initial={{ y: 30 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.4 }}
                className="font-extrabold"
              >
                Dworfz{" "}
                <span className="text-transparent bg-clip-text bg-yellowGradient">
                  Exchange
                </span>
              </motion.span>
            </h1>

            <motion.h4
              initial={{ y: 30 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.4 }}
              className="uppercase mt-2 ssm:mt-4 mdd:mt-5 text-xs ssm:text-sm mdd:text-base llg:text-lg font-medium text-center md:text-left p-0"
            >
              Swapping and Purchasing crypto, made easy.
            </motion.h4>

            <div className="mt-5 lg:mt-8 mx-auto w-full ssm:w-fit md:w-full flex flex-col ssm:flex-row ssm:space-x-3 mdd:space-x-4">
              <motion.div
                initial={{ x: -30 }}
                whileInView={{ x: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full ssm:w-fit"
              >
                <Button
                  size="large"
                  fullWidth
                  onClick={(e) => {
                    goTo("#swap");
                  }}
                  className="px-10 lightOnHoverViolet customStylesButton flex justify-center items-center -skew-x-12"
                >
                  <span>Swap</span>
                  <IoMdArrowDropdown className="w-8 h-auto -mr-5 -ml-0.5 -mb-2 animate-bounce" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ x: 30 }}
                whileInView={{ x: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full ssm:w-fit"
              >
                <Button
                  size="large"
                  fullWidth
                  className="px-7 mt-3 ssm:mt-0 lightOnHoverViolet customStylesButton -skew-x-12"
                >
                  Purchase Crypto
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <div className="w-full h-[250px] ssm:w-[250px] ssm:h-[250px] relative md:-mt-16 -mr-4 md:mr-4 lg:mr-14 llg:mr-0 order-1 md:order-2 mb-5 ssm:mb-10 md:mb-0">
            <div className="absolute top-[50%] translate-y-[-50%] right-[50%] translate-x-[50%] md:translate-x-0 md:-right-20 w-full ssm:w-[150%] xsm:w-[170%] md:w-[145%] mdd:w-[190%] mmd:w-[214%] lgg:w-[230%] llg:w-[236%] xl:w-[250%]">
              <img
                className="h-auto w-full"
                src="/swap/home/hero_coins_img.png"
                alt="Cryptocurrency logo"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SwapHero;
