import { Wallet, web3 } from '@project-serum/anchor';
import { WalletContextState } from "@solana/wallet-adapter-react";
import { cancel_tweets } from "../../programs/solana/cancel";

export async function cancel(
    data : any,
    anchorWallet: Wallet,
    connection: web3.Connection,
    wallet: WalletContextState
) {
    // try { 
    let mint;
    const user = new web3.PublicKey(data.owner);

    if (!data.native_coin) {
        mint = new web3.PublicKey(data.token_address)
    } else {
        mint = null;
    }
    const info = {
        info: "your application is refused",
        seen: false,
        success: true,
        type: "apply"
    }

    const tx = await cancel_tweets(
        anchorWallet,
        mint,
        user,
        connection,
        data.index,
        data.auth_rule
    )



    // var uint8array = new TextEncoder().encode(tx.instructions[0].data);
    // var string = new TextDecoder().decode(uint8array);
    // const instruction = borsh.deserialize(MyInstruction, instructionData);

    // const serializedTx = Buffer.from(tx.serializedTx, 'base64');
    // const txv = web3.Transaction.from(serializedTx);

    // sign the transaction
    const signed_tx = await wallet.signTransaction!(tx);

    const serializing_tx = signed_tx.serialize().toString("base64");


    const _id = data._id;
    const userb = data.owner;

    const resp = await fetch("/api/program/sol/send_refuse", {
        method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({
        data,
        serializing_tx,
        user,
        _id,
        info,
        userb
      }),
    })

    const hashJson = await resp.json();



}