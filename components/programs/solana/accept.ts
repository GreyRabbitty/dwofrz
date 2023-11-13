import {
    AnchorProvider, BN, Program, utils, Wallet, web3
} from '@project-serum/anchor';
import { createAssociatedTokenAccountInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { WalletContextState } from "@solana/wallet-adapter-react";
import { PublicKey } from '@solana/web3.js';
import { pdas } from '../../utils/pda';
import { token_record } from '../../utils/pda_record';

const idl = require("../../../public/escrow.json")
// const TOKEN_PROGRAM_ID = new web3.PublicKey(
//     'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
//   );
  
    const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID: web3.PublicKey = new web3.PublicKey(
      'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    );
  
    const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(
      'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
    );
  
    const auth_rule_program: web3.PublicKey = new web3.PublicKey(
      'auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg',
    );
  

export async function accept_tweets(
    anchorWallet: Wallet,
    mint: web3.PublicKey | null ,
    user: web3.PublicKey,
    wallet: WalletContextState,
    connection: web3.Connection,
    index: number,
    affilate: boolean,
    affiliat_address: any,
    auth_rule: any
 ) {

    const receiver = new web3.PublicKey("Abm1MtGePxh5E3XFgLTQiD4dPMbniVkMuGdr9kCaKvE4");
    const provider = new AnchorProvider(
        connection, anchorWallet, {"preflightCommitment": "processed"},
        );

    const PROGRAM_ID = new web3.PublicKey(idl.metadata.address)


    const [lister, bump] = await web3.PublicKey.findProgramAddress(
        [
          Buffer.from("RAGNAROK"),
          user.toBuffer(),
          new BN(index).toArrayLike(Buffer, 'le', 4),
        ],
        PROGRAM_ID
      );

      const [escrow, escrow_bump] = await web3.PublicKey.findProgramAddress(
        [
          Buffer.from("RAGNAROK"),
        ],
        PROGRAM_ID
      );

    // let fire_ata;
    let escrow_ata;
    let initilized;
    let receiver_ata;


    if (mint) {

        [escrow_ata] = await web3.PublicKey.findProgramAddress(
            [
                escrow.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                mint!.toBuffer(),
            ],
            SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
        );

        [receiver_ata] = await web3.PublicKey.findProgramAddress(
            [
                receiver.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                mint!.toBuffer(),
            ],
            SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
        );


        try {
            const banal = await connection.getBalance(receiver_ata);
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
                    receiver_ata,
                    receiver,
                    mint
                )
      );

            const signature = await wallet.sendTransaction(ataTransaction, connection)
            await connection.confirmTransaction(signature, "finalized");
        }

    } else {
        mint = new web3.PublicKey("PNTNyw5Yqb2Qf5jMV7jhfDMBaTDpxBKiyYS8uVzCCPH");
        escrow_ata = new web3.PublicKey("GzUr1mNWRFdcpJcVcRSLKs5z4qtvvrQ5t33oqW86M2ZY")
        receiver_ata = new web3.PublicKey("GzUr1mNWRFdcpJcVcRSLKs5z4qtvvrQ5t33oqW86M2ZY");
    }



    // const escrowb = escrow.toBase58()
    // const escrowata = escrow_ata.toBase58()
    // const listpda = lister.toBase58()
    // const mintb = mint!.toBase58()
    // const fire_atab = fire_ata.toBase58()


    // const tx = await fetch("/api/program/sol/accept", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //       },
    //     body: JSON.stringify({
    //         anchorWallet,
    //         escrowb,
    //         escrowata,
    //         listpda,
    //         mintb,
    //         fire_atab,
    //         user
    //       }),
    // })

    // const tx_json = tx.json();

    // return tx_json;

    if (!affilate) {
        affiliat_address = mint
    }
    const discordBot = new web3.PublicKey("RgSdjuWf1RZGoS1hmRPdGHFQtTfSrcg6Je23YFhAfs5")

    const escrow_token_record = token_record(escrow_ata, mint);
    const receiver_token_record = token_record(receiver_ata, mint);
    const [atas, meta, edition] = await pdas(anchorWallet.publicKey, mint);
    const program = new Program(idl, idl.metadata.address, provider);
    const transaction = await program.methods.approve(new BN(index)).accounts({
            discordBot: discordBot,
            escrow: escrow,
            listing: lister,
            lister: user,
            afiliateAddress: new web3.PublicKey(affiliat_address),
            escrowAta: escrow_ata,
            mint: mint,
            authority: anchorWallet.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
            nftMetadata: meta,
            nftMasterEdition: edition,
            receiverAta: receiver_ata,
            receiver: receiver,
            ownerTokenRecord: escrow_token_record ,
            destinationTokenRecord: receiver_token_record,
            authRules: auth_rule ? auth_rule : TOKEN_METADATA_PROGRAM_ID,
            authRulesProgram: auth_rule_program,
            splAtaProgram: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
            sysvarInstructions: web3.SYSVAR_INSTRUCTIONS_PUBKEY,
            tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
            systemProgram: web3.SystemProgram.programId
        }).transaction()


    const tx = new web3.Transaction().add(transaction)
    let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
    tx.recentBlockhash = blockhash;
    tx.feePayer = new web3.PublicKey(anchorWallet.publicKey);


    return tx;

}

