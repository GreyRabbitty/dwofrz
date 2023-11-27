import {
    AnchorProvider,
    BN,
    Program, web3
} from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction } from '@solana/spl-token';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { REWARD_DISTRIBUTOR_SEED, SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID } from "../../constants/constants";
const idl = require("../../../data/staking.json")


export async function init_reward_distributor(
    anchorWallet: any,
    wallet: WalletContextState,
    connection: web3.Connection,
    stake_pool: web3.PublicKey,
    mint: web3.PublicKey,
    reward_amount: number,
    reward_duration_seconds: number,
    kind: number,
    supply: number,
    max_supply: number,
    default_multiplier: number,
    multiplier_decimals: number,
    max_reward_seconds_received: number,
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

    const [user_associeted_token_account] = web3.PublicKey.findProgramAddressSync(
        [
            anchorWallet.publicKey.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            mint.toBuffer(),
        ],
        SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    );
    
    const [distributor_associeted_token_account] = web3.PublicKey.findProgramAddressSync(
        [
            reward_distributor.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            mint.toBuffer(),
        ],
        SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    );

    let initilized = false;
    try {
        const banal = await connection.getBalance(distributor_associeted_token_account);
        if (banal > 0) {
            initilized = true;
        }
    } catch(e) {
    }

    if (!initilized) {
        // need a function that make the user create a an associated token account 
            // Create token account to hold your wrapped SOL
        const ataTransaction = new web3.Transaction().add(
            createAssociatedTokenAccountInstruction(
                anchorWallet.publicKey,
                distributor_associeted_token_account,
                reward_distributor,
                mint!
            )
        );
        const signature = await wallet.sendTransaction(ataTransaction, connection)
        await connection.confirmTransaction(signature, "finalized");
    }

    const remaining_account: web3.AccountMeta[] = [];

    remaining_account.push(
      {
        isSigner: false,
        isWritable: true,
        pubkey: distributor_associeted_token_account,
      },
      {
        isSigner: false,
        isWritable: true,
        pubkey: user_associeted_token_account,
      },
      )

      // console.log("reward_distributor: " + reward_distributor.toBase58());

        const tx = await program.methods.initRewardDistributors({
                rewardAmount: new BN(reward_amount),
                rewardDurationSeconds: new BN(reward_duration_seconds),
                kind: new BN(kind),
                supply: new BN(supply),
                maxSupply: new BN(max_supply),
                defaultMultiplier: null,
                multiplierDecimals: null,
                maxRewardSecondsReceived: null
            }).accounts({
                rewardDistributor: reward_distributor,
                stakePool: stake_pool,
                rewardMint: mint,
                authority: anchorWallet.publicKey,
                payer: anchorWallet.publicKey,
                tokenProgram: TOKEN_PROGRAM_ID,
                systemProgram: web3.SystemProgram.programId
        })
        .remainingAccounts(remaining_account)
        // .transaction()
        .rpc({
            commitment: "finalized",
        })
    return tx;
    }