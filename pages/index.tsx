import { Container } from "@mui/material";
import type { NextPage } from "next";
import { useTheme } from "next-themes";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Homepage from "../components/home/Homepage";

import { signIn, signOut, useSession, } from 'next-auth/client';
 
const Home: NextPage = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const [session] = useSession();

  useEffect(() => {
    const { pathname } = router;

    // if (pathname === "/" && pathname.length === 1) {
    //   document.documentElement.style.setProperty("--max-width", "1600px");
    // } else {
    //   document.documentElement.style.removeProperty("--max-width");
    // }
  }, [router.pathname]);

  return (
    <div className="overflow-x-hidden mdd:pl-20 3xl:pl-0">
      <Head>
        <title>Dworfz | Ragnarok</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/Art.png" />
      </Head>

      <Container className="max-w-screen-xl pb-10">
        <Homepage />
      </Container>
      {/* {!session && <>
        Not signed in <br/>
        <button onClick={() => signIn()}>Sign in</button>
      </>}
      {session && <>
        Signed in as {session.user ? session.user.email : ''} <br/>
        <button onClick={() => signOut()}>Sign out</button>
      </>} */}
    </div>
  );
};

export default Home;
