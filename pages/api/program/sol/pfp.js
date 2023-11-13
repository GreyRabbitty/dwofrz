import { web3 } from '@project-serum/anchor';
import { token } from '@project-serum/anchor/dist/cjs/utils';
import nacl from 'tweetnacl'
import { getToken } from "next-auth/jwt";
import bs58 from 'bs58'


export default async function handle(req, res) {
  
  try {
      
        const token = await getToken({
          req,
          secret: process.env.NEXTAUTH_SECRET,
        });
 
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
            collection: req.body.address,
          };

        //   check the sig provided SOON!
        var enc = new TextEncoder(); // always utf-8
        const signData = enc.encode(
`
Message: Welcome to Ragnarok!

Click to sign in and accept the Dworfz Terms of Service: https://Dworfz.com

This request will not trigger a blockchain transaction or cost any gas fees.

you will chenge you pfp now

Wallet address: ${req.body.address}`
        )

        const signature = req.body.seg;
        const pubkey = new web3.PublicKey(req.body.address);

        const result = nacl.sign.detached.verify(signData, bs58.decode(signature), pubkey.toBuffer())


        if (!result) {
            return res.status(401).json({
                state: "ERR",
                message: "not the right signer!"
            })
        }

        const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;

        let user_information;

        // get the user info it is exist of not then we can add it
          const user_info = await fetch(`${baseUrl}/findOne`, {
            ...fetchOptions,
            body: JSON.stringify({
              ...fetchBody,
              filter: {
                address: req.body.address,
              }
            }),
          });
          const readUserInfo = (await user_info.json()).document;

          if (readUserInfo === null) {
            user_information = {
              twitter_id: token.sub,
              discord_id: req.body.discord_id,
              address: req.body.address,
              points: 0,
              intract: 0,
              totalPoints: 0,
              pfp: req.body.pfp,
            };

            // if there is no data about the user then we need to insert it so we can store his record!
            const insertData = await fetch(`${baseUrl}/insertOne`, {
              ...fetchOptions,
              body: JSON.stringify({
                ...fetchBody,
                document: user_information,
              }),
            });
            const insertDataJson = await insertData.json();
            user_information._id = insertDataJson.insertedId;
            return res.status(200).json({
                status: "OK",
                insertDataJson: insertDataJson
            })
          } else {
            user_information = readUserInfo;
          }


        // update the points and how much I am intraction with the tweets in the tool
        const updatepoint = await fetch(`${baseUrl}/updateOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            filter: { _id: { $oid: user_information._id } },
            update: {
              $set: {
                pfp: req.body.pfp,
              },
            },
          }),
        });
        const updatepointJson = await updatepoint.json();

        res.status(200).json({
            state: "OK",
            user_info: readUserInfo,
            update_points: updatepointJson, 
        })
    }
    catch(e) {
        res.status(400).json({
            state: "ERR",
            message: e
        })
    } 


}