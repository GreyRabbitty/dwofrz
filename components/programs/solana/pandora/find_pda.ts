import * as anchor from "@project-serum/anchor";
import { Connection, PublicKey } from '@solana/web3.js';

export async function find_pda(
    connection: Connection, 
    wallet: PublicKey,
    pandoraPDA: PublicKey,
    programId: PublicKey,
    index: number
    ): Promise<number> {

    let i = index;
    let balance;
    do {
        i++;
        const bnAmt = new anchor.BN(i);

        const bufferAmount = bnAmt.toArrayLike(Buffer, "le", 8);

        const [pandoraBoxPda] = PublicKey.findProgramAddressSync(
            [
            Buffer.from("PANDORABOX"),
            wallet.toBuffer(),
            pandoraPDA.toBuffer(),
            bufferAmount,
            Buffer.from("ONE"),
            ],
            programId
        );
        
        balance = await connection.getBalance(pandoraBoxPda)
    } while (balance !== 0)

    return i

}