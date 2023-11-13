import {
    AnchorProvider, Program, Wallet, web3
} from '@project-serum/anchor';
import { IDENTIFIER_PREFIX, STAKE_ENTRY_PREFIX } from "../../constants/constants";
const idl = require("../../../data/staking.json")


export async function init_entry(
    anchorWallet: Wallet,
    connection: web3.Connection,
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

    const [stake_pool] = web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from(STAKE_ENTRY_PREFIX),
            account.count.toArrayLike(Buffer, "le", 8),
        ],
        PROGRAM_ID
    );

        const tx = await program.methods.closestakePool().accounts({
            stake_pool: stake_pool,
            authority: anchorWallet.publicKey,
        })
        .rpc({
            commitment: "finalized",
        })
    return tx;
    }