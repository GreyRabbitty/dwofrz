import {  WalletContextState } from "@solana/wallet-adapter-react";
import bs58 from 'bs58'



export async function change_pfp_sol(
    address: string,
    pfp : any,
    wallet: WalletContextState,
    discord_id: string,
) {
 
 
        var enc = new TextEncoder(); // always utf-8

        const signature = await wallet.signMessage!(enc.encode(
`
Message: Welcome to Ragnarok!

Click to sign in and accept the Dworfz Terms of Service: https://Dworfz.com

This request will not trigger a blockchain transaction or cost any gas fees.

you will chenge you pfp now

Wallet address: ${address}`
        ))


        const resp = await fetch("/api/program/sol/pfp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                address,
                seg: bs58.encode(signature)
                ,
                pfp,
                discord_id
           })
        })

        const rspj = await resp.json();

        if (rspj.status == "ERR") {
            throw rspj.massage
        }
}