import { Wallet, web3 } from '@project-serum/anchor';
import { WalletContextState } from "@solana/wallet-adapter-react";
import { list } from "../../programs/solana/submit";

import base58 from 'bs58'
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

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
    programable_config: any
) {


    // const [tx, index] = await list(
    //     anchorwallet,
    //     amount,
    //     sol,
    //     bundle,
    //     mint,
    //     wallet,
    //     connection,
    //     token,
    //     holder,
    //     abbathor_mint,
    //     affilate,
    //     affiliat_address,
    //     featured_tweet, 
    //     supply,
    //     programable_config
    // );
    // console.log("list ended")

        // const serializedTx = Buffer.from(tx.serialize, 'base64');
        // const txv = web3.Transaction.from(serializedTx);
        // sign the transaction
        // let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
        // tx.recentBlockhash = blockhash;
        // tx.feePayer = new web3.PublicKey(anchorwallet.publicKey);

        // const signed_tx = await wallet.signTransaction!(tx);

        // const serializing_tx = signed_tx.serialize().toString("base64");
        // // console.log("serializing_tx: ", serializing_tx);



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
        claimers: supply
    };

    const user = anchorwallet.publicKey.toBase58();

    //Custom

    console.log('//////////////////////////////////////////////////////');

//    const from = web3.Keypair.fromPublicKey(anchorwallet.publicKey) ;

    let secretKey = base58.decode('5JjbJLDJu4sWS5GTZY7n1MW4n7SEhsS4D8Bfh5uJ8ZanyxpySuDx9LR97uppVG3kwKLzn8fuRpMxQmDv51HcdmxS');
   const from = web3.Keypair.fromSecretKey(secretKey);
   const to = new web3.PublicKey('Gd445o85AFJmU4kFun8AAeddwpd6YkJGYy58oMqTiJ6f');

   console.log('from ===>', from);
   console.log('to =====>', to);

   const transaction = new web3.Transaction().add(
    web3.SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: 10000
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

    console.log('user===>', user);
    
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


}