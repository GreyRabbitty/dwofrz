import { Wallet, web3 } from '@project-serum/anchor';
import { WalletContextState } from "@solana/wallet-adapter-react";
import { accept_tweets } from "../../programs/solana/accept";

export async function accept(
    data : any,
    anchorWallet: Wallet,
    wallet: WalletContextState,
    connection: web3.Connection,
) {
    // try { 
    let mint;
    const user = new web3.PublicKey(data.owner);

    if (!data.native_coin) {
        mint = new web3.PublicKey(data.token_address)
    } else {
        mint = null;
    }

    const tx = await accept_tweets(
        anchorWallet,
        mint,
        user,
        wallet,
        connection,
        data.index,
        data.affilate,
        data.affiliat_address,
        data.auth_rule
    )



    // const serializedTx = Buffer.from(tx.serializedTx, 'base64');
    // const txv = web3.Transaction.from(serializedTx);

    // sign the transaction
    const signed_tx = await wallet.signTransaction!(tx);


    const serializing_tx = signed_tx.serialize().toString("base64");
 
    const _id = data._id
    const userb = user.toBase58()

    const info = {
        info: "your application is accepted",
        seen: false,
        success: true,
        type: "apply"
    }

    const resp = await fetch("/api/program/sol/send_accept", {
        method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({
        serializing_tx,
        _id,
        data,
        info,
        userb
      }),
    })
    const hashJson = await resp.json();


}