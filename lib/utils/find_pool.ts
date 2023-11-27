import { AnchorProvider, IdlAccounts, Program, Wallet, web3 } from '@project-serum/anchor';
const idl = require("../../data/staking.json")

export async function get_pool(
    anchorWallet: any,
    connection: web3.Connection,
) {
    try {
 
        const provider = new AnchorProvider(
            connection, anchorWallet, {"preflightCommitment": "processed"},
            );

        const PROGRAM_ID = new web3.PublicKey(idl.metadata.address)
        const program = new Program(idl, idl.metadata.address, provider);

        // const filtered = await connection.getParsedProgramAccounts(PROGRAM_ID, {
        //     filters: [{
        //         dataSize: 466
        //     }]
        // })

        const arr: any[] = [];
        // if (filtered.length > 0) {
        //         filtered.map(async (account) => {
        //             let desirialize_account = await program.account.listingInfo.fetch(account.pubkey);

        //             desirialize_account.pubkey = account.pubkey;
                    
        //             arr.push(desirialize_account);
        //         })
        // }

        // while (arr.length < filtered.length) {
        //     await new Promise(resolve => setTimeout(resolve, 1000));
        // }

        return arr;



    } catch(e) {
        // console.log(e);
    }
}