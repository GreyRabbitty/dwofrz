import {
    AnchorProvider, BN, Program, utils, Wallet, web3
} from '@project-serum/anchor';
import { STAKE_ENTRY_PREFIX, TOKEN_METADATA_PROGRAM_ID } from "../../constants/constants";
const idl = require("../../../data/staking.json")

  
export async function init_entry(
    anchorWallet: any,
    stake_pool: string,
    connection: web3.Connection,
    mint_pubkey: web3.PublicKey
) {

    const provider = new AnchorProvider(
        connection, anchorWallet, {"preflightCommitment": "processed"},
        );

    const PROGRAM_ID = new web3.PublicKey(idl.metadata.address)
    const program = new Program(idl, idl.metadata.address, provider);
    // const twitter_id_resp = await fetch("/api/twitter/get_session");
    // const twitter_id = (await twitter_id_resp.json()).twitter_id;

    const stake_pool_pubkey = new web3.PublicKey(stake_pool);


    const [stake_entry, bump] = web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from(STAKE_ENTRY_PREFIX),
            stake_pool_pubkey.toBuffer(),
            mint_pubkey.toBuffer(),
            anchorWallet.publicKey.toBuffer(),
        ],
        PROGRAM_ID
    );


      const [mint_metadata] = web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from('metadata'),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          mint_pubkey.toBuffer(),
        ],
        TOKEN_METADATA_PROGRAM_ID
      );



    console.log("init stake entry");

        const tx = await program.methods.initEntry().accounts({
            stakeEntry: stake_entry,
            stakePool: stake_pool_pubkey,
            originalMint: mint_pubkey,
            originalMintMetadata: mint_metadata,
            payer: anchorWallet.publicKey,
            systemProgram: web3.SystemProgram.programId
        })
        .transaction()
        // .rpc({
        //     commitment: "finalized",
        // })
    return tx;
    }