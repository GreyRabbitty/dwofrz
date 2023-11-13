import { Web3Provider } from "@ethersproject/providers";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
    Coin98WalletAdapter,
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import React, { FC, ReactNode, useMemo, useState } from "react";
import { ConterProvider } from "../components/Counter/CounterCountext";
import Topnavbar from "../components/Navbar/Topnavbar";
import { NavProvider } from "../components/Navbar/utils/navContext";
import { HolderProvider } from "../components/utils/holder_context";
import { LoadingProvider } from "../components/utils/holder_context_loading";
import { NftProvider } from "../components/utils/nft";
import "../styles/globals.css";
require("@solana/wallet-adapter-react-ui/styles.css");
// import Profile from "../components/Navbar/profile";
import * as auth from "@supabase/auth-helpers-react";
import { signIn, signOut, useSession } from "next-auth/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { SessionProvider } from "next-auth/react"
import { ExternalProvider } from "@ethersproject/providers";
import { StyledEngineProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "next-themes";
import { createGlobalStyle } from "styled-components";
import { MetaplexProvider } from "../components/MetaplexProvider/MetaplexProvider";
import Leftnavbar from "../components/Navbar/Leftnavbar";
import { DworfzHolderProvider } from "../components/utils/dworfz_holder_context";

import { Provider } from 'next-auth/client';

declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const getLibrary = (provider: any) => {
    return new Web3Provider(provider);
  };

  const [supabase] = useState(() => createBrowserSupabaseClient());
  const [session] = useSession();
  const supabase_session = auth.useSession();

  return (
    <DworfzHolderProvider>
      <ToastContainer theme="dark" />
      <NftProvider>
        <LoadingProvider>
          <HolderProvider>
            <NavProvider>
              <ConterProvider>
                <SessionContextProvider
                  supabaseClient={supabase}
                  initialSession={pageProps.initialSession}
                >
                  <Web3ReactProvider getLibrary={getLibrary}>
                    <ThemeProvider enableSystem={false}>
                      <Context>
                        <StyledEngineProvider injectFirst>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Provider session={pageProps.session}>
                              <div className="hidden mdd:block">
                                <Leftnavbar />
                              </div>
                              {/* {(!session || !supabase_session) && <Profile />} */}
                              <Topnavbar />
                              <Component {...pageProps} />
                            </Provider>
                          </LocalizationProvider>
                        </StyledEngineProvider>
                      </Context>
                    </ThemeProvider>
                  </Web3ReactProvider>
                </SessionContextProvider>
              </ConterProvider>
            </NavProvider>
          </HolderProvider>
        </LoadingProvider>
      </NftProvider>
    </DworfzHolderProvider>
  );
}

export default MyApp;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint.
  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const endpoint =
    "https://necessary-blue-tab.solana-mainnet.quiknode.pro/add199e47039f22ea6b07d8eade4cec69b1908b9/";
  // const endpoint = "https://api.devnet.solana.com";

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
      new Coin98WalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <MetaplexProvider>{children}</MetaplexProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
