import {
  AnchorProvider, BN, Program, utils, Wallet, web3
} from '@project-serum/anchor';
import { createAssociatedTokenAccountInstruction } from '@solana/spl-token';
import { WalletContextState } from "@solana/wallet-adapter-react";
import { ComputeBudgetProgram, SYSVAR_INSTRUCTIONS_PUBKEY } from '@solana/web3.js';
import { pdas } from '../../utils/pda';
import { token_record } from '../../utils/pda_record';

const idl = require("../../../public/escrow.json");

const TOKEN_PROGRAM_ID = new web3.PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
);

  const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID: web3.PublicKey = new web3.PublicKey(
    'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
  );

  const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
  );

  const auth_rule_program: web3.PublicKey = new web3.PublicKey(
    'auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg',
  );

export async function list(
    anchorWallet: Wallet,
    amount: number,
    sol: boolean,
    method: string,
    mint: web3.PublicKey | null ,
    wallet: WalletContextState,
    connection: web3.Connection,
    token: string,
    holder: boolean,
    abbathor_mint: any,
    affilate: boolean,
    affiliat_address: web3.PublicKey | null,
    feature: boolean,
    supply: number,
    programable_config: any
 ) {

  let ruleSet = null;
  const remaining_account = [];
  
  if (programable_config !== null) {
    if (programable_config.ruleSet !== null) {
      ruleSet = programable_config.ruleSet;
    } 
  }


    const provider = new AnchorProvider(
        connection, anchorWallet, {"preflightCommitment": "processed"},
        );
   
    const PROGRAM_ID = new web3.PublicKey(idl.metadata.address)
    const program = new Program(idl, idl.metadata.address, provider);

      console.log('PROGRAM_ID ====> ', PROGRAM_ID.toBase58());

      console.log('program ====> ', program);

      const [escrow, escrow_bump] = web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from("RAGNAROK"),
        ],
        PROGRAM_ID
      );
      const [counter, counter_bump] = web3.PublicKey.findProgramAddressSync(
        [
          anchorWallet.publicKey.toBuffer(),
        ],
        PROGRAM_ID
      );
      let index = 0;
      
      console.log(counter.toBase58(), "Counter _++++")
      console.log(escrow.toBase58(), "Escrow _++++")

      try {
         const account = await program.account.counter.fetch(counter);
         console.log(account, "--------------------------------")
         index = Number(account.indexCounter) + 1;
      } catch(e) {

        const transaction = await program.methods.initCounter().accounts({
            counter: counter,
            authority: anchorWallet.publicKey,
            systemProgram: web3.SystemProgram.programId
        })
        .rpc({
          commitment: "finalized"
        })
        console.log("THERERE")
      }

      console.log("--------------------------------")
      let abbathor_ata;
      let abbathor_metadata;
      let abbathor_masteredtion;  


      if (holder) {
        abbathor_mint = new web3.PublicKey(abbathor_mint);
        [abbathor_ata, abbathor_metadata, abbathor_masteredtion] = await pdas(
            anchorWallet.publicKey,
            abbathor_mint
            )
        remaining_account.push(
          {
            isSigner: false,
            isWritable: true,
            pubkey: abbathor_ata,
          },
          {
            isSigner: false,
            isWritable: true,
            pubkey: abbathor_mint,
          },
          {
            isSigner: false,
            isWritable: false,
            pubkey: abbathor_metadata,
          }
        );
      }

    let user_ata;
    let escrow_ata;
    let initilized;
    let nft_metadata;
    let master_edition;

    if (token != "solana") {
        // [user_ata] = await web3.PublicKey.findProgramAddress(
        //     [
        //         anchorWallet!.publicKey.toBuffer(),
        //         TOKEN_PROGRAM_ID.toBuffer(),
        //         mint!.toBuffer(),
        //     ],
        //     SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
        // );

        let [ata] = web3.PublicKey.findProgramAddressSync(
            [
                escrow.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                mint!.toBuffer(),
            ],
            SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
        );
        escrow_ata = ata;
        try {
            const banal = await connection.getBalance(escrow_ata);
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
                    escrow_ata,
                    escrow,
                    mint!
                )
            );
            const signature = await wallet.sendTransaction(ataTransaction, connection)
            
            await connection.confirmTransaction(signature, "finalized");
            
            
        }

        const [atas, meta, edition] = await pdas(
          anchorWallet.publicKey,
          mint!
          )
          user_ata = atas;
        nft_metadata = meta;
        master_edition = edition;
    } else {
        mint = new web3.PublicKey("PNTNyw5Yqb2Qf5jMV7jhfDMBaTDpxBKiyYS8uVzCCPH");
        escrow_ata = new web3.PublicKey("GzUr1mNWRFdcpJcVcRSLKs5z4qtvvrQ5t33oqW86M2ZY")
        user_ata = new web3.PublicKey("GzUr1mNWRFdcpJcVcRSLKs5z4qtvvrQ5t33oqW86M2ZY");
        nft_metadata = new web3.PublicKey("GzUr1mNWRFdcpJcVcRSLKs5z4qtvvrQ5t33oqW86M2ZY");
        master_edition = new web3.PublicKey("GzUr1mNWRFdcpJcVcRSLKs5z4qtvvrQ5t33oqW86M2ZY");
    }

    //Changed
    // if (token == "solana") {
    //     amount = amount * 1000000000;
    // }

    let payment = 0;

    if (method == "follow like comment retweet join discord") {
        payment = 1;
    }
    else if (method == "like comment retweet join discord") {
        payment = 2;
    }
    else if (method == "Like comment retweet") {
        payment = 3;
    }
    else if (method == "Like comment retweet follow") {
        payment = 4;
    }

    let [lister, bump] =  web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from("RAGNAROK"),
          anchorWallet.publicKey.toBuffer(),
          new BN(index).toArrayLike(Buffer, 'le', 4),
        ],
        PROGRAM_ID
      );
    let balance = await connection.getBalance(lister);

      while (balance !== 0) {
        index++;
        [lister, bump] = web3.PublicKey.findProgramAddressSync(
          [
            Buffer.from("RAGNAROK"),
            anchorWallet.publicKey.toBuffer(),
            new BN(index).toArrayLike(Buffer, 'le', 4),
          ],
          PROGRAM_ID
        );

        balance = await connection.getBalance(lister);
      }

      

    if (!affilate) {
      affiliat_address = mint!;
    }

    const owner_token_record = token_record(user_ata, mint!); 
    const receiver_token_record = token_record(escrow_ata, mint!); 

    const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({ 
      units: 600000
    });

    const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({ 
      microLamports: 1
    });
    const tx = new web3.Transaction().add(modifyComputeUnits)
    tx.add(addPriorityFee)

    if (supply == undefined) {
      supply = 0;
    }
    
    console.log('transaction before ===========> ')

    const transaction = await program.methods.initializeListing(
        new BN(index),
        new BN(bump),
        new BN(amount),
        new BN(payment),
        sol,
        holder,
        affilate,
        affiliat_address,
        feature,
        new BN(supply)
    ).accounts({
            authority: anchorWallet.publicKey,
            escrowPda: escrow,
            mint: mint!,
            listing: lister,
            escrowAta: escrow_ata,
            nftMasterEdition: master_edition,
            nftMetadata: nft_metadata,
            counter: counter,
            userAta: user_ata,
            ownerTokenRecord:owner_token_record ,
            destinationTokenRecord: receiver_token_record,
            authRules: ruleSet ? ruleSet : TOKEN_METADATA_PROGRAM_ID,
            authRulesProgram: auth_rule_program,
            splAtaProgram: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
            sysvarInstructions: SYSVAR_INSTRUCTIONS_PUBKEY,
            tokenProgram: TOKEN_PROGRAM_ID,
            tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
            systemProgram: web3.SystemProgram.programId
        })
        .remainingAccounts(remaining_account)
        .transaction()

        tx.add(transaction)
        let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
        tx.recentBlockhash = blockhash;
        tx.feePayer = new web3.PublicKey(anchorWallet.publicKey);

        return [tx, index] as const;
}

