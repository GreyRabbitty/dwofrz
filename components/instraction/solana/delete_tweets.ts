import {  WalletContextState } from "@solana/wallet-adapter-react";
import bs58 from 'bs58'



export async function delete_tweet(
    address: string,
    id : string,
    wallet: WalletContextState,
) {


        var enc = new TextEncoder(); // always utf-8

        const signature = await wallet.signMessage!(enc.encode(`
        Message: Welcome to Ragnarok!

        Do you really delete?
    
        Wallet address: ${address}`
        ))


        const resp = await fetch("/api/database/delete_tweet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                address,
                seg: bs58.encode(signature),
                id,
           })
        })

        const rspj = await resp.json();

        if (rspj.status == "ERR") {
            throw rspj.massage
        }
}