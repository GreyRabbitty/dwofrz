import { Wallet, web3 } from '@project-serum/anchor';
import { WalletContextState } from "@solana/wallet-adapter-react";
import { list } from "../../programs/solana/submit";

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
    console.log("7777777777777777777777777")


    const [tx, index] = await list(
        anchorwallet,
        amount,
        sol,
        bundle,
        mint,
        wallet,
        connection,
        token,
        holder,
        abbathor_mint,
        affilate,
        affiliat_address,
        featured_tweet, 
        supply,
        programable_config
    );
    console.log("888888888888888888888888888")

        // const serializedTx = Buffer.from(tx.serialize, 'base64');
        // const txv = web3.Transaction.from(serializedTx);
        // sign the transaction
        let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
        tx.recentBlockhash = blockhash;
        tx.feePayer = new web3.PublicKey(anchorwallet.publicKey);
    console.log("9999999999999999999999999999")

        const signed_tx = await wallet.signTransaction!(tx);
        console.log("000000000000000000000000")

        const serializing_tx = signed_tx.serialize().toString("base64");
        console.log("serializing_tx: ", serializing_tx);

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
        nft: nft,
        token_name: token,
        winner: null,
        live: true,
        interact: 0,
        index: index,
        affilate: affilate,
        affiliat_address: affiliat_address ? affiliat_address.toBase58() : null,
        live_holder: true,
        claimers: supply
    };

    const user = anchorwallet.publicKey.toBase58();


    
    const resp = await fetch("/api/program/sol/send_list", {
        method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({
        serializing_tx,
        data,
        user,
      }),
    });

    const hashJson = await resp.json();

    if (hashJson.status === "ERR") {
        throw hashJson.message
    }


}