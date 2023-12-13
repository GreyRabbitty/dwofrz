import nacl from 'tweetnacl'
import bs58 from 'bs58'
import { getToken } from "next-auth/jwt";
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'


export default async function handler(req, res) {
    
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
        database: "rating",
        collection: req.body.twitter_id,
    };

    const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;

    console.log('fetchBody in rate.js =====> ', fetchBody);


    try {
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
          });
          const supabase = createServerSupabaseClient({req, res})

          // console.log('supabase ===> ', supabase)
          const {
            data: { session },
          } = await supabase.auth.getSession()

          console.log('session ===> ', session);
          console.log('session ===> ', token);
          
          if (!token) {
            return res.status(401).json({
              status: "ERR",
              message: "connect your twitter first"
            })
          }

          
          //TODO
          if (!session) {
            return res.status(401).json({
              status: "ERR",
              message: "connect your discord first"
            })
          }
          
        // verify if the user is the one that we want him to be [owner]
        // var enc = new TextEncoder(); // always utf-8
        // const signData = enc.encode(`
        // Message: Welcome to Ragnarok!

        // Click to sign in and accept the Dworfz Terms of Service: https://Dworfz.com
    
        // This request will not trigger a blockchain transaction or cost any gas fees.
    
        // you rate a tweet now
    
        // Wallet address: ${req.body.address}`
        // )

        // const signature = req.body.seg;
        const pubkey = req.body.address

        // const result = nacl.sign.detached.verify(signData, bs58.decode(signature), pubkey.toBuffer())


        // if (!result) {
        //     return res.status(401).json({
        //         status: "ERR",
        //         message: "you are not allowed to do this action!"
        //     })
        // }
        const readData = await fetch(`${baseUrl}/findOne`, {
            ...fetchOptions,
            body: JSON.stringify({
              ...fetchBody,
              filter: {
                twitter_id: token.sub
              }
            }),
          });
          const readDataJson = await readData.json();
          if (readDataJson.document) {
            return res.status(405).json({
                status: "ERR",
                massage: "you already rate this tweet!"
            })
          }

        const rate = {
            rate: req.body.rate,
            address: pubkey,
            twitter_id:  token.sub,
            discord_id: session.user.user_metadata.sub //TODO
        }


        const insertData = await fetch(`${baseUrl}/insertOne`, {
            ...fetchOptions,
            body: JSON.stringify({
              ...fetchBody,
              document: rate
            }),
          });
          const insertDataJson = await insertData.json();
          res.status(200).json({
            status: "OK",
            insertDataJson: insertDataJson
        });
        }catch(error) {
            console.error(error);
            res.status(500).json({
                status: "ERR",
                message: error
            });
        }

        }