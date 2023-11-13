import CircleWavyCheck from "../../public/CircleWavyCheck.png";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Wait_approve() {
  return (
    <div className="w-[80%] h-[75vh] grid place-items-center mx-auto mt-12 text-center">
      <div>
        <div className="text-4xl text-[#ADFF00]/90">
          We have successfully sent your application.
        </div>
        <div className="mt-6 w-full flex justify-center">
          <Image src={CircleWavyCheck} width={80} height={30} alt="" />
        </div>
        <div className="mt-8 text-xl">
          Your application is currently under review, please check back later.
        </div>
        {/* <div className="mt-12">
            <div className="w-[95%] mt-2 mx-auto borderdashad h-1"></div>
        </div> */}
        <div className="w-fit mt-16 mx-auto ">
          <Link
            href={"/"}
            className="text-lg px-10 py-2 rounded-full savee2 cursor-pointer"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
