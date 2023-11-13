import {
  AnchorProvider, BN, Program, Wallet, web3
} from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Console } from 'console';
import { pdas } from '../../utils/pda';
import { token_record } from '../../utils/pda_record';

const idl = require("../../../public/escrow.json")

  
const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID: web3.PublicKey = new web3.PublicKey(
  'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
);

const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(
  'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
);

const auth_rule_program: web3.PublicKey = new web3.PublicKey(
  'auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg',
);
  

export async function cancel_tweets(
    anchorWallet: Wallet,
    mint: web3.PublicKey | null ,
    user: web3.PublicKey,
    connection: web3.Connection,
    index: number,
    auth_rule: any
 ) {

  // try {
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

    let user_ata;
    let escrow_ata;
    let initilized;



    if (mint) {

        [user_ata] = await web3.PublicKey.findProgramAddress(
            [
                user.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                mint!.toBuffer(),
            ],
            SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
        );

        [escrow_ata] = await web3.PublicKey.findProgramAddress(
            [
                escrow.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                mint!.toBuffer(),
            ],
            SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
        );


    } else {
        mint = new web3.PublicKey("PNTNyw5Yqb2Qf5jMV7jhfDMBaTDpxBKiyYS8uVzCCPH");
        escrow_ata = new web3.PublicKey("GzUr1mNWRFdcpJcVcRSLKs5z4qtvvrQ5t33oqW86M2ZY")
        user_ata = new web3.PublicKey("GzUr1mNWRFdcpJcVcRSLKs5z4qtvvrQ5t33oqW86M2ZY");
    }



    // const escrowb = escrow.toBase58()
    // const escrowata = escrow_ata.toBase58()
    // const listpda = lister.toBase58()
    // const mintb = mint!.toBase58()
    // const userata = user_ata.toBase58()


    // const tx = await fetch("/api/program/sol/refuse", {
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
    //         userata,
    //         user
    //       }),
    // })

    // const tx_json = tx.json();

    // return tx_json;

    const escrow_token_record = token_record(escrow_ata, mint);
    const receiver_token_record = token_record(user_ata, mint);
    const [atas, meta, edition] = await pdas(anchorWallet.publicKey, mint);


    const program = new Program(idl, idl.metadata.address, provider);
    const transaction = await program.methods.cancel(new BN(index)).accounts({
            escrow: escrow,
            listing: lister,
            lister: user,
            escrowAta: escrow_ata,
            userAta: user_ata,
            mint: mint,
            fire: anchorWallet.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
            nftMetadata: meta,
            nftMasterEdition: edition,
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

