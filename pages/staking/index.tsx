import { Button } from "@mui/material";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useMetaplex } from "../../components/MetaplexProvider/useMetaplex";
import { stake } from "../../lib/staking/instruction/stake";
import { unstake } from "../../lib/staking/instruction/unstake";
import { claim } from "../../lib/staking/reward/claim";
// import { update_reward_distributor } from "../../lib/staking/reward/update_reward_distributer";
import { ScaleLoader } from "react-spinners";
import { CountdownTimer } from "../../components/Counter/Counter";
import { update_stake_pool } from "../../lib/staking/pool/update_stake_pool";
import { update_reward_distributor } from "../../lib/staking/reward/update_reward_distributer";
import { get_pool } from "../../lib/utils/find_pool";
import { get_claim_amount } from "../../lib/utils/get_claim_amount";
import { get_total_staked } from "../../lib/utils/get_pool_info";
import { getStakeEntriesForUser } from "../../lib/utils/get_staked_nft";
import { get_staked } from "../../lib/utils/get_staked_nfts";
import { splite_Array } from "../../lib/utils/utils";

export default function index() {
  const [nfts, setNfts] = useState<any[]>();
  const [staked, setStaked] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>();
  const [amount, setAmount] = useState<number>();
  const [total_Staked, setTotalStaked] = useState<number>();

  const { metaplex } = useMetaplex();
  const AnchorWallet = useAnchorWallet();
  const wallet = useWallet();
  // const connection = new Connection(clusterApiUrl("devnet"));
  const connection = new Connection(
    "https://necessary-blue-tab.solana-mainnet.quiknode.pro/add199e47039f22ea6b07d8eade4cec69b1908b9/"
  );

  async function init_pool() {
    // try {
      const pubkey = new PublicKey(
        "HqTe2enoGBB1VBu6FfahXK8PrWjAXxGYMkWyZeK7nYT9"
      );

      if (!AnchorWallet) return;
    const look_periode = 60 * 60;
  const tx1 = await update_stake_pool(
    AnchorWallet,
    connection,
    "STAKED",
    "https://nftstorage.link/ipfs/bafybeihbbhiztt7pomu6szwqr56uaffksjq476p2djq6vactydcbqabcg4/4664.png",
    [],
    [pubkey],
    false,
    false,
    null,
    look_periode,
    null,
    false
    )
    
  // const mint = new PublicKey("PNTNyw5Yqb2Qf5jMV7jhfDMBaTDpxBKiyYS8uVzCCPH");
  const stake_pool = new PublicKey(
    "J5pFu3e73kYN6C7hqu2W8zBupsQyGeDNxUDzpn9NyZLp"
  );
  // console.log("pool: " + stake_pool.toBase58());

  // const tx2 = await update_reward_distributor(
  //   AnchorWallet,
  //   connection,
  //   stake_pool,
  //   2160,
  //   86400,
  // );

  // const tx = new Transaction().add(tx1).add(tx2)

  // let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
  // tx.recentBlockhash = blockhash;
  // tx.feePayer = new PublicKey(AnchorWallet!.publicKey);

  // const signed_tx = await wallet.signTransaction!(tx);

  // const hash = await connection.sendRawTransaction(signed_tx.serialize());
  // const confirmation = await connection.confirmTransaction(
  //   hash,
  //   "confirmed"
  // );

  // if (confirmation.value.err) {
  //   notify_delete();
  //   notify_error("Transaction Failed!");
  //   return console.error(confirmation.value.err);
  // }
  //   } catch (e) {
  //     console.log(e);
  //   }
  }

  // async function initEntry() {
  //   try {
  //     if (!AnchorWallet) return;
  //     const pool = new PublicKey("J5pFu3e73kYN6C7hqu2W8zBupsQyGeDNxUDzpn9NyZLp");
  //     const mint = nfts![select![0]].mintAddress;

  //     await init_entry(AnchorWallet, pool.toBase58(), connection, mint);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // async function _init_identifier() {
  //   try {
  //     if (!AnchorWallet) return;
  //     await init_identifier(AnchorWallet, connection);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  async function stakingAll() {
    try {
      if (!AnchorWallet || loading) return;
      setLoading(true);
      notify_laoding("transaction pending...");
      const pool = new PublicKey(
        "J5pFu3e73kYN6C7hqu2W8zBupsQyGeDNxUDzpn9NyZLp"
      );
      // const mint = new PublicKey("3gdkoBcL8UQ5kdrqSp8TVqf4UMtLAFwbiLzMcnT7myc4");

      const tx: Transaction[] = [];
      let j = 0;
      let len = nfts?.length;

      nfts?.map(async (nft) => {
        const mint = nft.mintAddress;

        const tx1 = await stake(
          AnchorWallet,
          mint,
          pool.toBase58(),
          connection,
          nft.programmableConfig
        );
        tx.push(tx1);
        j++;
      });

      while (j < len!) {
        await new Promise((resolve) => setTimeout(resolve, 100)); // wait for 5 seconds
      }

      const txx = splite_Array(tx, 50);
      console.log(txx);
      await Promise.all(txx.map( async (t) => {
      const signedTransactions = await wallet.signAllTransactions!(t);
      for (const ta of signedTransactions) {
        const txid = await connection.sendRawTransaction(ta.serialize(), {
          skipPreflight: true,
        });
      }
    }))

      notify_delete();
      notify_success("Transaction Success!");

      nfts?.map((n) => {
        setStaked((staked) => [...staked!, n]);
      });
      setNfts(undefined);

      // setStaked(staked as any).push(nft as any))

      setSelect([]);
      setSelect2([]);
    } catch (e) {
      notify_delete();
      notify_error("Transaction Failed!");
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function staking() {
    try {
      if (!AnchorWallet || loading) return;
      if (select.length == 0) return;
      setLoading(true);
      notify_laoding("transaction pending...");
      const pool = new PublicKey(
        "J5pFu3e73kYN6C7hqu2W8zBupsQyGeDNxUDzpn9NyZLp"
      );
      // const mint = new PublicKey("3gdkoBcL8UQ5kdrqSp8TVqf4UMtLAFwbiLzMcnT7myc4");
      let arr: any[] = [];
      select.map((num) => {
        const res = nfts?.filter((n) => n.id == num);
        arr.push(...res!);
      });

      console.log(arr);

      const tx: Transaction[] = [];
      let j = 0;
      let len = arr?.length;

      arr?.map(async (nft) => {
        const mint = nft.mintAddress;
        console.log(nft.mintAddress);

        const tx1 = await stake(
          AnchorWallet,
          mint,
          pool.toBase58(),
          connection,
          nft.programmableConfig
        );
        tx.push(tx1);
        j++;
      });

      while (j < len!) {
        await new Promise((resolve) => setTimeout(resolve, 100)); // wait for 5 seconds
      }
      const signedTransactions = await wallet.signAllTransactions!(tx);
      for (const ta of signedTransactions) {
        const txid = await connection.sendRawTransaction(ta.serialize(), {
          skipPreflight: true,
        });
      }

      notify_delete();
      notify_success("Transaction Success!");

      // setStaked(staked as any).push(nft as any))
      setStaked((staked) => [...staked!, ...arr]);
      let nftss = nfts;
      arr.map((nft) => {
        nftss = nftss!.filter(
          (item: any) => item.mintAddress !== nft.mintAddress
        );
      });
      setNfts(nftss);

      setSelect([]);
      setSelect2([]);
    } catch (e) {
      notify_delete();
      notify_error("Transaction Failed!");
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function claiming() {
    try {
      if (!AnchorWallet || loading) return;
      if (select2.length == 0) return;
      setLoading(true);
      notify_laoding("transaction pending...");
      const pool = new PublicKey(
        "J5pFu3e73kYN6C7hqu2W8zBupsQyGeDNxUDzpn9NyZLp"
      );
      // const mint = new PublicKey("3gdkoBcL8UQ5kdrqSp8TVqf4UMtLAFwbiLzMcnT7myc4");

      let arr: any[] = [];
      select2.map((num) => {
        const res = staked?.filter((n) => n.id == num);
        arr.push(...res!);
      });

      arr = arr.filter((a) => a.amount_to_claim > 0);

      if (arr.length == 0) {
        return notify_worning("Nothing To Claim!");
      }

      console.log(arr);

      const tx: Transaction[] = [];
      let j = 0;
      let len = arr?.length;

      arr?.map(async (nft) => {
        const mint = nft.mintAddress;
        console.log(nft.mintAddress);

        const reward_mint = new PublicKey(
          "PNTNyw5Yqb2Qf5jMV7jhfDMBaTDpxBKiyYS8uVzCCPH"
        );

        const tx1 = await claim(
          AnchorWallet,
          wallet,
          connection,
          pool,
          mint,
          reward_mint
        );
        tx.push(tx1);
        j++;
      });

      while (j < len!) {
        await new Promise((resolve) => setTimeout(resolve, 100)); // wait for 5 seconds
      }


  

      const signedTransactions = await wallet.signAllTransactions!(tx);
      for (const ta of signedTransactions) {
        const txid = await connection.sendRawTransaction(ta.serialize(), {
          skipPreflight: true,
        });
      }

      setSelect([]);
      setSelect2([]);

      notify_delete();
      notify_success("Transaction Success!");
    } catch (e) {
      notify_delete();
      notify_error("Transaction Failed!");
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function claimAll() {
    try {
      if (!AnchorWallet || loading) return;
      setLoading(true);
      notify_laoding("transaction pending...");
      const pool = new PublicKey(
        "J5pFu3e73kYN6C7hqu2W8zBupsQyGeDNxUDzpn9NyZLp"
      );
      // const mint = new PublicKey("3gdkoBcL8UQ5kdrqSp8TVqf4UMtLAFwbiLzMcnT7myc4");

      const tx: Transaction[] = [];
      let j = 0;
      let len = staked?.length;
      const reward_mint = new PublicKey(
        "PNTNyw5Yqb2Qf5jMV7jhfDMBaTDpxBKiyYS8uVzCCPH"
      );

      staked?.map(async (nft) => {
        if (nft.amount_to_claim > 0) {
        const mint = nft.mintAddress;
        const tx1 = await claim(
          AnchorWallet,
          wallet,
          connection,
          pool,
          mint,
          reward_mint
        );
          tx.push(tx1);
        }
        j++;
      });

      while (j < len!) {
        await new Promise((resolve) => setTimeout(resolve, 100)); // wait for 5 seconds
      }

      const txx = splite_Array(tx, 50);
      console.log(txx);
      await Promise.all(txx.map( async (t) => {
        const signedTransactions = await wallet.signAllTransactions!(t);
        for (const ta of signedTransactions) {
          const txid = await connection.sendRawTransaction(ta.serialize(), {
            skipPreflight: true,
          });
        }
      }))
      setSelect([]);
      setSelect2([]);

      notify_delete();
      notify_success("Transaction Success!");
    } catch (e) {
      notify_delete();
      notify_error("Transaction Failed!");
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function unstaking() {
    try {
      if (!AnchorWallet || loading) return;
      if (select2.length == 0) return;
      setLoading(true);
      notify_laoding("transaction pending...");
      const pool = new PublicKey(
        "J5pFu3e73kYN6C7hqu2W8zBupsQyGeDNxUDzpn9NyZLp"
      );
      // const mint = new PublicKey("3gdkoBcL8UQ5kdrqSp8TVqf4UMtLAFwbiLzMcnT7myc4");

      let arr: any[] = [];
      select2.map((num) => {
        const res = staked?.filter((n) => n.id == num);
        arr.push(...res!);
      });


      const tx: Transaction[] = [];
      let j = 0;
      let len = arr?.length;

      arr?.map(async (nft) => {
        const mint = nft.mintAddress;
        console.log(nft.mintAddress);

        const reward_mint = new PublicKey(
          "PNTNyw5Yqb2Qf5jMV7jhfDMBaTDpxBKiyYS8uVzCCPH"
        );

        const tx1 = await unstake(
          AnchorWallet,
          wallet,
          mint,
          pool.toBase58(),
          connection,
          reward_mint
        );
        tx.push(tx1);
        j++;
      });

      while (j < len!) {
        await new Promise((resolve) => setTimeout(resolve, 100)); // wait for 5 seconds
      }
      const signedTransactions = await wallet.signAllTransactions!(tx);
      for (const ta of signedTransactions) {
        const txid = await connection.sendRawTransaction(ta.serialize(), {
          skipPreflight: true,
        });
      }

      setNfts((nfts) => [...nfts!, ...arr]);
      let stakedd = staked;
      arr.map((nft) => {
        stakedd = stakedd!.filter(
          (item: any) => item.mintAddress !== nft.mintAddress
        );
      });
      setStaked(stakedd);

      setSelect([]);
      setSelect2([]);
      notify_delete();
      notify_success("Transaction Success!");
    } catch (e) {
      setLoading(false);
      notify_delete();
      notify_error("Transaction Failed!");
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function unstakingAll() {
    try {
      if (!AnchorWallet || loading) return;
      setLoading(true);
      notify_laoding("transaction pending...");
      const pool = new PublicKey(
        "J5pFu3e73kYN6C7hqu2W8zBupsQyGeDNxUDzpn9NyZLp"
      );
      // const mint = new PublicKey("3gdkoBcL8UQ5kdrqSp8TVqf4UMtLAFwbiLzMcnT7myc4");

      const tx: Transaction[] = [];
      let j = 0;
      let len = staked?.length;

      staked?.map(async (nft) => {
        const mint = nft.mintAddress;

        const reward_mint = new PublicKey(
          "PNTNyw5Yqb2Qf5jMV7jhfDMBaTDpxBKiyYS8uVzCCPH"
        );

        const tx1 = await unstake(
          AnchorWallet,
          wallet,
          mint,
          pool.toBase58(),
          connection,
          reward_mint
        );
        tx.push(tx1);
        j++;
      });

      while (j < len!) {
        await new Promise((resolve) => setTimeout(resolve, 100)); // wait for 5 seconds
      }

      const txx = splite_Array(tx, 50);
      console.log(txx);
      await Promise.all(txx.map( async (t) => {
      const signedTransactions = await wallet.signAllTransactions!(t);
      for (const ta of signedTransactions) {
        const txid = await connection.sendRawTransaction(ta.serialize(), {
          skipPreflight: true,
        });
      }
    }))
      notify_delete();
      notify_success("Transaction Success!");

      staked?.map((n) => {
        setNfts((nfts) => [...nfts!, n]);
      });
      setStaked([]);

      // setStaked(staked as any).push(nft as any))

      setSelect([]);
      setSelect2([]);
    } catch (e) {
      notify_delete();
      notify_error("Transaction Failed!");
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  // async function unstakingAll() {
  //   try {
  //     if (!AnchorWallet || loading) return;
  //     setLoading(true);
  //     notify_laoding("transaction pending...");
  //     const pool = new PublicKey(
  //       "J5pFu3e73kYN6C7hqu2W8zBupsQyGeDNxUDzpn9NyZLp"
  //     );
  //     // const mint = new PublicKey("3gdkoBcL8UQ5kdrqSp8TVqf4UMtLAFwbiLzMcnT7myc4");

  //     const tx: Transaction[] = [];
  //     let j = 0;
  //     let len = staked?.length;

  //     staked?.map(async (nft) => {
  //       const mint = nft.mintAddress;

  //       const reward_mint = new PublicKey(
  //         "PNTNyw5Yqb2Qf5jMV7jhfDMBaTDpxBKiyYS8uVzCCPH"
  //       );

  //       const tx1 = await unstake(
  //         AnchorWallet,
  //         wallet,
  //         mint,
  //         pool.toBase58(),
  //         connection,
  //         reward_mint
  //       );
  //       tx.push(tx1);
  //       j++;
  //     });

  //     while (j < len!) {
  //       await new Promise((resolve) => setTimeout(resolve, 100)); // wait for 5 seconds
  //     }

  //     const signedTransactions = await wallet.signAllTransactions!(tx);
  //     for (const ta of signedTransactions) {
  //       const txid = await connection.sendRawTransaction(ta.serialize(), {
  //         skipPreflight: true,
  //       });
  //     }

  //     notify_delete();
  //     notify_success("Transaction Success!");

  //     staked?.map((n) => {
  //       setNfts((nfts) => [...nfts!, n]);
  //     });
  //     setStaked(undefined);

  //     // setStaked(staked as any).push(nft as any))

  //     setSelect(undefined);
  //     setSelect2(undefined);
  //   } catch (e) {
  //     notify_delete();
  //     notify_error("Transaction Failed!");
  //     console.log(e);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const styleButton = {
    fontSize: "0.8vw",
    backgroundColor: "#1E2126",
    borderRadius: "0.4vw",
    color: "#fff",
    ":hover": {
      background: "#1E212688",
      color: "#fff",
    },
    padding: "1vw 2vw",
    "@media (max-width:767px)": {
      padding: "3vw 3vw",
      fontSize: "2.6vw",
      borderRaduis: "2vw",
    },
  };
  const styleButton2 = {
    fontSize: "0.8vw",
    backgroundColor: "#1E2126",
    borderRadius: "0.4vw",
    color: "#fff",
    ":hover": {
      background: "#1E212688",
      color: "#fff",
    },
    padding: "1vw 2vw",
    "@media (max-width:767px)": {
      padding: "3vw 3vw",
      fontSize: "2.6vw",
      borderRaduis: "2vw",
    },
  };

  async function get_nfts() {
    try {
      setLoading1(true);
      setLoading2(true);
      if (!AnchorWallet) {
        setLoading1(false);
        setLoading2(false);
      }
      if (!metaplex) return;
      
      // const wallet = new PublicKey(
      //   "FytJzjP8iNbQj324c5XgVMzWovbKaiGQee6KSFuG2PA5"
      // );
      let tokens = await (metaplex as any).nfts().findAllByOwner({
        owner:
          // wallet
          (metaplex as any).identity().publicKey,
      });
      const pool = new PublicKey(
        "J5pFu3e73kYN6C7hqu2W8zBupsQyGeDNxUDzpn9NyZLp"
      );

      const total_staked = await get_total_staked(
        AnchorWallet,
        connection,
        pool.toBase58()
      );
      setTotalStaked(total_staked);

      let token: any = [];

      tokens.map((nft: any) => {
        if (nft.creators && nft.creators[0] && nft.creators[0].address) {
          if (
            nft.creators[0].address.toBase58() ==
            "HqTe2enoGBB1VBu6FfahXK8PrWjAXxGYMkWyZeK7nYT9"
          ) {
            token.push(nft);
          }
        }
      });

      // console.log(token)

      let staked_nfts = await getStakeEntriesForUser(
        connection,
        AnchorWallet?.publicKey!,
        "finalized"
      );
      // = await get_staked(
      //   AnchorWallet,
      //   connection,
      //   token,
      //   pool.toBase58()
      // );

      // await get_staked_test(
      //   AnchorWallet,
      //   connection,
      //   token,
      //   pool.toBase58()
      // );

      // console.log(staked_nfts);
      const result = await get_claim_amount(
        AnchorWallet,
        connection,
        staked_nfts!,
        pool.toBase58()
      );

      staked_nfts = result!.staked;

      setAmount(result!.amount);

      let leng = Number((token.length / 100).toFixed(0));
      // console.log(leng)
      let start = 0;
      let end = 100;
      for (let i = 0; i <= leng; i++) {
        const token_slice = token.slice(start, end);
        // console.log(token_slice)
        let len = token_slice.length;
        let j = 0;
        token_slice.map(async (nft: any, g: number) => {
          const rep_image = await fetch(nft.uri);
          const image = await rep_image.json();
          // console.log(g + start)
          token[g + 100 * i].id = g + 100 * i;
          token[g + 100 * i].image = image["image"];
          j = g;
        });
        if (j != len) {
          await new Promise((resolve) => setTimeout(resolve, 500)); // wait for 5 seconds
        }

        start = start + 100;
        end = end + 100;
        // console.log(start)
        // console.log(end);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // wait for 5 seconds
      }

      let len = token.length;
      let j = 0;
      token.map(async (nft: any, i: number) => {
        if (nft.image) {
        } else {
          const rep_image = await fetch(nft.uri);
          const image = await rep_image.json();
          // console.log(g + start)
          token[i].id = i;
          token[i].image = image["image"];
          // console.log("number:  " + i + "don't exist!");
        }
        j = i;
      });

      if (j != len) {
        await new Promise((resolve) => setTimeout(resolve, 500)); // wait for 5 seconds
      }

      let staked_nft: any[] = [];
      staked_nfts!.map((nft: any) => {
        let staked_nftss = token.filter(
          (n: any) => nft.originalMint.toBase58() == n.mintAddress.toBase58()
        );
        staked_nftss[0].amount_to_claim = nft.amount_to_claim;
        staked_nftss[0].lastStakedAt = nft.lastStakedAt;
        // console.log(staked_nftss)
        staked_nft.push(...staked_nftss);
      });

      // console.log("staked_nft");
      // console.log(staked_nft);

      let arr_token: any[] = [];
      token!.map((nft: any) => {
        let _token = staked_nfts!.filter(
          (n: any) => n.originalMint.toBase58() == nft.mintAddress.toBase58()
        );
        if (_token.length == 0) {
          arr_token.push(nft);
        }
      });

      // console.log(arr_token);
      // console.log(staked_nft);
      setNfts(arr_token);
      setLoading1(false);
      setStaked(staked_nft);
      setLoading2(false);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (!AnchorWallet){
      setLoading1(false);
      setLoading2(false);
      return;
    } 
    get_pool(AnchorWallet, connection);
    get_nfts();
  }, [AnchorWallet, AnchorWallet?.publicKey]);

  const data = [1, 2, 3];
  const data2 = [1, 2];
  const [select, setSelect] = useState<number[]>([]);
  const [select2, setSelect2] = useState<number[]>([]);

  function select_fun(id: number) {
    if (select.length == 0) {
      setSelect([id]);
      return;
    }
    const filtred = select.filter((n) => n == id);
    if (filtred.length > 0) {
      setSelect(select.filter((n) => n != id));
    } else {
      setSelect((select) => [...select, id]);
    }
  }

  function select_fun2(id: number) {
    if (select2.length == 0) {
      setSelect2([id]);
      return;
    }
    const filtred = select2.filter((n) => n == id);
    if (filtred.length > 0) {
      setSelect2(select2.filter((n) => n != id));
    } else {
      setSelect2((select2) => [...select2, id]);
    }
  }
  useEffect(() => {
    setSelect(select);
    console.log(select);
    setSelect2(select2);
  }, [select, select2]);

  function one() {
    setSelect([0]);
  }

  function two() {
    setSelect([0, 1]);
  }

  const notify_success = (msg: string) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const notify_worning = (msg: string) => {
    toast.warning(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const notify_error = (msg: string) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const notify_laoding = (msg: string) => {
    toast.loading(msg, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const notify_delete = () => {
    toast.dismiss();
  };

  const is_there = (id: number, arr: any[]) => {
    const res = arr.includes(id);
    // console.log(res);
    // console.log(id);
    // console.log(arr);
    if (res) {
      return "border-[0.09vw] bg-red-600 border-red-600";
    } else {
      return "bg-[#515660]";
    }
  };
  // const fakedata = [1, 2, , 3, 4, 5, 6, 7, 8];
  // const fakeImage =
  //   "https://cdn.discordapp.com/attachments/1085293900706627595/1137021432728129598/new.png";
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  function load() {
    return (
      <div className="absolute top-0 left-0 w-full h-full grid place-items-center">
        <div>
          <ScaleLoader color="#fb923c" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Staking</title>
      </Head>
      <div className="mx-auto w-[97vw] md:w-[86vw] my-[3vw]">
        <div className="w-full rounded-[1vw] bg-[#1E2126] h-auto py-[5vw] md:py-0 md:h-[7vw] flex flex-col md:flex-row justify-center gap-y-[5vw] md:gap-y-0 md:justify-between items-center px-[3vw] text-[4vw] leading-[5vw] md:leading-[1.8vw] md:text-[1.2vw]">
          <div>Total Staked: {total_Staked && total_Staked}/5454</div>
          <div>
            <span>Rewards Rate: 2.16 </span>
            <Link
              href={
                "https://solscan.io/address/AZzEWydRUE7NKu8Ke1HGfXA1CbBE9ZBo5jz9Tvd57W9q"
              }
              target="_blank"
              className="underline"
            >
              D-TOKEN
            </Link>
            <span> / Day</span>
          </div>
          <div>
            <div>Earnings: {amount ? amount : 0} D-Token</div>
            {/* <div className="text-[3vw] md:text-[0.7vw] text-white/70">
              0.0000000 Left in Treasury
            </div> */}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-[10vw] md:gap-0 justify-center md:justify-between items-center mt-[3vw]">
          <div className="w-fit">
            <div className="w-[97vw] md:w-[42vw] bg-[#1E2126] h-[95vw] min-h-[550px] md:min-h-fit overflow-hidden md:h-[42vw] rounded-[1vw] pt-[0.5vw]">
              <div className="my-[2vw] w-[94vw] md:w-[38vw] rounded-[1vw] h-[15vw] md:h-[6vw] mx-auto bg-[#353B44] flex justify-between items-center px-[2vw]">
                <div
                onClick={() => {
                  init_pool(); 
                }}
                className="text-[3vw] md:text-[0.9vw] text-white font-semibold">
                  Select Your Nft ({nfts?.length})
                </div>
              </div>
              <div
                id="my-scrollable-component"
                className="pb-[4vw] h-[85%] md:h-[78%] overflow-y-scroll relative"
              >
                {
                loading1 ?
                load()
                  :
                <div className="grid place-content-center  w-full md:w-[40vw] mx-auto grid-cols-2 md:grid-cols-3 gap-[4vw] md:gap-[1vw] px-[2vw]">
                  {nfts &&
                    nfts.map((nft: any, index: number) => (
                      <motion.div
                        whileTap={{ scale: 0.96 }}
                        onClick={() => select_fun(nft.id)}
                        className={`rounded-[2vw] md:rounded-[0.7vw] w-[45vw] md:w-[12vw] h-[35vw] md:h-[15vw] cursor-pointer ${is_there(
                          nft.id,
                          select
                        )}`}
                      >
                        <Image
                          src={nft.image}
                          width={9000}
                          height={3999}
                          className="rounded-[2vw] md:rounded-[0.7vw] h-[47vw] md:h-[12vw] object-cover object-center"
                          alt=""
                        />
                        <div className="mt-[1vw] py-[2vw] md:py-0 text-[3.8vw] md:text-[0.8vw] font-semibold text-center text-white">
                          {nft.name}
                        </div>
                      </motion.div>
                    ))}
                </div>
                }
              </div>
            </div>
            <div
              className={`flex justify-center md:justify-end my-[5vw] md:my-[1vw] gap-x-[2vw] md:gap-x-[1vw]`}
            >
              <div>
                <Button
                  onClick={() => {
                    !loading && staking();
                  }}
                  className={`px-4 llg:px-7 mx-auto customStylesButton6 lightOnHoverViolet  ${
                    loading && "cursor-not-allowed"
                  }`}
                >
                  Stake {(select.length)}
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    !loading && stakingAll();
                  }}
                  className={`px-4 llg:px-7 mx-auto customStylesButton6 lightOnHoverViolet  ${
                    loading && "cursor-not-allowed"
                  }`}
                >
                  Stake All
                </Button>
              </div>
            </div>
          </div>
          <div className="w-fit">
            <div className="w-[97vw] mx-auto md:mx-0 md:w-[42vw] bg-[#1E2126] min-h-[570px] md:min-h-fit h-[95vw] overflow-hidden md:h-[42vw] rounded-[1vw] pt-[0.5vw]">
              <div className="my-[2vw] w-[94vw] md:w-[38vw] rounded-[1vw] h-[16vw] md:h-[6vw] mx-auto bg-[#353B44] flex justify-between items-center px-[2vw]">
                <div className="text-[3vw] md:text-[0.9vw] text-white font-semibold">
                  Staked Nfts ({staked?.length})
                </div>
              </div>
              <div
                id="my-scrollable-component"
                className="pb-[4vw] h-[85%] md:h-[78%] overflow-y-scroll relative"
              >
                {
                loading2 ?
                load()
                  :
                <div className="grid place-content-center w-full md:w-[40vw] mx-auto grid-cols-2 md:grid-cols-3 gap-[4vw] md:gap-[1vw] px-[2vw]">
                  {staked &&
                    staked.map((nft: any, index: number) => (
                      <motion.div
                        whileTap={{ scale: 0.96 }}
                        onClick={() => select_fun2(nft.id)}
                        className={`rounded-[2vw] md:rounded-[0.7vw] w-[45vw] md:w-[12vw] cursor-pointer ${is_there(
                          nft.id,
                          select2
                        )}`}
                      >
                        <Image
                          src={nft.image}
                          width={9000}
                          height={3999}
                          className="rounded-[2vw] md:rounded-[0.7vw] h-[47vw] md:h-[12vw] object-cover object-center"
                          alt=""
                        />
                        <div className="pt-[2vw] md:pt-[0.8vw] px-[1vw] text-[3.8vw] md:text-[1vw] font-semibold text-start text-white">
                          {nft.name}
                        </div>
                        <div className="pt-[1.4vw] md:pt-[0.6vw] px-[1vw] text-[3vw] md:text-[0.8vw] flex justify-between">
                          <div>Claim:</div>
                          <div>
                            {nft.amount_to_claim ? 
                            nft.amount_to_claim.toFixed(10)
                            .replace(/\.?0+$/, "")
                            :
                            0}
                          </div>
                        </div>
                        <div className="py-[1.4vw] md:py-[0.6vw] px-[1vw] text-[3vw] md:text-[0.8vw] flex justify-between items-center">
                          <div>Unstake At:</div>
                          <div className="text-[2.7vw] md:text-[0.6vw] text-white/70">
                            <CountdownTimer finish={14} countdownTimestampMs={Number(nft.lastStakedAt) * 1000} width={"0.7vw"} />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>}
              </div>
            </div>
            <div
              className={`flex justify-center md:justify-end my-[5vw] md:my-[1vw] gap-x-[1vw]`}
            >
              <div>
                <Button
                  onClick={() => {
                    !loading && unstaking();
                  }}
                  className={`px-4 llg:px-7 mx-auto customStylesButton6 lightOnHoverViolet  ${
                    loading && "cursor-not-allowed"
                  }`}
                >
                  UnStake {(select2.length)}
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    !loading && unstakingAll();
                  }}
                  className={`px-4 llg:px-7 mx-auto customStylesButton6 lightOnHoverViolet  ${
                    loading && "cursor-not-allowed"
                  }`}
                >
                  UnStake All
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    !loading && claiming();
                  }}
                  className={` mx-auto customStylesButton6 lightOnHoverViolet  ${
                    loading && "cursor-not-allowed"
                  }`}
                >
                  Claim {(select2.length)}
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    !loading && claimAll();
                  }}
                  className={`px-4 llg:px-7 mx-auto customStylesButton6 lightOnHoverViolet  ${
                    loading && "cursor-not-allowed"
                  }`}
                >
                  Claim All
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
