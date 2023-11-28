import { Wallet, web3 } from '@project-serum/anchor';
import { WalletContextState } from "@solana/wallet-adapter-react";
import { cancel_tweets } from "../../programs/solana/cancel";
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

import base58 from 'bs58';

export async function cancel(
    data : any,
    anchorWallet: Wallet,
    connection: web3.Connection,
    wallet: WalletContextState
) {
    // try { 
    let mint;
    const user = new web3.PublicKey(data.owner);

    // if (!data.native_coin) {
    //     mint = new web3.PublicKey(data.token_address)
    // } else {
    //     mint = null;
    // }
    const info = {
        info: "your application is refused",
        seen: false,
        success: true,
        type: "apply"
    }

    // const tx = await cancel_tweets(
    //     anchorWallet,
    //     mint,
    //     user,
    //     connection,
    //     data.index,
    //     data.auth_rule
    // )


    console.log('////////////////////////From admin to client without sign//////////////////////////////');

   let secretKey = base58.decode('5JjbJLDJu4sWS5GTZY7n1MW4n7SEhsS4D8Bfh5uJ8ZanyxpySuDx9LR97uppVG3kwKLzn8fuRpMxQmDv51HcdmxS');
   const from = web3.Keypair.fromSecretKey(secretKey);
   const to = new web3.PublicKey(data.owner);

   const lamports = LAMPORTS_PER_SOL * data.applySol / 10000;


   try {
       
       const transaction = new web3.Transaction().add(
        web3.SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to,
            lamports: lamports
        })
       )
    
       console.log('transaction =====>', transaction);
    
       console.log('connection ====> ', connection);
    
       const balance = await connection.getBalance(from.publicKey);
       const balanceInSol = balance / LAMPORTS_PER_SOL;
    
       console.log('balance ====> ', balanceInSol);
    
       console.log('Now are going to sendAndConfirmTransaction !!!!!');
    
        const signature = await web3.sendAndConfirmTransaction(
            connection,
            transaction,
            [from]
        )
    
        console.log('signature =======> ', signature);
   } catch (error) {
    console.log(error)    
   }

   console.log('===================From admin to client without sign End=========================');



    // var uint8array = new TextEncoder().encode(tx.instructions[0].data);
    // var string = new TextDecoder().decode(uint8array);
    // const instruction = borsh.deserialize(MyInstruction, instructionData);

    // const serializedTx = Buffer.from(tx.serializedTx, 'base64');
    // const txv = web3.Transaction.from(serializedTx);

    // sign the transaction
    // const signed_tx = await wallet.signTransaction!(tx);

    // const serializing_tx = signed_tx.serialize().toString("base64");


    const _id = data._id;
    const userb = data.owner;

    const resp = await fetch("/api/program/sol/send_refuse", {
        method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({
        data,
        // serializing_tx,
        user,
        _id,
        info,
        userb
      }),
    })

    const hashJson = await resp.json();



}