import React from "react";
import { Button, Container } from "@mui/material";

const About = () => {
  return (
    <Container
      maxWidth="xl"
      className="max-w-screen-lgg grid grid-cols-1 md:grid-cols-5 items-center gap-16 mt-24 mdd:mt-28 llg:mt-36 xl:mt-40 md:pl-20 llg:pl-0"
    >
      <div className="md:col-span-3 text-white text-center md:text-left">
        <h1 className="text-2xl xsm:text-3xl md:text-4xl mdd:text-[40px] llg:text-[44px] xl:text-5xl font-bold">
          About <span className="text-cusViolet">Dworfz Exchange</span>
        </h1>

        <p className="my-4 md:my-6 llg:my-8 text-xs md:text-sm xl:text-base llg:text-lg md:w-4/5 font-medium text-gray-300">
          We are a decentralized exchange allowing our users to purchase or swap
          all major crypto-currencies regardless of the chain at the best
          prices. Users do not need to register or have an account to use this
          application.
        </p>

        <Button
          size="large"
          fullWidth
          className="px-8 mx-auto customStylesButton lightOnHoverViolet"
        >
          Get started
        </Button>
      </div>

      <div className="md:col-span-2 flex justify-center items-center">
        <div className="nucleus3dLogo_wraper relative">
          <div className="nucleus3dLogo text-[160px] xsm:text-[190px] mdd:text-[200px] lg:text-[220px] llg:text-[260px] xl:text-[280px]">
            <div className="side heads">
              <img
                src="/swap/home/largeLogoWbg.png"
                alt="nucleus 3d animated logo"
                className="w-full h-auto"
              />
            </div>
            <div className="side tails">
              <img
                src="/swap/home/largeLogoWbg.png"
                alt="nucleus 3d animated logo"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default About;
