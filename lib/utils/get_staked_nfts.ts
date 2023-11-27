import { AnchorProvider, IdlAccounts, Program, Wallet, web3 } from '@project-serum/anchor';
import { STAKE_ENTRY_PREFIX } from "../constants/constants";
const idl = require("../../data/staking.json")

export async function get_staked(
    anchorWallet: any,
    connection: web3.Connection,
    nfts: any[],
    staking_pool: string
) {
    try {

        const arr: any[] = [];

        const provider = new AnchorProvider(
            connection, anchorWallet, {"preflightCommitment": "processed"},
            );
    
        const PROGRAM_ID = new web3.PublicKey(idl.metadata.address)
        const program = new Program(idl, idl.metadata.address, provider);

        let i = 0;
        let len = nfts.length;
        const stake_pool_pubkey = new web3.PublicKey(staking_pool);

        nfts.map(async (nft: any, n: number) => {
            await time_out(n);
            const [stake_entry, bump] = web3.PublicKey.findProgramAddressSync(
                [
                    Buffer.from(STAKE_ENTRY_PREFIX),
                    stake_pool_pubkey.toBuffer(),
                    nft.mintAddress.toBuffer(),
                    anchorWallet.publicKey.toBuffer(),
                ],
                PROGRAM_ID
            );
            const balance = await connection.getBalance(stake_entry);
            let initilized = true;
            if (balance == 0) {
              initilized = false;
            }
            if (initilized) {
                try {
                    const account = await program.account.stakeEntry.fetch(stake_entry);
                    if (account.stakeMint.toBase58() == nft.mintAddress.toBase58()) {
                        account.pubkey = stake_entry;
                        arr.push(account)
                    }
                }catch(e) {
                }
              }
              i++;
        })

        while (i < len) {
            await new Promise(resolve => setTimeout(resolve, 500));
        }

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




async function time_out(n: number) {

    if (n >= 1000) {
        await new Promise((resolve) => setTimeout(resolve, 5500)); // wait for 5 seconds
    }
    else if (n >= 900) {
        await new Promise((resolve) => setTimeout(resolve, 5000)); // wait for 5 seconds
    }
    else if (n >= 800) {
        await new Promise((resolve) => setTimeout(resolve, 4500)); // wait for 5 seconds
    }
    else if (n >= 700) {
        await new Promise((resolve) => setTimeout(resolve, 4000)); // wait for 5 seconds
    }
    else if (n >= 600) {
        await new Promise((resolve) => setTimeout(resolve, 3500)); // wait for 5 seconds
    }
    else if (n >= 500) {
        await new Promise((resolve) => setTimeout(resolve, 3000)); // wait for 5 seconds
    }
    else if (n >= 400) {
        await new Promise((resolve) => setTimeout(resolve, 2500)); // wait for 5 seconds
    }
    else if (n >= 300) {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // wait for 5 seconds
    }
    else if (n >= 200) {
        await new Promise((resolve) => setTimeout(resolve, 1500)); // wait for 5 seconds
    }
    else if (n >= 100) {
        await new Promise((resolve) => setTimeout(resolve, 500)); // wait for 5 seconds
    }

}