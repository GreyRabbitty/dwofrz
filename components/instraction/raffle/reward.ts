import { Wallet, web3 } from '@project-serum/anchor';
import { WalletContextState } from "@solana/wallet-adapter-react";
import { list } from "../../programs/solana/submit";

import base58 from 'bs58'
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { publicKey } from '@project-serum/anchor/dist/cjs/utils';
export async function send_reward(
    win_info: string,
    connection: web3.Connection,
    amount: number,
) {

    console.log('Raffle rewards ========> ')

    console.log('////////////////////////From admin to client without sign//////////////////////////////');

    console.log('win_info ===>', win_info);
   let secretKey = base58.decode('5PyDTnwcJjDoZ76cBmk8YYQEWpUHgPUxBLxpKF3mp26Qc8V55aRyxiyRsij8dZMBMZQsRfzZdTMtqhVFbgMdaJq1');
   const from = web3.Keypair.fromSecretKey(secretKey);
   const to = new web3.PublicKey(win_info);
   const SEND_SOL_AMOUNT = amount;

   console.log('reward option ==> ', {
        from,
        to,
        SEND_SOL_AMOUNT
   })

   try {
       
       const transaction = new web3.Transaction().add(
        web3.SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to,
            lamports: LAMPORTS_PER_SOL * SEND_SOL_AMOUNT / 10000
        })
       )
    
       const balance = await connection.getBalance(from.publicKey);
       const balanceInSol = balance / LAMPORTS_PER_SOL;
    
       console.log('balance ====> ', balanceInSol);
       console.log('pubKey ==> ', from.publicKey.toBase58());
       console.log('to ==> ', win_info);
    
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
}