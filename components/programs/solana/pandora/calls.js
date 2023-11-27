import * as coralAnchor from "@coral-xyz/anchor";
import * as anchor from "@project-serum/anchor";
import {
  createAssociatedTokenAccountInstruction,
  getOrCreateAssociatedTokenAccount,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import * as bs58 from "bs58";
import React, { useEffect, useState } from "react";
import {
  addPandora,
  adminLogin,
  getPandora,
  getPandoras,
  spinPandora,
} from "../../../../pages/api/pandora/pandora_calls";
import {
  recent_blockhash,
  SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
} from "../../../utils/constant";
import { find_pda } from "./find_pda";
import { initialze_claim } from "./inialize_claim";

const idl = require("./idl.json");
//Set up Solana and Anchor components
// const connection = new Connection(
//   "https://necessary-blue-tab.solana-mainnet.quiknode.pro/add199e47039f22ea6b07d8eade4cec69b1908b9/"
// );

export function generateRandomNumber() {
  const length = Math.floor(Math.random() * 7) + 1;
  const characters = "0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

export function generateRandomONumber() {
  let result = Math.floor(Math.random() * 3) + 1;

  return result;
}

//Set up program connection
const programId = new anchor.web3.PublicKey(idl.metadata.address);

const tokenMint = new anchor.web3.PublicKey(
  "PNTNyw5Yqb2Qf5jMV7jhfDMBaTDpxBKiyYS8uVzCCPH"
);

// Need to update this
const pandoraATA = new anchor.web3.PublicKey(
  "7kcTV8YM18m4TZCzzoM8a9eM3bsMU4KQuCLCSNzah5AZ"
);

const tokenProgramAddr = new anchor.web3.PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);

// const a = JSON.stringify(IDL);
// const b = JSON.parse(a);

// const getPandoras = () => {
//   const tryGet = connection.getProgramAccounts(programId).then((res) => {
//     // console.log(res);
//   });
// };

//Setup pandora with collection user wallet
export const setupPandora = async (wallet, name, max, price, cm) => {
  const provider = new coralAnchor.AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });
  const program = new anchor.Program(idl, programId, provider);
  try {
    const [pandoraPDA, bump] = PublicKey.findProgramAddressSync(
      [
        coralAnchor.utils.bytes.utf8.encode("PANDORA"),
        wallet.publicKey.toBuffer(),
        name,
        coralAnchor.utils.bytes.utf8.encode("MINT"),
      ],
      programId
    );

    const pandoraTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      wallet,
      tokenMint,
      wallet.publicKey
    );

    const collection_limit = new anchor.BN(10000);
    const priceInLamports = price * LAMPORTS_PER_SOL;
    const bnPrice = new anchor.BN(priceInLamports);
    const candy_machine = new anchor.web3.PublicKey(cm);

    const key = anchor.web3.Keypair.generate();
    const size = 10000;
    const lamport = await connection.getMinimumBalanceForRentExemption(
      8 + 8 + 8 + 32 * size
    );
    const tx1 = new anchor.web3.Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: key.publicKey,
        lamports: lamport,
        space: 8 + 8 + 8 + 32 * size,
        programId: programId,
      })
    );
    let blockhash = (await connection.getLatestBlockhash("finalized"))
      .blockhash;
    tx1.recentBlockhash = blockhash;
    tx1.feePayer = new anchor.web3.PublicKey(wallet.publicKey);
    tx1.sign(key);

    const signature = await wallet.sendTransaction(tx1, connection);
    await connection.confirmTransaction(signature, "finalized"); // // console.log(signedd_tx);
    // addPandora(name, max, price, pandoraPDA, pandoraTokenAccount);
    const tx2 = await program.methods
      .setupPandora(collection_limit, name, bnPrice, candy_machine, name)
      .accounts({
        storage: key.publicKey,
        pandora: pandoraPDA,
        tokenAccount: pandoraTokenAccount.address,
        user: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      // .transaction()
      .rpc({
        commitment: "finalized",
      });
    // .then(async (res) => {

    tx1.add(tx2);
    tx1.sign(key);

    // const signed_tx = await wallet.signTransaction(tx1);

    // const hash = await connection.sendRawTransaction(signed_tx.serialize())
    // wallet.sendTransaction()
    // const account_info = await program.accounts.pandora.fetch(pandoraPDA)
    // // console.log(account_info);
    // // console.log(res)
    // })
    // .catch((err) => console.error(err));
  } catch (err) {
    // console.log(err);
  }
};

