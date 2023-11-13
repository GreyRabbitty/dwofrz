import { useEffect, useState } from "react";
import PandorasSOL from "../../components/Pandora/PandoraSections/PandorasSOL";
import Head from "next/head";
import PandorasBTC from "../../components/Pandora/PandoraSections/PandorasBTC";

export default function pandora() {
  const [pandoraVersion, setPandoraVersion] = useState("");

  const handlePandoraVersion = (version) => {
    localStorage.setItem("pandoraChain", JSON.stringify(version));
    setPandoraVersion(version);
  };

  useEffect(() => {
    const isPandoraChainExist = localStorage.getItem("pandoraChain");
    setPandoraVersion(JSON.parse(isPandoraChainExist));
  }, []);

  return (
    <>
      <Head>
        <title>Dworfz | Pandora</title>
        <link rel="rel" href="/favicon.ico" />
      </Head>

      <div className="w-full relative">
        <div className="absolute w-full left-[50%] translate-x-[-50%] xsm:translate-x-0 xsm:left-auto xsm:right-8 top-5 flex justify-center xsm:justify-end items-center space-x-3">
          <button
            onClick={() => handlePandoraVersion("SOL")}
            className={`flex justify-center items-center py-1.5 xsm:py-2 px-4 xsm:px-5 rounded-full ${
              pandoraVersion === "SOL" ? "bg-yellowGradient" : "bg-cusEL-200"
            }`}
          >
            <img
              src="/sollogo2.png"
              alt=""
              className="w-5 xsm:w-6 h-auto drop-shadow-[0px_0px_5px_#00000020]"
            />
            <h5 className="text-white ml-2 font-bold text-lg mdd:text-xl">
              SOL
            </h5>
          </button>
          <button
            onClick={() => handlePandoraVersion("BTC")}
            className={`flex justify-center items-center py-1.5 xsm:py-2 px-4 xsm:px-5 rounded-full ${
              pandoraVersion === "BTC" ? "bg-yellowGradient" : "bg-cusEL-200"
            }`}
          >
            <img
              src="/btc.png"
              alt=""
              className="w-5 xsm:w-6 h-auto drop-shadow-[0px_0px_5px_#00000020]"
            />
            <h5 className="text-white ml-2 font-bold text-lg mdd:text-xl">
              BTC
            </h5>
          </button>
        </div>

        <div className="pt-14 xsm:pt-0">
          {pandoraVersion === "SOL" ? (
            <PandorasSOL key="SOL" />
          ) : pandoraVersion === "BTC" ? (
            <PandorasBTC key="BTC" />
          ) : (
            <h1 className="text-white font-bold text-base md:text-xl lg:text-2xl text-center mt-24">
              No data found
            </h1>
          )}
        </div>
      </div>
    </>
  );
}
