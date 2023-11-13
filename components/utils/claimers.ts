import {
    AnchorProvider, BN, Program, utils, Wallet, web3
} from '@project-serum/anchor';
import { AnchorWallet, WalletContextState } from "@solana/wallet-adapter-react";
const idl = require("../../public/escrow.json");

export async function get_claimer(
    anchorWallet: AnchorWallet,
    connection: web3.Connection,
    owner: string,
    index: number
    ) {
        try {

        const PROGRAM_ID = new web3.PublicKey(idl.metadata.address)

        const listing = new web3.PublicKey(owner);

        const [lister, bump] = await web3.PublicKey.findProgramAddress(
            [
                Buffer.from("RAGNAROK"),
                listing.toBuffer(),
                new BN(index).toArrayLike(Buffer, 'le', 4),
            ],
            PROGRAM_ID
            );

        const provider = new AnchorProvider(
            connection, anchorWallet, {"preflightCommitment": "processed"},
            );
            const program = new Program(idl, idl.metadata.address, provider);
            const account = await program.account.tracker.fetch(lister);
            return Number(account.claim);
        } catch(e) {
        }
}



