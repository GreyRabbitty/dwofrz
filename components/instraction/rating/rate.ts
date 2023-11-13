import {  WalletContextState } from "@solana/wallet-adapter-react";
import bs58 from 'bs58'



export async function rate(
    address: string,
    rate : number,
    // wallet: WalletContextState,
    twitter_id: string,
) {
 
 
        // var enc = new TextEncoder(); // always utf-8

        // const signature = await wallet.signMessage!(enc.encode(`
        // Message: Welcome to Ragnarok!

        // Click to sign in and accept the Dworfz Terms of Service: https://Dworfz.com
    
        // This request will not trigger a blockchain transaction or cost any gas fees.
    
        // you rate a tweet now
    
        // Wallet address: ${address}`
        // ))

        const resp = await fetch("/api/database/rate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                user: address,
                // seg: bs58.encode(signature),
                rate,
                twitter_id
           })
        })

        const rspj = await resp.json();

        if (rspj.status == "ERR") {
            throw rspj.massage
        }
}