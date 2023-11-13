import {
    AnchorProvider, Program, Wallet, web3
} from '@project-serum/anchor';
import { REWARD_ENTRY_SEED } from "../../constants/constants";
const idl = require("../../../data/staking.json")


export async function init_reward_entry(
    anchorWallet: any,
    connection: web3.Connection,
    stake_entry: web3.PublicKey,
    reward_distributor: web3.PublicKey,
) {

    const provider = new AnchorProvider(
        connection, anchorWallet, {"preflightCommitment": "processed"},
        );

    const PROGRAM_ID = new web3.PublicKey(idl.metadata.address)
    const program = new Program(idl, idl.metadata.address, provider);

    const [reward_entry] = web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from(REWARD_ENTRY_SEED),
            reward_distributor.toBuffer(),
            stake_entry.toBuffer(),
        ],
        PROGRAM_ID
    );
        console.log("init_reward_entry");
        console.log(reward_entry.toBase58())
        console.log(stake_entry.toBase58())
        console.log(reward_distributor.toBase58())
        const tx = await program.methods.initRewardEntry().accounts({
            rewardEntry: reward_entry,
            stakeEntry: stake_entry,
            rewardDistributor: reward_distributor,
            payer: anchorWallet.publicKey,
            systemProgram: web3.SystemProgram.programId
        })
        .transaction()
        // .rpc({
        //     commitment: "finalized",
        // })
    return tx;
    }