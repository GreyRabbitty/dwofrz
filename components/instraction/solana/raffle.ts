import { web3 } from '@project-serum/anchor';
import { WalletContextState } from "@solana/wallet-adapter-react";
import { points } from "../../programs/solana/pionts";

export async function sol_raffle(
    anchorWallet: any,
    connection: web3.Connection,
    data : any,
    wallet: WalletContextState,
    twitter_id: string,
    reward: number,
    interact: number,
    data_id: string,
    name: string,
    image: string,
    raffle_time: any,
    reword_type: string,
    reword_amount: number,
    reword_name: string,
    lister: string,
    index: number,
    dworfz_mint: any,
    time: number
) {
        await points(
            anchorWallet,
            wallet,
            connection,
            reward,
            interact,
            data_id,
            twitter_id,
            data,
            name,
            image,
            raffle_time,
            reword_type,
            reword_amount,
            reword_name,
            lister,
            index,
            dworfz_mint,
            time
            );
}