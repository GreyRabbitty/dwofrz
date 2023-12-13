import { Wallet, web3 } from '@project-serum/anchor';
import { WalletContextState } from "@solana/wallet-adapter-react";
import { list } from "../../programs/solana/submit";

import base58 from 'bs58'
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { publicKey } from '@project-serum/anchor/dist/cjs/utils';

export async function submit(
    anchorwallet: Wallet,
    twitter_id: number,
    name: string,
    discord_constact: string | undefined,
    discord_url: string | undefined,
    twitter_url: string,
    network: string,
    mint: web3.PublicKey | null,
    bundle: string,
    discription: string,
    featured_tweet: boolean,
    amount: number,
    sol: boolean,
    wallet: WalletContextState,
    connection: web3.Connection,
    token: string,
    server_id: string | undefined,
    nft_name: string,
    project_image: string,
    holder: boolean,
    abbathor_mint: any,
    affilate: boolean,
    affiliat_address: any,
    supply: number,
    programable_config: any,
    sendTransaction: any,
    applySol: number
) {

    let nft = false;

    if (nft_name !== "Select") {
        nft = true
    }

    const data = {
        owner: anchorwallet.publicKey.toBase58(),
        postAt: Date.now(),
        twitter_id: twitter_id,
        name: name,
        discord_constact: discord_constact,
        discord_url: discord_url,
        twitter_url:twitter_url,
        network: network,
        token_address: mint ? mint.toBase58() : null,
        bundle: bundle,
        discription: discription,
        featured_tweet: featured_tweet,
        project_image: project_image,
        amount: amount,
        native_coin: sol,
        server_id: server_id,
        nft_name: nft_name,
        // nft: nft,
        token_name: token,
        winner: null,
        live: true,
        interact: 0,
        // index: index,
        affilate: affilate,
        affiliat_address: affiliat_address ? affiliat_address.toBase58() : null,
        live_holder: true,
        claimers: supply,
        applySol: applySol
    };

    try {
        const check = await fetch("/api/program/sol/twitterDB", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                twitter_url
            }),
        });

        const checkResult = await check.json();
        console.log('console log ====>');
        if(checkResult.status == 'ERR'){
            return {messsage: 'Duplicated Twitter URL!'};
        }

        console.log('checkResult ==> ', checkResult);

        const user = anchorwallet.publicKey.toBase58();

        //Custom

        console.log('////////////////////////From client to admin with sign//////////////////////////////');
        // const ADMIN_PUBKEY = '5oxRC2qUZhVdMHiETJ7RrEbFnnuGa2XNVRhS3bGG1Ywg';
        const ADMIN_PUBKEY = '33DJQowiaDoRMF5U68iBPudJP5BqHyHnVXH8MdfR8VWK';
        const SEND_SOL_AMOUNT = applySol;

        const transaction = new web3.Transaction();
        const recipientPubkey = new web3.PublicKey(ADMIN_PUBKEY);

        console.log('recipientPubkey ===>', recipientPubkey);
        console.log('anchorwallet.publicKey ===>', anchorwallet.publicKey);
        console.log('Lamports ===>', LAMPORTS_PER_SOL * SEND_SOL_AMOUNT / 10000)

        const sendSolInstruction = web3.SystemProgram.transfer({
            fromPubkey: anchorwallet.publicKey,
            toPubkey: recipientPubkey,
            lamports: LAMPORTS_PER_SOL * SEND_SOL_AMOUNT / 10000
        })

        console.log('sendSolInstruction ==>', sendSolInstruction);

        transaction.add(sendSolInstruction);

        console.log('added successfully!!');
        await sendTransaction(transaction, connection).then((sig:any) => {
            console.log('sig =============>', sig);
        }).catch((err:any) => {throw err})
        

        console.log('===================From client to admin with sign sign End=========================');

        console.log('user===>', user);

        const saveDB = await fetch("/api/program/sol/saveTwitterDB", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                twitter_url
            }),
        });

        const saveResult = await saveDB.json();
        console.log('console log ====>');
        if(saveResult.status == 'ERR'){
            return {messsage: 'MongoDB save Failure'};
        }
        
        const resp = await fetch("/api/program/sol/send_list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // serializing_tx,
                data,
                user,
            }),
        });

        const hashJson = await resp.json();

        
        if (hashJson.status === "ERR") {
            throw hashJson.message
        }

        return {messsage: 'success'}
    } catch (error) {
        console.log('error ==> ', error);
        const check = await fetch("/api/program/sol/delTwitterDB", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                twitter_url
            }),
        });
        return {messsage: 'Translation Failure'};
    }
}