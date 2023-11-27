import {
  AnchorProvider, BN, Program, web3
} from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { AnchorWallet, WalletContextState } from "@solana/wallet-adapter-react";
import { ComputeBudgetProgram, SYSVAR_INSTRUCTIONS_PUBKEY } from '@solana/web3.js';
import { REWARD_DISTRIBUTOR_SEED, REWARD_ENTRY_SEED, STAKE_ENTRY_PREFIX, TOKEN_METADATA_PROGRAM_ID, auth_rule_program } from "../../constants/constants";
import { pdas } from '../../utils/pda';
import { claim } from "../reward/claim";
const idl = require("../../../data/staking.json")

  export async function unstake(
      anchorWallet: AnchorWallet,
      wallet: WalletContextState,
      mint: web3.PublicKey,
      stake_pool: string,
      connection: web3.Connection,
      reward_mint: web3.PublicKey
   ) {

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

    // const banal = await connection.getBalance(stakeEntryTokenAccount);

    // let initilized = true;


    // if (banal == 0) {
    //   initilized = false;
    // }

    // // console.log(banal);



//     if (!initilized) {
//       // need a function that make the user create a an associated token account 
//           // Create token account to hold your wrapped SOL
//       const ataTransaction = new web3.Transaction().add(
//           createAssociatedTokenAccountInstruction(
//               anchorWallet.publicKey,
//               stakeEntryTokenAccount,
//               stake_entry,
//               mint
//           )
// );

//       const signature = await sendTransaction(ataTransaction, connection)
//       await connection.confirmTransaction(signature, "finalized");
//   }


      const tx1 = await claim(anchorWallet, wallet, connection, stake_pool_pubkey, mint, reward_mint)

      const [reward_distributor] = web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from(REWARD_DISTRIBUTOR_SEED),
            stake_pool_pubkey.toBuffer()
        ],
        PROGRAM_ID
    );


      const [reward_entry] = web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from(REWARD_ENTRY_SEED),
            reward_distributor.toBuffer(),
            stake_entry.toBuffer(),
        ],
        PROGRAM_ID
    );

      const transaction = await program.methods.unstake().accounts({
              stakeEntry: stake_entry,
              rewardEntry: reward_entry,
              stakePool: stake_pool_pubkey,
              originalMint: mint,
              user: anchorWallet.publicKey,
              userOriginalMintTokenAccount: token_account,
              userOriginalMintTokenRecord: record_account,
              mintMetadata: metadata_acount,
              mintEdition: master_edition,
              authorizationRules: TOKEN_METADATA_PROGRAM_ID,
              sysvarInstructions: SYSVAR_INSTRUCTIONS_PUBKEY,
              tokenProgram: TOKEN_PROGRAM_ID,
              tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
              authorizationRulesProgram: auth_rule_program,
              systemProgram: web3.SystemProgram.programId,
          })
          .transaction()
        // .rpc()


        const tx = new web3.Transaction()
        .add(tx1).add(transaction);
        let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
        tx.recentBlockhash = blockhash;
        tx.feePayer = new web3.PublicKey(anchorWallet.publicKey);
    
        return tx
}
  
  