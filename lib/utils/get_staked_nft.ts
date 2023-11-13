import { BN, BorshAccountsCoder, utils } from "@coral-xyz/anchor";
import type { Commitment, Connection } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import { IDL } from "./IDL";
import { StakeEntryData } from "./constants_type";
import type { AccountData } from "./type";

export const getStakeEntriesForUser = async (
    connection: Connection,
    user: PublicKey,
    commitment?: Commitment,
  ) => {
    const STAKE_POOL_ADDRESS =  new PublicKey("6tBPww6mfWdJ4Hs9Y1kVsVDLn1H4GgjBCM8Xu2LMQE9");
    const STAKER_OFFSET = 74;
    const programAccounts = await connection.getProgramAccounts(
      STAKE_POOL_ADDRESS,
      {
        filters: [{ memcmp: { offset: STAKER_OFFSET, bytes: user.toBase58() } }],
        commitment,
      }
    );

  
    const stakeEntryDatas: any[] = [];
    const coder = new BorshAccountsCoder(IDL);
    programAccounts.forEach((account) => {
      try {
        const stakeEntryData: any = coder.decode(
          "StakeEntry",
          account.account.data
        );

        stakeEntryData.pubkey = account.pubkey;
        if (stakeEntryData) {
          stakeEntryDatas.push(
            // ...account,
            // parsed:
             stakeEntryData
          );
        }
      } catch (e) {
        console.log(`Failed to decode token manager data`);
      }
    });
    return stakeEntryDatas.sort((a, b) =>
      a.pubkey.toBase58().localeCompare(b.pubkey.toBase58())
    );
  };



