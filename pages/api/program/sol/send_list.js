import { web3 } from '@project-serum/anchor';
import { getToken } from "next-auth/jwt";

export default async function handle(req, res) {

    try {

      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token) {
        return res.status(401).json({
          status: "ERR",
          message: "connection your twitter first"
        })
      }

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
            database: "user",
            collection: req.body.user
          };

          const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;

        // await new Promise(f => setTimeout(f, 10000))


        const serialized = req.body.serializing_tx;

        const buffer_tx = Buffer.from(serialized, 'base64');

        const txv = web3.Transaction.from(buffer_tx);


        // return res.status(500).json("wow")
        const rpc = process.env.RPC
        const connection = new web3.Connection(rpc, {
          confirmTransactionInitialTimeout: 2147483647
        });

        const hash = await connection.sendRawTransaction(
            buffer_tx,
            {
                skipPreflight: true
            }
        )
        const confirmation = await connection.confirmTransaction(hash, "confirmed");



        if (confirmation.value.err) {
            res.status(500).json({
              status: "ERR",
              message: confirmation.value.err
            })
        }
        else {



            const data = req.body.data;


            // update the project image here
            // const user_info = await fetch(`${baseUrl}/findOne`, {
            //   ...fetchOptions,
            //   body: JSON.stringify({
            //     ...fetchBody,
            //     filter: {
            //       address: req.body.user,
            //     }
            //   }),
            // });
            // const readUserInfo = (await user_info.json()).document;

            // if (readUserInfo) {
            //   data.project_image = readUserInfo.pfp;
            // }
            // else {
            //   // default image of dworfz;
            //   data.project_image = token ? token.picture : "https://cdn.discordapp.com/attachments/1030474275662082098/1080214478546804810/Dworfz_Sneak_peek_twtr.png"
            // }

            data.twitter_profile = token.picture;
            data.twitter_handler = token.name;

            fetchBody.database = "user_apply"
            fetchBody.collection = req.body.user
            // see if the user tweet is approved or not
            data.approve = false;
            const insertData_user = await fetch(`${baseUrl}/insertOne`, {
              ...fetchOptions,
              body: JSON.stringify({
                ...fetchBody,
                document: data,
              }),
            });

            const insertDataJson_user = await insertData_user.json();
            data.user_id = insertDataJson_user.insertedId

            // insert the data
            fetchBody.database = "waiting_tweet"
            fetchBody.collection = "solana"
            const insertData = await fetch(`${baseUrl}/insertMany`, {
              ...fetchOptions,
              body: JSON.stringify({
                ...fetchBody,
                documents: [data],
              }),
            });
            const insertDataJson = await insertData.json();
  
            // // insert user data

            res.status(200).json({
              status: "OK",
                hash: hash,
                insertData: insertDataJson,
                insertDataJson_user: insertDataJson_user
                // updateData: updateDataJson
            })
        }
    }
    catch(e) {
      console.log(e)
      res.status(500).json({
        status: "ERR",
        message: e
      })
    }
}