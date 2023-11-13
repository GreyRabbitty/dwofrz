import React from "react";
import { Container, IconButton } from "@mui/material";
import { howItsWorksData } from "../../data/HowItsWorkData";

const Works = () => {
  return (
    <Container className="max-w-screen-lgg mt-24 mdd:mt-28 lgg:mt-40 llg:mt-44 md:pl-20 llg:pl-0">
      <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-14 md:gap-2 mdd:gap-5 lgg:gap-16">
        <div className="md:col-span-2 md:order-1 order-2 max-w-md md:max-w-full mx-auto">
          <img
            src="/swap/cryptocurrency-blockchain.png"
            alt="Blockchain logo"
            className="w-4/5 mx-auto md:w-full h-auto md:-ml-8 scale-105"
          />
        </div>

        <div className="md:col-span-3 text-white text-center md:text-left md:order-2 order-1 max-w-md md:max-w-full mx-auto">
          <h1 className="text-2xl xsm:text-3xl md:text-4xl mdd:text-[40px] llg:text-[44px] xl:text-5xl font-bold">
            How It Works?
          </h1>

          <p className="my-4 md:my-6 mxl:my-8 text-xs md:text-sm lgg:text-base llg:text-lg text-gray-300">
            In just 4 easy steps, you save yourself time, money and receive the
            best fee for swapping or purchasing crypto with no account needed.
            We cycle through over 400+ exchanges to get the best offer and lock
            you in to give you the most bang for your buck!
          </p>

          <div className="pt-5 grid grid-cols-1 ssm:grid-cols-2 gap-6 lgg:gap-8">
            {howItsWorksData.map((item) => (
              <div key={item.title}>
                <IconButton className="bg-yellowGradient w-10 lgg:w-12 h-10 lgg:h-12">
                  {item.icon}
                </IconButton>

                <h4 className="text-sm xsm:text-base lgg:text-lg mt-2 lgg:mt-4 text-white font-bold">
                  {item.title}
                </h4>
                <p className="text-xs lgg:text-sm mt-1 text-gray-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Works;
