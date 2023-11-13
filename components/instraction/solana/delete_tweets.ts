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

        Click to sign in and accept the Dworfz Terms of Service: https://Dworfz.com
    
        This request will not trigger a blockchain transaction or cost any gas fees.
    
        you will delete a tweet now
    
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