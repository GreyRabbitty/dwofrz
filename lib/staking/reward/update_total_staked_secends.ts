import {
    AnchorProvider, Program, Wallet, web3
} from '@project-serum/anchor';
import { IDENTIFIER_PREFIX } from "../../constants/constants";
const idl = require("../../../data/staking.json")


export async function update_total_staked_seconds(
    anchorWallet: any,
    connection: web3.Connection,
    stake_entry: web3.PublicKey
) {

    const provider = new AnchorProvider(
        connection, anchorWallet, {"preflightCommitment": "processed"},
        );

    // const PROGRAM_ID = new web3.PublicKey(idl.metadata.address)
    const program = new Program(idl, idl.metadata.address, provider);
    console.log("update total stake secended");

        const tx = await program.methods.updateTotalStakeSeconds().accounts({
            stakeEntry: stake_entry,
            staked: anchorWallet.publicKey,
        })
        .transaction()
        // .rpc({
        //     commitment: "finalized",
        // })
    return tx;
    }