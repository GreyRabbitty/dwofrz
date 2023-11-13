import Image from "next/image";
import React, { useState } from "react";
import topimage from "../../../public/topimage.png";
import artgame from "../../../public/artgame.png";
import logosol from "../../../public/logosol.png";
import avatar1 from "../../../public/avatar1.png";
import screen1 from "../../../public/screen1.png";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import { Autoplay, Navigation, Scrollbar } from "swiper";

export default function gameview() {
  const style1 =
    "bg-gradient-to-t from-[var(--dwtop)] to-[var(--dwtrakc)] rounded-xl p-[1.4px]";
  const style2 =
    "w-full bg-gradient-to-t from-[#222222] to-[#2B2B36] rounded-xl";
  const fakedata = [
    {
      id: 1,
      img: "https://media.discordapp.net/attachments/1085293900706627595/1086249881829642240/ee.jpg",
    },
    {
      id: 1,
      img: "https://media.discordapp.net/attachments/1085293900706627595/1086249881414422568/ff.jpg",
    },
    {
      id: 1,
      img: "https://media.discordapp.net/attachments/1085293900706627595/1086249882207146024/dd.jpg",
    },
    {
      id: 1,
      img: "https://media.discordapp.net/attachments/1085293900706627595/1086249881829642240/ee.jpg",
    },
    {
      id: 1,
      img: "https://media.discordapp.net/attachments/1085293900706627595/1086249881414422568/ff.jpg",
    },
    {
      id: 1,
      img: "https://media.discordapp.net/attachments/1085293900706627595/1086249882207146024/dd.jpg",
    },
  ];
  const [prev, setprev] = useState(false);
  return (
    <div>
      <div className="w-full max-w-[1800px] mx-auto mb-8">
        <div className="w-full h-auto">
          <Image src={topimage} width={2000} height={300} alt="" />
        </div>
        <div className="w-full flex flex-col-reverse md:flex-row justify-between px-5 z-50">
          <div className="w-[270px] mx-auto md:mx-0 mt-10 md:-mt-[130px] z-50 ">
            <Image
              src={artgame}
              width={500}
              height={200}
              className="rounded-xl border-2 border-[var(--dwtwo)]"
              alt=""
            />
            <div className="mt-3">
              <div className="w-full cursor-pointer text-center rounded-lg py-[10px] text-sm winner">
                Winner : Cq2u...jaif (1.5 SOl)
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-between">
              <div className="md:ml-12 ">
                <div className="text-3xl md:text-5xl font-semibold md:-ml-7 -mt-[45px] md:-mt-[65px]">
                  Degen Royale
                </div>
                <div className="text-lg md:text-xl flex items-center mt-10">
                  <span className="font-semibold">Rewards:</span>
                  <span className="ml-3 mr-1">
                    <Image src={logosol} width={17} height={29} alt="" />
                  </span>
                  <span className="text-[var(--dwtwo)] text-sm"> 1.5 SOL$</span>
                </div>
                <div className="mt-5 hove:scale-105 transition-all">
                  <div className={`${style1} w-[200px]`}>
                    <div
                      className={`${style2} text-xl  font-semibold w-full text-center py-[3px] px-5 cursor-pointer`}
                    >
                      Start Tasks
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col  md:flex-row items-center md:items-start text-center -mt-[34px] md:-mt-[44px]">
                <div className=" font-semibold">
                  <div className="w-[60px] md:w-[80px]">
                    <Image
                      src={avatar1}
                      width={80}
                      height={75}
                      className="border-2 border-[var(--dwtwo)] rounded-full"
                      alt=""
                    />
                  </div>
                  <div className="text-sm">Platform</div>
                  <div className="text-[var(--dwtwo)] text-xs">Steam</div>
                </div>
                <div className="mt-2 md:mt-0">
                  <div className="w-[60px] h-[60px] md:w-[80px] mx-5 bg-[#00080B] md:h-[80px]  grid place-items-center rounded-full border-2 border-[var(--dwtwo)] text-2xl">
                    N/A
                  </div>
                  <div className=" font-semibold text-sm">Not rated yet</div>
                </div>
              </div>
            </div>
            <div className="px-4 md:px-12 mt-6  leading-7 font-semibold">
              Philly welcomes you to Degen Royale. You and your fellow
              companions are chosen from the world's best and brightest to
              compete against one another on the tropical Degen Island. As you
              beam onto the Island you will be equiped with the most wacky guns
              and gadgets immaginable to compete in an exciting free-for-all
              deatchmatch called "Rumbles". Only one elite player can win in
              this third-person shooter that up to 100 online players can join.
              Unlimited ammo, unlimited respawns, unlimited fun together.
            </div>
            <div className="mt-8 px-12 ">
              <div className="flex items-center">
                <div className="mr-3 md:mr-0 md:w-[200px] newstyle text-xl font-semibold">
                  Genres:
                </div>
                <span className="underline">Action, Free to Play</span>
              </div>
              <div className="mt-3 flex items-center">
                <div className="mr-3 md:mr-0 md:w-[200px] text-xl newstyle font-semibold">
                  Game modes:
                </div>
                <div className="underline">Online PvP</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[90%] mx-auto h-[1px] rounded-full bg-white/80 my-8"></div>
        <div className="text-center text-2xl newstyle">Screenshots</div>
        <Swiper
          breakpoints={{
            450: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            700: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          scrollbar={{
            draggable: true,
            hide: false,
          }}
          navigation={true}
          className="h-[220px] xl:h-[270px] mt-10 px-6 w-[95%] mx-auto"
          modules={[Scrollbar, Navigation]}
        >
          {fakedata.map((el, i) => (
            <SwiperSlide key={i} className="w-[350px]">
              <Image
                src={el.img}
                width={500}
                height={200}
                alt=""
                className="cursor-pointer"
                onClick={() => setprev(true)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {prev && (
        <div className="fixed grid place-items-center w-full h-screen z-[500] top-0 left-0 bg-black/30 backdrop-blur-sm">
          <div
            className="absolute top-0 left-0 -z-10 w-full h-full"
            onClick={() => setprev(false)}
          ></div>
          <Swiper
            navigation={true}
            className="w-[98%] md:w-[600px] mx-auto"
            modules={[Navigation]}
          >
            {fakedata.map((el, i) => (
              <SwiperSlide key={i} className="w-[500px]">
                <Image src={el.img} width={600} height={200} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
