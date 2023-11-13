import { web3 } from '@project-serum/anchor';
import * as bs58 from "bs58";
import { getToken } from "next-auth/jwt";

export default async function handle(req, res) {

    try {

        const serialized = req.body.serializing_tx;

        const buffer_tx = Buffer.from(serialized, 'base64');
        const signer = web3.Keypair.fromSecretKey(bs58.decode("2zVup9mcs2Dpu5K1fZ5qPqTxXuEutbY1Sw52mBDrvfXpv1KhhG1h1Htb1YXyhpmzQjWwbmn8obdJyAUNdahbjmCm"));

        const tx = web3.Transaction.from(buffer_tx);

        // const rpc = process.env.RPC
        // const connection = new web3.Connection(rpc, {
        //   confirmTransactionInitialTimeout: 2147483647
        // });
        tx.sign(signer);

        // const hash = await connection.sendRawTransaction(
        //     txv.serialize(),
        //     {
        //         skipPreflight: true
        //     }
        // )
        // const confirmation = await connection.confirmTransaction(hash, "confirmed");
        const serialize = tx.serialize({
            requireAllSignatures: false,
            verifySignatures: false,
          });



        // if (confirmation.value.err) {
        //     res.status(500).json({
        //       status: "ERR",
        //       message: confirmation.value.err
        //     })
        // }
        // else {

            res.status(200).json({
              status: "OK",
              serialize: serialize,
            })
        // }
    }
    catch(e) {
      console.log(e)
      res.status(500).json({
        status: "ERR",
        message: e
      })
    }
}