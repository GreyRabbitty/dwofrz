import {
    AnchorProvider, Program, Wallet, web3
} from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction } from '@solana/spl-token';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { REWARD_DISTRIBUTOR_SEED, REWARD_ENTRY_SEED, SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID, STAKE_ENTRY_PREFIX } from "../../constants/constants";
import { init_reward_entry } from "./init_reward_entry";
import { update_total_staked_seconds } from "./update_total_staked_secends";
const idl = require("../../../data/staking.json")

export async function claim(
    anchorWallet: any,
    wallet: WalletContextState,
    connection: web3.Connection,
    stake_pool: web3.PublicKey,
    mint: web3.PublicKey,
    reward_mint: web3.PublicKey
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

    
    const [stake_entry, bump] = web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from(STAKE_ENTRY_PREFIX),
            stake_pool.toBuffer(),
            mint.toBuffer(),
            anchorWallet.publicKey.toBuffer(),
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


    const reward_entry_balance = await connection.getBalance(reward_entry);

    const tx = new web3.Transaction()
    if (reward_entry_balance == 0) {
        const tx1 = await init_reward_entry(anchorWallet, connection, stake_entry, reward_distributor);
        tx.add(tx1);
    }



    const tx2 = await update_total_staked_seconds(anchorWallet, connection, stake_entry)
    tx.add(tx2);
    const [userRewardMintTokenAccount] = web3.PublicKey.findProgramAddressSync(
        [
            anchorWallet.publicKey.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            reward_mint.toBuffer(),
        ],
        SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    );

    const [RewardDistributorMintTokenAccount] = web3.PublicKey.findProgramAddressSync(
        [
            reward_distributor.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            reward_mint.toBuffer(),
        ],
        SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    );
    let initilized = false;
    try {
        const banal = await connection.getBalance(userRewardMintTokenAccount);
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
                userRewardMintTokenAccount,
                anchorWallet.publicKey,
                reward_mint!
            )
        );
        const signature = await wallet.sendTransaction(ataTransaction, connection)
        await connection.confirmTransaction(signature, "finalized");
    }

    const reward_manager = new web3.PublicKey("8VEb9vg7yBGACmzQDPHV8kXJoCefk3pPARmWXMLiusjY");


    // // console.log("stake_entry: " + stake_entry.toBase58())
    // // console.log("stake_pool: " + stake_pool.toBase58())
    // // console.log("mint: " + mint.toBase58())
    // // console.log("reward_entry: " + reward_entry.toBase58())
    // // console.log("rewardDistributor: " + reward_distributor.toBase58())
    // // console.log("userRewardMintTokenAccount: " + userRewardMintTokenAccount.toBase58())

        const tx3 = await program.methods.claim().accounts({
            rewardEntry: reward_entry,
            rewardDistributor: reward_distributor,
            stakeEntry: stake_entry,
            stakePool: stake_pool,
            rewardMint: reward_mint,
            userRewardMintTokenAccount: userRewardMintTokenAccount,
            rewardManager: reward_manager,
            user: anchorWallet.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: web3.SystemProgram.programId
        })
        .remainingAccounts([
            {
                isSigner: false,
                isWritable: true,
                pubkey: RewardDistributorMintTokenAccount,
            }
        ])
        .transaction()
        // .rpc({
        //     commitment: "finalized",
        // })
        tx.add(tx3);
        let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
        tx.recentBlockhash = blockhash;
        tx.feePayer = new web3.PublicKey(anchorWallet.publicKey);
    
    return tx;
    }