// Editing Pandora Price
export const editPrice = async (
  pandora = "Hnm9xxGA9hkCMvyxYH1CX4GDQtdN325DXq6SH1oynxbv",
  wallet,
  price
) => {
  const provider = new coralAnchor.AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });
  const program = new anchor.Program(idl, programId, provider);
  try {
    const pandoraPDA = new anchor.web3.PublicKey(pandora);
    const bnPrice = new anchor.BN(price);
    const setup = await program.methods
      .editPrice(bnPrice)
      .accounts({
        pandora: pandoraPDA,
        pandoraOwner: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
  } catch (err) {
    // console.log(err);
  }
};

// Set Pandora Open for Minting
export const openPandora = async (
  pandora = "Hnm9xxGA9hkCMvyxYH1CX4GDQtdN325DXq6SH1oynxbv",
  wallet,
  timestampDate
) => {
  const provider = new coralAnchor.AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });
  const program = new anchor.Program(idl, programId, provider);
  try {
    const reveal_time = new anchor.BN(timestampDate);

    const pandoraPDA = new anchor.web3.PublicKey(pandora);

    const setup = await program.methods
      .openPandora(reveal_time)
      .accounts({
        pandora: pandoraPDA,
        pandoraOwner: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
  } catch (err) {
    // console.log(err);
  }
};

// Mint Lottery Boxes from Pandora
export const mintBox = async (
  pandora = "9DmAGVkQ3DiRL5QvrTceMJfK1oNpzSXpMG8D3bmhavKv",
  price,
  wallet,
  amount = generateRandomNumber()
) => {
  const provider = new coralAnchor.AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });
  const program = new anchor.Program(idl, programId, provider);
  const pandoraPDA = new anchor.web3.PublicKey(
    "9DmAGVkQ3DiRL5QvrTceMJfK1oNpzSXpMG8D3bmhavKv"
  );
  try {
    const resp_index = await fetch("/api/database/get_user_pda_id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: wallet.publicKey.toBase58(),
      }),
    });

    const index = (await resp_index.json()).index;

    // const [claimer] = PublicKey.findProgramAddressSync(
    //   [
    //     Buffer.from("CLAIMER"),
    //     wallet.publicKey.toBuffer(),
    //     pandoraPDA.toBuffer(),
    //   ],
    //   programId
    // );

    const tprice = price * LAMPORTS_PER_SOL;
    const random_res = await fetch("/api/program/sol/rand");
    const random = await random_res.json();

    const bnPrice = new anchor.BN(random);
    const storage = new anchor.web3.PublicKey(
      "EJ6euJuoop2jDaiiCSezcBWk3rjBf5vBKzhG2ZQ4JVqr"
    );
    const signer = new anchor.web3.PublicKey(
      "Ckt33UN5NHVNr3XkBmj5voa8Hbcpnv2tL2kvoXbzAfb"
    );
    const number = await find_pda(
      connection,
      wallet.publicKey,
      pandoraPDA,
      programId,
      index
    );
    const bnAmt = new anchor.BN(number);
    const bufferAmount = bnAmt.toArrayLike(Buffer, "le", 8);
    const [pandoraBoxPda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("PANDORABOX"),
        wallet.publicKey.toBuffer(),
        pandoraPDA.toBuffer(),
        bufferAmount,
        Buffer.from("ONE"),
      ],
      programId
    );
 
    const userATA = await getOrCreateAssociatedTokenAccount(
      connection,
      wallet,
      tokenMint,
      wallet.publicKey
    );

    const [pda] = PublicKey.findProgramAddressSync(
      [Buffer.from("PANDORA")],
      programId
    );
    const [pda_ata] = PublicKey.findProgramAddressSync(
      [pda.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), tokenMint.toBuffer()],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    );
    const tx = new Transaction();

    const ata_balance = await connection.getBalance(pda_ata);
    if (ata_balance == 0) {
      // create associted token account
      const ataTransaction = new anchor.web3.Transaction().add(
        createAssociatedTokenAccountInstruction(
          wallet.publicKey,
          pda_ata,
          pda,
          tokenMint
        )
      );
      tx.add(ataTransaction);
      // const signature = await wallet.sendTransaction(ataTransaction, connection)
      // await connection.confirmTransaction(signature, "processed");
    }

    // const balance = await connection.getBalance(claimer);
    // if (balance === 0) {
    //   const tx1 = await initialze_claim(
    //     program,
    //     pandoraPDA,
    //     wallet.publicKey,
    //     claimer,
    //     anchor.web3.SystemProgram.programId
    //   );
    //   tx.add(tx1);
    // }
    // else {
    //   const claimer_output = await program.account.claimer.fetch(claimer);
    // if (claimer_output.state !== "nothing") {
    //   throw "Claim First Before You Mint Again!"
    // }
    // }
    // const signerr = Keypair.fromSecretKey(bs58.decode("2zVup9mcs2Dpu5K1fZ5qPqTxXuEutbY1Sw52mBDrvfXpv1KhhG1h1Htb1YXyhpmzQjWwbmn8obdJyAUNdahbjmCm"));

    const setup = await program.methods
      .mintBoxes(bnPrice, bnAmt)
      .accounts({
        signerr: signer,
        pda: pda,
        // claimer: claimer,
        storage: storage,
        pandora: pandoraPDA,
        pandoraBox: pandoraBoxPda,
        receiverAccount: pda_ata,
        tokenAccount: userATA.address,
        user: wallet.publicKey,
        recentBlockhashes: recent_blockhash,
        tokenProgram: tokenProgramAddr,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      // .signers([signerr])
      .transaction()
      // .rpc({
      //   "commitment": "finalized"
      // })
      .then((res) => tx.add(res))
      .catch((err) => console.error(err));

    let blockhash = (await connection.getLatestBlockhash("finalized"))
      .blockhash;
    tx.recentBlockhash = blockhash;
    tx.feePayer = wallet.publicKey;

    const serializing_tx = tx
      .serialize({
        requireAllSignatures: false,
        verifySignatures: false,
      })
      .toString("base64");

    const resp_tx = await fetch("/api/program/sol/pandora_mint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serializing_tx,
      }),
    });

    const resp_json = await resp_tx.json();

    const serializedTx = Buffer.from(resp_json.serialize, "base64");

    const transaction = Transaction.from(serializedTx);
    return { transaction, pandoraBoxPda, program, random, number };
  } catch (err) {
    // console.log(err);
  }
};

