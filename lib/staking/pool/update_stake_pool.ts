import { PublicKey } from '@metaplex-foundation/js';
import {
    AnchorProvider, Program, Wallet, web3
} from '@project-serum/anchor';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import { IDENTIFIER_PREFIX, STAKE_ENTRY_PREFIX } from "../../constants/constants";
const idl = require("../../../data/staking.json")

/**
    overlay_text: String,
    image_uri: String,
    requires_collections: Vec<Pubkey>,
    requires_creators: Vec<Pubkey>,
    requires_authorization: bool,
    authority: Pubkey,
    reset_on_stake: bool,
    cooldown_seconds: Option<u32>,
    min_stake_seconds: Option<u32>,
    end_date: Option<i64>,
    double_or_reset_enabled: Option<bool>,
 */

export async function update_stake_pool(
    anchorWallet: AnchorWallet,
    connection: web3.Connection,
    overlayText: string,
    imageUri: string,
    requiresCollections: web3.PublicKey[],
    requiresCreators: web3.PublicKey[],
    requiresAuthorization: boolean,
    resetOnStake: boolean,
    cooldownSeconds: number | null,
    minStakeSeconds: number | null,
    endDate: number | null,
    doubleOrResetEnabled: boolean
) {

    const provider = new AnchorProvider(
        connection, anchorWallet, {"preflightCommitment": "processed"},
        );

    const PROGRAM_ID = new web3.PublicKey(idl.metadata.address)
    const program = new Program(idl, idl.metadata.address, provider);

    const [identifier] = web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from(IDENTIFIER_PREFIX),
        ],
        PROGRAM_ID
    );
    
    const account = await program.account.identifier.fetch(identifier);

    // const [stake_pool, bump] = web3.PublicKey.findProgramAddressSync(
    //     [
    //         Buffer.from(STAKE_ENTRY_PREFIX),
    //         account.count.toArrayLike(Buffer, "le", 8),
    //     ],
    //     PROGRAM_ID
    // );

    const stake_pool = new PublicKey("J5pFu3e73kYN6C7hqu2W8zBupsQyGeDNxUDzpn9NyZLp")

        const tx = await program.methods.updateStakePool({      
                imageUri: imageUri || "",
                overlayText: overlayText || "STAKED",
                requiresCollections: requiresCollections || [],
                requiresCreators: requiresCreators || [],
                requiresAuthorization: requiresAuthorization || false,
                authority: anchorWallet.publicKey,
                resetOnStake: resetOnStake || false,
                cooldownSeconds: cooldownSeconds || null,
                minStakeSeconds: minStakeSeconds || null,
                endDate: endDate || null,
                doubleOrResetEnabled: doubleOrResetEnabled || null
            }).accounts({
                stakePool: stake_pool,
                // identifier: identifier,
                payer: anchorWallet.publicKey,
                // systemProgram: web3.SystemProgram.programId
        })
        .rpc({
            commitment: "finalized",
        })
    return tx;
    }