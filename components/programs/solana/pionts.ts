import {
    AnchorProvider, BN, Program, utils, Wallet, web3
} from '@project-serum/anchor';
import { createAssociatedTokenAccountInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { WalletContextState } from "@solana/wallet-adapter-react";

const idl = require("../../../public/escrow.json")
const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
  );
  const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID: web3.PublicKey = new web3.PublicKey(
    'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
  );

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


    const provider = new AnchorProvider(
        connection, anchorWallet, {"preflightCommitment": "processed"},
        );

    const PROGRAM_ID = new web3.PublicKey(idl.metadata.address)

    const mint = new web3.PublicKey("PNTNyw5Yqb2Qf5jMV7jhfDMBaTDpxBKiyYS8uVzCCPH");

      const [escrow, escrow_bump] = await web3.PublicKey.findProgramAddress(
        [
          Buffer.from("RAGNAROK"),
        ],
        PROGRAM_ID
      );

    let initilized;




        const [user_ata] = await web3.PublicKey.findProgramAddress(
            [
                anchorWallet.publicKey.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                mint.toBuffer(),
            ],
            SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
        );

        const [escrow_ata] = await web3.PublicKey.findProgramAddress(
            [
                escrow.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                mint!.toBuffer(),
            ],
            SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
        );


        try {
            const banal = await connection.getBalance(user_ata);
            if (banal > 0) {
                initilized = true;
            } else {
                initilized = false;
            }
        } catch(e) {
            initilized = false;
        }

        if (!initilized) {
            // need a function that make the user create a an associated token account 
                // Create token account to hold your wrapped SOL
            const ataTransaction = new web3.Transaction().add(
                createAssociatedTokenAccountInstruction(
                    anchorWallet.publicKey,
                    user_ata,
                    anchorWallet.publicKey,
                    mint
                )
            );

            const signature = await wallet.sendTransaction(ataTransaction, connection)
            await connection.confirmTransaction(signature, "finalized");
        }


        const tx = await fetch("/api/program/sol/build_points", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                index,
                lister,
                reward,
                anchorWallet,
                escrow,
                user_ata,
                escrow_ata,
                mint,
                interact,
                _id: data_id,
                dworfz_mint,
                time
              }),
        })
        

        const tx_Json = await tx.json();


        const serializedTx = Buffer.from(tx_Json.serializedTx, 'base64');

        const transaction = web3.Transaction.from(serializedTx);

        const signer_tx = await wallet.signTransaction!(transaction);


        const serializing = signer_tx.serialize()

        const sign = await fetch("/api/program/sol/send_sol", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                serializing,
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

