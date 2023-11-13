import { Button, Container } from "@mui/material";
import React from "react";
import { trusUsData } from "../../data/TrustUsData";

const TrustUs = () => {
  return (
    <Container className="max-w-screen-lgg mt-24 mdd:mt-28 lgg:mt-40 llg:mt-56 md:pl-20 llg:pl-0">
      <div className="max-w-md md:max-w-full mx-auto">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-2xl text-[#FFA800] xsm:text-3xl md:text-4xl mdd:text-[40px] llg:text-[44px] lgg:text-5xl font-bold mb-6">
            Why <span className="">Trust</span> Us?
          </h1>
          <p className="text-xs md:text-sm lgg:text-base llg:text-lg text-gray-300 font-medium">
            Trust comes from experience. Many of the pleased customers may
            function as a guide for you.
            <br /> Also our system goes through 400+ exchanges to offer the best
            price available to our users, meaning we are not in control, but
            cycling through to find the best offer for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center mt-20 lgg:mt-28 gap-20 md:gap-6 mdd:gap-8 lgg:gap-12">
          {trusUsData.map((item) => {
            const { id, icon, title, description, buttonText, buttonLink } =
              item;
            return (
              <div
                key={id}
                className="shadow-md max-w-[530px] min-h-[272px] rounded-md p-5 bg-[#272730] overflow-visible flex flex-col justify-between group"
              >
                <div>
                  <div className="group-hover:scale-110 transition-all duration-300 w-20 xsm:w-24 mdd:w-28 lgg:w-32 h-20 xsm:h-24 mdd:h-28 lgg:h-32 p-5 rounded-full flex justify-center items-center mx-auto bg-[#323244] mt-[-20%] ssm:mt-[-10%] md:mt-[-22%]">
                    {icon}
                  </div>
                  <h4 className="font-bold text-base mdd:text-lg lgg:text-xl text-gray-100 mt-4">
                    {title}
                  </h4>
                  <div className="bg-yellowGradient h-[3px] w-[15%] mt-2 rounded-full"></div>
                  <p className="font-medium mt-4 lgg:mt-5 text-sm lgg:text-base text-gray-300">
                    {description}
                  </p>
                </div>

                <a href={buttonLink}>
                  <Button
                    size="medium"
                    fullWidth
                    className="bg-yellowGradient font-semibold text-white text-xs xsm:text-sm lgg:text-base h-8 xsm:h-9 mdd:h-11 rounded-md relative overflow-hidden lightOnHoverVioletFull mt-5"
                  >
                    {buttonText}
                  </Button>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default TrustUs;
