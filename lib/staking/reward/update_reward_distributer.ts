import {
    AnchorProvider,
    BN,
    Program, web3
} from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction } from '@solana/spl-token';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { REWARD_DISTRIBUTOR_SEED, SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID } from "../../constants/constants";
const idl = require("../../../data/staking.json")

/**
 * @param anchorWallet 
 * @param wallet 
 * @param connection 
 * @param stake_pool 
 * @param mint
 * @param default_multiplier 
 * @param multiplier_decimals 
 * @param reward_amount 
 * @param reward_duration_seconds 
 * @param max_reward_seconds_received 
 * @returns 
 */

export async function update_reward_distributor(
    anchorWallet: any,
    connection: web3.Connection,
    stake_pool: web3.PublicKey,
    reward_amount: number,
    reward_duration_seconds: number,
) {

    const provider = new AnchorProvider(
        connection, anchorWallet, {"preflightCommitment": "processed"},
        );

    const PROGRAM_ID = new web3.PublicKey(idl.metadata.address)
    const program = new Program(idl, idl.metadata.address, provider);

    const [reward_distributor] = web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from(REWARD_DISTRIBUTOR_SEED),
            stake_pool.toBuffer()
        ],
        PROGRAM_ID
    );

      console.log("reward_distributor: " + reward_distributor.toBase58());

        const tx = await program.methods.updateRewardDistributor({
                rewardAmount: new BN(reward_amount),
                rewardDurationSeconds: new BN(reward_duration_seconds),
                defaultMultiplier: new BN(1),
                multiplierDecimals: new BN(0),
                maxRewardSecondsReceived: null
            }).accounts({
                rewardDistributor: reward_distributor,
                authority: anchorWallet.publicKey,
        })
        .rpc({
            commitment: "finalized",
        })
    return tx;
    }