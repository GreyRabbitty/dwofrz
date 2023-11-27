import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PandoraMintBTC from "../../components/Pandora/PandoraSections/PandoraMintBTC";
import PandoraMintSOL from "../../components/Pandora/PandoraSections/PandoraMintSOL";

const Mint = () => {
  const router = useRouter();
  const [pandoraVersion, setPandoraVersion] = useState("");
  const [stateValues, setStateValues] = useState(null);
  // const { name, boxesMinted, price, treasury } = stateValues || {};

  useEffect(() => {
    const { state } = router.query;
    if (state) {
      const item = JSON.parse(state);
      setStateValues({ item });
      // // console.log(item);
    }
  }, [router]);

  useEffect(() => {
    const isPandoraChainExist = localStorage.getItem("pandoraChain");
    setPandoraVersion(JSON.parse(isPandoraChainExist));
  }, []);

  return (
    <>
      <Head>
        <title>Dworfz | Pandora - Mint</title>
        <link rel="rel" href="/favicon.ico" />
      </Head>

      {pandoraVersion === "SOL" ? (
        <PandoraMintSOL key="SOL" />
      ) : pandoraVersion === "BTC" ? (
        <PandoraMintBTC key="BTC" stateValues={stateValues} />
      ) : (
        <h1 className="text-white font-bold text-base md:text-xl lg:text-2xl text-center mt-24">
          No data found
        </h1>
      )}
    </>
  );
};

export default Mint;
