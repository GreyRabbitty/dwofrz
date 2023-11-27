import { BN, BorshAccountsCoder, utils } from "@coral-xyz/anchor";
import { Commitment, Connection, GetMultipleAccountsConfig, PublicKey } from "@solana/web3.js";
import { IDL } from "./IDL";

export const getBatchedMultipleAccounts = async (
    connection: Connection,
    ids: PublicKey[],
    config?: GetMultipleAccountsConfig | Commitment,
    batchSize = 100
  ) => {
    const batches: PublicKey[][] = [[]];
    ids.forEach((id) => {
      const batch = batches[batches.length - 1];
      if (batch) {
        if (batch.length >= batchSize) {
          batches.push([id]);
        } else {
          batch.push(id);
        }
      }
    });
    const batchAccounts = await Promise.all(
      batches.map((b) =>
        b.length > 0 ? connection.getMultipleAccountsInfo(b, config) : []
      )
    );

    
    
    const programAccounts = batchAccounts.flat();
    
    

    const rewardEntryDatas: any[] = [];
    const coder = new BorshAccountsCoder(IDL);
    programAccounts.forEach((account) => {
      try {
        const ReawrdEntryData: any = coder.decode(
          "RewardEntry",
          account!.data
        );

        // stakeEntryData.pubkey = account.pubkey;
        if (ReawrdEntryData) {
            rewardEntryDatas.push(
            // ...account,
            // parsed:
            ReawrdEntryData
          );
        }
      } catch (e) {
        // console.log(`Failed to decode token manager data`);
      }
    });
    return rewardEntryDatas
    // return stakeEntryDatas.sort((a, b) =>
    //   a.pubkey.toBase58().localeCompare(b.pubkey.toBase58())
    // );
  };




  export function splite_Array(
    array: any[],
    array_lenght: number
  ) {
    const batches: any[][] = [[]];
    array.forEach((id) => {
      const batch = batches[batches.length - 1];
      if (batch) {
        if (batch.length >= array_lenght) {
          batches.push([id]);
        } else {
          batch.push(id);
        }
      }
    });
    return batches;
  }