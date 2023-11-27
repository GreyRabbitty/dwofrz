import {
  AnchorProvider,
  BN,
  Program,
  Wallet,
  web3
} from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import * as bs58 from "bs58";
import { pdas } from "../../../../components/utils/pda";
const abi = require("../../../../public/escrow.json");

export default async function handle(req, res) {
  try {
    // const holder = req.body.holder;
    let holder = true;
    const remaining_account = [];
    let public_time = false;
    const key = process.env.KEY;
    const dworfz_mint = req.body.dworfz_mint;
    if (dworfz_mint === null) {
      holder = false;
    }
    const signer = web3.Keypair.fromSecretKey(bs58.decode(key));
 
    const anchorWallet = new Wallet(req.body.anchorWallet);

    const rpc = process.env.RPC;

    const connection = new web3.Connection(rpc, {
      confirmTransactionInitialTimeout: 2147483647,
    });

    const provider = new AnchorProvider(connection, anchorWallet, {
      preflightCommitment: "processed",
    });

    const PROGRAM_ID = new web3.PublicKey(abi.metadata.address);
    const program = new Program(abi, abi.metadata.address, provider);
    const reward = Number(req.body.reward);
    const user_ata = new web3.PublicKey(req.body.user_ata);
    const mint = new web3.PublicKey(req.body.mint);
    const escrow_ata = new web3.PublicKey(req.body.escrow_ata);
    const escrow = new web3.PublicKey(req.body.escrow);
    const index = req.body.index;
    const lister = new web3.PublicKey(req.body.lister);
    const [listing, bump] = web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("RAGNAROK"),
        lister.toBuffer(),
        new BN(index).toArrayLike(Buffer, "le", 4),
      ],
      PROGRAM_ID
    );

    if (holder) {
      // const mint = req.body.dworfz_mint
      const mint = new web3.PublicKey(dworfz_mint);

      const [ata, metadata_account, master_edition] = await pdas(
        new web3.PublicKey(anchorWallet.publicKey.toString()),
        mint
      );

      remaining_account.push(
        {
          isSigner: false,
          isWritable: true,
          pubkey: ata,
        },
        {
          isSigner: false,
          isWritable: true,
          pubkey: mint,
        },
        {
          isSigner: false,
          isWritable: false,
          pubkey: metadata_account,
        },
        {
          isSigner: false,
          isWritable: false,
          pubkey: master_edition,
        }
      );
    }

    const current_time = Date.now();
    const time = req.body.time;
    const day_time = 1000 * 60 * 60 * 24 * 2 + time;

    if (current_time > day_time) {
      public_time = true;
    }

    const transaction = await program.methods
      .point(new BN(index), new BN(reward), holder, public_time)
      .accounts({
        listing: listing,
        lister: lister,
        authority: signer.publicKey,
        user: anchorWallet.publicKey,
        escrow: escrow,
        userAta: user_ata,
        escrowAta: escrow_ata,
        mint: mint,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: web3.SystemProgram.programId,
      })
      .remainingAccounts(remaining_account)
      .transaction();

    const tx = new web3.Transaction().add(transaction);
    let blockhash = (await connection.getLatestBlockhash("finalized"))
      .blockhash;
    tx.recentBlockhash = blockhash;
    tx.feePayer = new web3.PublicKey(anchorWallet.publicKey);

    tx.sign(signer);

    const serialize = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    });

    res.status(200).json({
      status: "OK",
      serializedTx: serialize,
    });
  } catch (e) {
    // console.log(e);
    res.status(400).json({
      status: "ERR",
      message: e,
    });
  }
}
