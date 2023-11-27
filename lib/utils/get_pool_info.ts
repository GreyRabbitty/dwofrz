import { AnchorProvider, Program, web3 } from '@project-serum/anchor';
const idl = require("../../data/staking.json")

export async function get_total_staked(
    anchorWallet: any,
    connection: web3.Connection,
    pool: string
) {
    try {
        const provider = new AnchorProvider(
            connection, anchorWallet, {"preflightCommitment": "processed"},
            );
        const program = new Program(idl, idl.metadata.address, provider);
        const account = await program.account.stakePool.fetch(pool);
        return account.totalStaked;
    } catch(e) {
        // console.log(e);
    }
}