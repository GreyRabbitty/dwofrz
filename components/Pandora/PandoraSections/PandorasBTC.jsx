import { Container } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BASE_URL2,
  GET_PANDORAS,
} from "../../../pages/api/pandora/pandora_apis";

// Import Swiper styles
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";

// icons
import { GoUnverified, GoVerified } from "react-icons/go";

const PandorasBTC = () => {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [boxes, setBoxes] = useState();
  const [pandoras, setPandoras] = useState([]);

  const getPandoras = () => {
    axios
      .get(BASE_URL2 + GET_PANDORAS)
      .then((res) => {
        setPandoras(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  useEffect(() => {
    setHydrated(true);
    setIsLoading(true);
    getPandoras();
  }, []);

  return (
    <Container className="max-w-screen-xl pb-72">
      <div className="w-fit text-center mx-auto pt-10">
        <div className="max-w-[100px] xsm:max-w-[176px] h-auto mx-auto">
          <img src="/dwofrzlogo.png" alt="" className="w-full h-auto" />
        </div>
        <h2 className="text-lg ssm:text-xl mdd:text-2xl lg:text-3xl llg:text-4xl font-black text-transparent bg-clip-text bg-yellowGradient uppercase mt-3">
          Welcome to Pandora!
        </h2>
      </div>

      <div className="mt-16 mdd:pl-[60px]">
        <div className="w-fit flex justify-center items-center">
          <GoVerified className="text-green-400 text-lg ssm:text-xl xsm:text-2xl lg:text-[27px] 2xl:text-3xl mr-1 xsm:mr-2 -mb-0.5" />
          <h2 className="text-lg ssm:text-xl xsm:text-2xl mdd:text-[27px] lg:text-3xl llg:text-[33px] 2xl:text-4xl font-black text-transparent bg-clip-text bg-yellowGradient">
            Verified Launches
          </h2>
        </div>

        <div className="mt-4 md:mt-6">
          {hydrated && (
            <Swiper
              spaceBetween={30}
              autoplay={{
                delay: 2000,
                stopOnLastSlide: false,
              }}
              loop={false}
              breakpoints={{
                1640: {
                  slidesPerView: 6,
                  spaceBetween: 30,
                },
                1500: {
                  slidesPerView: 6,
                  spaceBetween: 20,
                },
                1400: {
                  slidesPerView: 5,
                  spaceBetween: 40,
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 25,
                },
                769: {
                  slidesPerView: 3,
                  spaceBetween: 25,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                440: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
              }}
              className="min-h-[240px] lgg:min-h-[210px]"
              modules={[Autoplay, Navigation]}
            >
              {isLoading ? (
                [1].map((item) => {
                  return (
                    <SwiperSlide key={item} className="group">
                      <Skeleton
                        variant="rounded"
                        classes={{
                          root: "bg-cusEL-200 h-[320px] ssm:h-[270px] w-full rounded-lg",
                        }}
                      />
                    </SwiperSlide>
                  );
                })
              ) : pandoras.length < 1 ? (
                <div
                  key="dfsdaf"
                  className="w-full h-[320px] ssm:h-[270px] bg-darkGradient flex justify-center items-center rounded-lg"
                >
                  <p className="text-gray-300 text-xs ssm:text-sm md:text-base mmd:text-lg">
                    No Launches available
                  </p>
                </div>
              ) : (
                pandoras.map((item, i) => {
                  if (item?.name === "count") {
                    return;
                  }

                  return (
                    <SwiperSlide key={i} className="group">
                      <div className="w-full h-fit mt-4 relative">
                        <Link
                          href={{
                            pathname: `/pandora/mint`,
                            query: { state: JSON.stringify(item) },
                          }}
                        >
                          <div className="card h-[320px] ssm:h-[280px] rounded-lg overflow-hidden shadow-xl border border-cusEL-200">
                            <div className="back">
                              <div className="back-content bg-darkGradient">
                                <div className="w-full h-64 ssm:h-52 relative">
                                  <img
                                    src={item?.img}
                                    alt=""
                                    className="h-full w-full object-center object-cover rounded-t-lg"
                                  />
                                  {!item?.minting ? (
                                    <div className="absolute bottom-3 left-[50%] translate-x-[-50%]  px-3 py-1 bg-cusEL-200/70 w-9/12 rounded-full">
                                      <h5 className="text-white font-bold text-sm text-center">
                                        Mint: {item?.mint_date}
                                      </h5>
                                    </div>
                                  ) : (
                                    <div className="absolute bottom-3 left-[50%] translate-x-[-50%]  px-3 py-1 bg-cusEL-200/70 w-9/12 rounded-full">
                                      <h5 className="text-green-500 font-bold text-sm text-center">
                                        Claiming
                                      </h5>
                                    </div>
                                  )}
                                </div>
                                <div className="p-3 h-fit text-center">
                                  <h4 className="text-gray-200 text-lg font-bold break-words break-all">
                                    {item?.name}
                                  </h4>
                                  <h4 className="text-orange-400 text-lg font-semibold break-words break-all">
                                    {item?.price} BTC
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>

                        <div className="absolute -top-2 -right-4 px-3 py-1 bg-cusYellow rounded-full flex justify-end items-center">
                          <img
                            src="/pandora/images/boxs.png"
                            alt=""
                            className="w-5 h-auto"
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })
              )}
            </Swiper>
          )}
        </div>
      </div>

      <div className="mt-24 ">
        <div className="w-fit flex justify-center items-center mdd:px-[60px]">
          <GoUnverified className="text-red-500 text-lg ssm:text-xl xsm:text-2xl lg:text-[27px] 2xl:text-3xl mr-1 xsm:mr-2 -mb-1.5" />
          <h2 className="text-lg ssm:text-xl xsm:text-2xl mdd:text-[27px] lg:text-3xl llg:text-[33px] 2xl:text-4xl font-black text-transparent bg-clip-text bg-yellowGradient">
            Unverified Launches
          </h2>
        </div>

        <div className="mt-4 md:mt-6">
          <div className="h-[320px] ssm:h-[270px] bg-darkGradient rounded-lg flex justify-center items-center">
            <img
              src="/coming_soon.png"
              alt=""
              className="mx-auto h-[30%] w-auto -mt-5"
            />
          </div>

          {/* {hydrated && (
                <Swiper
                  spaceBetween={30}
                  autoplay={{
                    delay: 2000,
                    stopOnLastSlide: false,
                  }}
                  loop={true}
                  breakpoints={{
                    1640: {
                      slidesPerView: 6,
                      spaceBetween: 30,
                    },
                    1500: {
                      slidesPerView: 6,
                      spaceBetween: 20,
                    },
                    1400: {
                      slidesPerView: 5,
                      spaceBetween: 40,
                    },
                    1280: {
                      slidesPerView: 5,
                      spaceBetween: 20,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 25,
                    },
                    769: {
                      slidesPerView: 3,
                      spaceBetween: 25,
                    },
                    640: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    440: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                  }}
                  className="min-h-[240px] lgg:min-h-[210px]"
                  modules={[Autoplay, Navigation]}
                >
                  {isLoading
                    ? [1, 2, 3, 4, 5, 6].map((item) => {
                        return (
                          <SwiperSlide key={item}>
                            <Skeleton
                              variant="rounded"
                              classes={{
                                root: "bg-cusEL-200 h-[320px] ssm:h-[270px] w-full rounded-lg",
                              }}
                            />
                          </SwiperSlide>
                        );
                      })
                    : unverifiedPandoras &&
                      unverifiedPandoras.map((item) => {
                        const { id, name, preview_image, minting, mint_date } =
                          item;

                        return (
                          <SwiperSlide key={id}>
                            <Link href="/pandora/mint">
                              <div className="h-[320px] ssm:h-[270px] bg-darkGradient rounded-lg overflow-hidden shadow-xl border border-cusEL-200">
                                <div className="w-full h-64 ssm:h-52 relative">
                                  <img
                                    src={preview_image}
                                    alt=""
                                    className="h-full w-full object-center object-cover rounded-t-lg"
                                  />
                                  {minting && (
                                    <div className="absolute bottom-3 left-[50%] translate-x-[-50%]  px-5 py-1 bg-cusEL-200/80 w-9/12 rounded-full">
                                      <h5 className="text-white font-normal text-sm text-center">
                                        Mint: {mint_date}
                                      </h5>
                                    </div>
                                  )}
                                </div>
                                <div className="p-3 text-center ">
                                  <h4 className="text-gray-300 text-lg font-semibold">
                                    {name}
                                  </h4>
                                </div>
                              </div>
                            </Link>
                          </SwiperSlide>
                        );
                      })}
                </Swiper>
              )} */}
        </div>
      </div>
    </Container>
  );
};

export default PandorasBTC;
