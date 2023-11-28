import {
    AnchorProvider, BN, Program, utils, Wallet, web3
} from '@project-serum/anchor';
// import { isNewExpression } from 'typescript';
// const mogoose = require("mongoose")

// mogoose.connect(process.env.MONGODB_DATA_API_URL, () => {
// })


export default async function handle(req, res) {

    try {
        const fetchOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Request-Headers": "*",
              "api-key": process.env.MONGODB_DATA_API_KEY,
            },
          };

          const fetchBody = {
            dataSource: process.env.MONGODB_DATA_SOURCE,
            database: "waiting_tweet",
            collection: "solana",
          };


          const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;

        // await new Promise(f => setTimeout(f, 10000))


        // const serialized = req.body.serializing_tx;

        // const buffer_tx = Buffer.from(serialized, 'base64');

        // const txv = web3.Transaction.from(buffer_tx);

        // return res.status(200).json({
        //   message: "what the hello you see",
        //   tx: txv
        // })
        // const rpc = process.env.RPC
        // const connection = new web3.Connection(rpc, {
        //     confirmTransactionInitialTimeout: 2147483647
        // });

        // const hash = await connection.sendRawTransaction(
        //     buffer_tx,
        //     {
        //         skipPreflight: true
        //     }
        // );

        // const confirmation = await connection.confirmTransaction(hash, "confirmed");



        // if (confirmation.value.err) {
        //     res.status(500).json(confirmation.value.err)
        // }
        // else {
            const data = req.body.data
            const deleteData = await fetch(`${baseUrl}/deleteOne`, {
                ...fetchOptions,
                body: JSON.stringify({
                  ...fetchBody,
                  filter: { _id: { $oid: req.body._id } },
                }),
              });
              const deleteDataJson = await deleteData.json();

            //   fetchBody.database = "user_apply"
            //   fetchBody.collection = req.body.userb
            //   const user_info = await fetch(`${baseUrl}/findOne`, {
            //       ...fetchOptions,
            //       body: JSON.stringify({
            //         ...fetchBody,
            //         filter: {
            //             owner: req.body.userb,
            //         }
            //       }),
            //   });
            //   const readUserInfo = (await user_info.json()).document;

            //   if (readUserInfo) {
                  fetchBody.database = "user_apply"
                  fetchBody.collection = req.body.userb
                  const deleteuserData = await fetch(`${baseUrl}/deleteOne`, {
                      ...fetchOptions,
                      body: JSON.stringify({
                          ...fetchBody,
                          filter: { _id: { $oid: data.user_id } },
                      }),
                  });
                  const deleteuserDataJson = await deleteuserData.json();
            //   }

            const info = req.body.info;

            // fetchBody.database = "Notification"
            // fetchBody.collection = req.body.userb

            // // // insert user data 
            // const insertData_user = await fetch(`${baseUrl}/insertMany`, {
            //   ...fetchOptions,
            //   body: JSON.stringify({
            //     ...fetchBody,
            //     documents: [info],
            //   }),
            // });

            // const insertDataJson_user = await insertData_user.json();

            res.status(200).json({
                hash: hash,
                // insertDataJson_user: insertDataJson_user,
                deleteDataJson: deleteDataJson
                // updateData: updateDataJson
            })
        // }
    }
    catch(e) {
        // console.log(e)
        console.log('error ==> ', e);
        res.status(500).json(e)
    }
}