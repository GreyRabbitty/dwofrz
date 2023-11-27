import { AnchorProvider, IdlAccounts, Program, Wallet, web3 } from '@project-serum/anchor';
import { REWARD_DISTRIBUTOR_SEED, REWARD_ENTRY_SEED } from "../constants/constants";
import { getBatchedMultipleAccounts } from "./utils";

const idl = require("../../data/staking.json")

export async function get_claim_amount(
    anchorWallet: any,
    connection: web3.Connection,
    _staked: any[],
    staking_pool: string
) {
    try {

        let amount = 0;

        const provider = new AnchorProvider(
            connection, anchorWallet, {"preflightCommitment": "processed"},
            );

        const PROGRAM_ID = new web3.PublicKey(idl.metadata.address)
        const program = new Program(idl, idl.metadata.address, provider);

        let i = 0;
        let len = _staked.length;
        const stake_pool_pubkey = new web3.PublicKey(staking_pool);

        const [reward_distributor] = web3.PublicKey.findProgramAddressSync(
            [
                Buffer.from(REWARD_DISTRIBUTOR_SEED),
                stake_pool_pubkey.toBuffer(),
            ],
            PROGRAM_ID
        );

        let RewardEntryPubkeys: web3.PublicKey[] = [];

        _staked.map(async (nft: any, n: number) => {
            const [reward_entry] = web3.PublicKey.findProgramAddressSync(
                [
                    Buffer.from(REWARD_ENTRY_SEED),
                    reward_distributor.toBuffer(),
                    nft.pubkey.toBuffer(),
                ],
                PROGRAM_ID
            );
            RewardEntryPubkeys.push(reward_entry)
        })


        const RewardEntryAccounts: any[] = await getBatchedMultipleAccounts(connection, RewardEntryPubkeys);

        _staked.map(async (nft: any, n: number) => {
            const total_staked_Sec = (Date.now() / 1000) - Number(nft.lastStakedAt);

            const [reward_entry] = web3.PublicKey.findProgramAddressSync(
                [
                    Buffer.from(REWARD_ENTRY_SEED),
                    reward_distributor.toBuffer(),
                    nft.pubkey.toBuffer(),
                ],
                PROGRAM_ID
            );
            
            const exist = RewardEntryAccounts.filter((n: any) => n.stakeEntry.toBase58() == nft.pubkey)
            
            if (exist.length == 0) {
                const _amount = (Math.trunc((total_staked_Sec / (86400))) * 2.16);
                _staked[i].amount_to_claim = _amount;
                amount = amount + Number(_amount);

            } else {
                try {

                    const stake_sec = total_staked_Sec - Number(exist[0].rewardSecondsReceived)

                    const _amount = Math.trunc((stake_sec / 86400)) * 2.16;
                    _staked[i].amount_to_claim = _amount;

                    amount = amount +  Number(_amount)
                }catch(e) {
                }
              }
              i++;
        })

        while (i < len) {
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        const ob = {
            amount: amount,
            staked: _staked
        }

        return ob;



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