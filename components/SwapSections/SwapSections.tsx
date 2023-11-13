import React from "react";
import About from "./About";
import SwapContents from "./Swap/SwapContents";
import SwapHero from "./SwapHero";
import TrustUs from "./TrustUs";
import Works from "./Works";

const SwapSections = () => {
  return (
    <div className="">
      <SwapHero />
      <About />
      <Works />
      <TrustUs />
      <SwapContents />
    </div>
  );
};

export default SwapSections;
