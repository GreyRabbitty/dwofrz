import * as anchor from "@project-serum/anchor";
import { createAssociatedTokenAccountInstruction, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID } from "../../../utils/constant";
const idl = require("./idl.json")

  const tokenMint = new PublicKey(
    "PNTNyw5Yqb2Qf5jMV7jhfDMBaTDpxBKiyYS8uVzCCPH"
  );

export async function initialze_claim(
  anchorWallet, connection, pandora
  ) {

    const provider = new anchor.AnchorProvider(
      connection, anchorWallet, {"preflightCommitment": "processed"},
      );
  const PROGRAM_ID = new anchor.web3.PublicKey(idl.metadata.address)
  const program = new anchor.Program(idl, idl.metadata.address, provider);
    const [claimer] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("CLAIMER"),
        anchorWallet.publicKey.toBuffer(),
        pandora.toBuffer()
      ],
      PROGRAM_ID
    )
    const [to] = PublicKey.findProgramAddressSync(
        [
            anchorWallet.publicKey.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            tokenMint.toBuffer(),
        ],
        SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    );
    const tx = new anchor.web3.Transaction();
    const ata_balance = await connection.getBalance(to);
    if (ata_balance == 0) {
        // create associted token account
        const ataTransaction = new anchor.web3.Transaction().add(
            createAssociatedTokenAccountInstruction(
                anchorWallet.publicKey,
                to,
                anchorWallet.publicKey,
                tokenMint
            )
        );
        tx.add(ataTransaction)
        // const signature = await wallet.sendTransaction(ataTransaction, connection)
        // await connection.confirmTransaction(signature, "processed");
    }

    const [pda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("PANDORA")
      ],
      PROGRAM_ID
    )

    const [from] = PublicKey.findProgramAddressSync(
        [ 
            pda.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            tokenMint.toBuffer(),
        ],
        SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    );

    const tx1 = await program.methods
      .claim()
      .accounts({
        pda: pda,
        user: anchorWallet.publicKey,
        claimer: claimer,
        pandora: pandora,
        from : from,
        to: to,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId
      }).transaction()
      // .rpc({
      //   "commitment": "confirmed"
      // })

      tx.add(tx1)

      let blockhash = (await connection.getLatestBlockhash("finalized")).blockhash;
      tx.recentBlockhash = blockhash;
      tx.feePayer = anchorWallet.publicKey;

      // .transaction()
      return tx;
}