// Check then display users boxs winning status
export const revealBox = async (wallet, pandoraPDA, box) => {
  const provider = new coralAnchor.AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });
  const program = new anchor.Program(idl, programId, provider);
  try {
    const [pda] = PublicKey.findProgramAddressSync(
      [Buffer.from("PANDORA")],
      programId
    );

    const [pda_ata] = PublicKey.findProgramAddressSync(
      [pda.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), tokenMint.toBuffer()],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    );
    const [user_ata] = PublicKey.findProgramAddressSync(
      [
        wallet.publicKey.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        tokenMint.toBuffer(),
      ],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    );
    const tx = new Transaction();

    const ata_balance = await connection.getBalance(user_ata);
    if (ata_balance == 0) {
      // create associted token account
      const ataTransaction = new anchor.web3.Transaction().add(
        createAssociatedTokenAccountInstruction(
          wallet.publicKey,
          user_ata,
          wallet.publicKey,
          tokenMint
        )
      );
      tx.add(ataTransaction);
      // const signature = await wallet.sendTransaction(ataTransaction, connection)
      // await connection.confirmTransaction(signature, "processed");
    }
    // console.log(box.toBase58());
    await program.methods
      .reveal()
      .accounts({
        pandora: pandoraPDA,
        userWallet: wallet.publicKey,
        userTokenAccount: user_ata,
        escrowTokenAccount: pda_ata,
        mint: tokenMint,
        boxe: box,
        escrow: pda,
        tokenProgram: tokenProgramAddr,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .transaction()
      // .rpc()
      .then((res) => tx.add(res))
      .catch((err) => console.error(err));

    let blockhash = (await connection.getLatestBlockhash("finalized"))
      .blockhash;
    tx.recentBlockhash = blockhash;
    tx.feePayer = wallet.publicKey;

    return tx;
  } catch (err) {
    // console.log(err);
  }
};

// Set Pandora Closed from Minting (sold out)
export const closePandora = async (
  wallet,
  pandora = "698QVwrSAnT9eGNJqUUoBjcph1Yb7V9ay6wUoaVhcS1Y"
) => {
  const provider = new coralAnchor.AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });
  const program = new anchor.Program(idl, programId, provider);
  try {
    const pandoraPDA = new anchor.web3.PublicKey(pandora);

    const setup = await program.methods
      .closePandora()
      .accounts({
        pandora: pandoraPDA,
        from: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
  } catch (err) {
    // console.log(err);
  }
};

// Select random boxes and change them to winners
export const selectWinners = async (
  wallet,
  pandora = "698QVwrSAnT9eGNJqUUoBjcph1Yb7V9ay6wUoaVhcS1Y"
) => {
  const provider = new coralAnchor.AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });
  const program = new anchor.Program(idl, programId, provider);
  try {
    const pandoraPDA = new anchor.web3.PublicKey(pandora);

    const setup = await program.methods
      .selectWinners()
      .accounts({
        pandora: pandoraPDA,
        from: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
  } catch (err) {
    // console.log(err);
  }
};
