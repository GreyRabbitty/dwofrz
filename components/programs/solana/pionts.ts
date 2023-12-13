import {
    AnchorProvider, BN, Program, utils, Wallet, web3
} from '@project-serum/anchor';
// import { createAssociatedTokenAccountInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { WalletContextState } from "@solana/wallet-adapter-react";

// const idl = require("../../../public/escrow.json")
// const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(
//     'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
//   );
//   const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID: web3.PublicKey = new web3.PublicKey(
//     'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
//   );

export async function points(
    anchorWallet: Wallet,
    wallet: WalletContextState,
    connection: web3.Connection,
    reward: number,
    interact: number,
    data_id: string,
    twitter_id: string,
    user_data: string,
    name: string,
    image: string,
    raffle_time: any,
    reword_type: string,
    reword_amount: number,
    reword_name: string,
    lister: string,
    index: number,
    dworfz_mint: any,
    time: number,
 ) {


    console.log('point ==>', {
        anchorWallet,
        wallet,
        connection,
        reward,
        interact,
        data_id,
        twitter_id,
        user_data,
        name,
        image,
        raffle_time,
        reword_type,
        reword_amount,
        reword_name,
        lister,
        index,
        dworfz_mint,
        time,
    })

    const sign = await fetch("/api/program/sol/send_sol", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify({
            // serializing,
            _id: data_id,
            interact,
            twitter_id,
            user_data,
            name,
            image,
            raffle_time,
            reword_type,
            reword_amount,
            reword_name,
            receiver: anchorWallet.publicKey.toBase58(),
            }),
    });
    const signJson = await sign.json();

    if (signJson.status == "ERR") {
        throw signJson.message;
    }
}

