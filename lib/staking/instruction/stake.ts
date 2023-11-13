import {
  AnchorProvider, BN, Program, web3
} from '@project-serum/anchor';
import { AnchorWallet, WalletContextState } from "@solana/wallet-adapter-react";
import { ComputeBudgetProgram, SYSVAR_INSTRUCTIONS_PUBKEY, SystemProgram } from '@solana/web3.js';
import { STAKE_ENTRY_PREFIX } from "../../constants/constants";
import { pdas } from '../../utils/pda';
import { init_entry } from './init_entry';
const idl = require("../../../data/staking.json")

  const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    );
  const META = new web3.PublicKey(
      'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
    );

    const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID: web3.PublicKey = new web3.PublicKey(
      'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    );

    const sysvar_rant_pubkey: web3.PublicKey = new web3.PublicKey(
      'SysvarRent111111111111111111111111111111111',
    );
    const auth_rule_program: web3.PublicKey = new web3.PublicKey(
      'auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg',
    );
  
  
  
  export async function stake(
      anchorWallet: AnchorWallet,
      mint: web3.PublicKey,
      stake_pool: string,
      connection: web3.Connection,
      programable_config: any
      // sendTransaction: any
      // wallet: WalletContextState,
   ) {

    let ruleSet = null;

    if (programable_config !== null) {
       if (programable_config.ruleSet !== null) {
         ruleSet = programable_config.ruleSet;
       } 
     }

      const provider = new AnchorProvider(
          connection, anchorWallet, {"preflightCommitment": "processed"},
          );
  
      const PROGRAM_ID = new web3.PublicKey(idl.metadata.address)
  
      const stake_pool_pubkey = new web3.PublicKey(stake_pool)

      const [stake_entry, bump] = web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from(STAKE_ENTRY_PREFIX),
            stake_pool_pubkey.toBuffer(),
            mint.toBuffer(),
            anchorWallet.publicKey.toBuffer(),
        ],
        PROGRAM_ID
    );

      const program = new Program(idl, idl.metadata.address, provider);
  
      const [token_account, metadata_acount, master_edition, record_account] = await pdas(anchorWallet.publicKey, mint);

      const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({ 
        units: 600000
      });

      const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({ 
        microLamports: 1
      });

    //   const [stakeEntryTokenAccount] = await web3.PublicKey.findProgramAddress(
    //     [
    //       stake_entry.toBuffer(),
    //         TOKEN_PROGRAM_ID.toBuffer(),
    //         mint.toBuffer(),
    //     ],
    //     SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    // );


    // const remaining_account: web3.AccountMeta[] = [];

    // const [token_manager_token_account, token_manager_metadata_acount, token_manager_master_edition, token_manager_record_account] = await pdas(stake_entry, mint);


    // remaining_account.push(
    //   {
    //     isSigner: false,
    //     isWritable: true,
    //     pubkey: mint,
    //   },
    //   {
    //     isSigner: false,
    //     isWritable: true,
    //     pubkey: metadata_acount,
    //   },
    //   {
    //     isSigner: false,
    //     isWritable: false,
    //     pubkey: master_edition,
    //   },
    //   {
    //     isSigner: false,
    //     isWritable: true,
    //     pubkey: token_manager_record_account,
    //   },
    //   {
    //     isSigner: false,
    //     isWritable: true,
    //     pubkey: record_account,
    //   },
    //   {
    //     isSigner: false,
    //     isWritable: false,
    //     pubkey: SYSVAR_INSTRUCTIONS_PUBKEY,
    //   },
    //   {
    //     isSigner: false,
    //     isWritable: false,
    //     pubkey: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    //   },
    //   {
    //     isSigner: false,
    //     isWritable: false,
    //     pubkey: auth_rule_program,
    //   },
    //   {
    //     isSigner: false,
    //     isWritable: false,
    //     pubkey: META,
    //   }
    // );

    const banal = await connection.getBalance(stake_entry);

    let initilized = true;


    if (banal == 0) {
      initilized = false;
    }

    const tx = new web3.Transaction()

    if (!initilized) {

       const tx1 = await init_entry(anchorWallet, stake_pool, connection, mint)
       tx.add(tx1);
      }
//       const signature = await sendTransaction(ataTransaction, connection)
//       await connection.confirmTransaction(signature, "finalized");
//   }


      const transaction = await program.methods.stake().accounts({
              stakeEntry: stake_entry,
              stakePool: stake_pool_pubkey,
              originalMint: mint,
              originalMintTokenAccount: token_account,
              userOriginalMintTokenRecord: record_account,
              user: anchorWallet.publicKey,
              mintMetadata: metadata_acount,
              mintEdition: master_edition,
              authorizationRules: ruleSet ? ruleSet : META,
              sysvarInstructions: SYSVAR_INSTRUCTIONS_PUBKEY,
              tokenMetadataProgram: META,
              authorizationRulesProgram: auth_rule_program,
              systemProgram: web3.SystemProgram.programId,
              tokenProgram: TOKEN_METADATA_PROGRAM_ID,
          })
          // .remainingAccounts(remaining_account)
        .transaction()
          // .rpc()
        tx.add(transaction);
        let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
        tx.recentBlockhash = blockhash;
        tx.feePayer = new web3.PublicKey(anchorWallet.publicKey);
    

        return tx;
}
  
  