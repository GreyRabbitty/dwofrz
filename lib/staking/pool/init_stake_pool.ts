import {
    AnchorProvider,
    BN,
    Program, web3
} from '@project-serum/anchor';
import { IDENTIFIER_PREFIX, STAKE_POOL_PREFIX } from "../../constants/constants";
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

export async function init_stake_pool(
    anchorWallet: any,
    connection: web3.Connection,
    overlayText: string,
    imageUri: string,
    requiresCollections: web3.PublicKey[] | [],
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
    
    const [stake_pool, bump] = web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from(STAKE_POOL_PREFIX),
            new BN(Number(account.count)).toArrayLike(Buffer, "le", 8),
        ],
        PROGRAM_ID
    );

        const tx = await program.methods.initStakePool({      
                overlayText: overlayText || "STAKED",
                imageUri: imageUri || "",
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
                identifier: identifier,
                payer: anchorWallet.publicKey,
                systemProgram: web3.SystemProgram.programId
        })
        // .transaction()
        .rpc({
            commitment: "finalized",
        })
    return [tx, stake_pool] as const;
    }