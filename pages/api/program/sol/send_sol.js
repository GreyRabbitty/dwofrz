import {
  AnchorProvider, BN, Program, utils, Wallet, web3
} from '@project-serum/anchor';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { getToken } from "next-auth/jwt";


export default async function handle(req, res) {
  
  try {
      
        const token = await getToken({
          req,
          secret: process.env.NEXTAUTH_SECRET,
        });

        if (token && !token.sub) {
          return res.status(401).json({
            status: "ERR",
            message: "your not connecting twitter!"
          })
        }
        const supabase = createServerSupabaseClient({req, res})
        const {
          data: { session },
        } = await supabase.auth.getSession()
        if (!session) {
          return res.status(401).json({
            state: "ERR",
            message: "connect discord!"
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
            database: "raffle",
            collection: req.body.twitter_id, 
          };

          const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;


        const serialized = req.body.serializing;

        const buffer_tx = Buffer.from(serialized, 'base64');
        const rpc = process.env.RPC
        const connection = new web3.Connection(rpc, {
          confirmTransactionInitialTimeout: 2147483647
        });


        // need check here if the user is in the raffle or not
        // check if the user is already in the raffles
        const readData = await fetch(`${baseUrl}/findOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            filter: {
              twitter_id: token.sub,
              // discord_id: session.user.user_metadata.sub
            }
          }),
        });

        const readDataJson = await readData.json();

        if (readDataJson.document !== null) {
          return res.status(401).json({
            status: "ERR",
            message: "you are already in the raffle"
          })
        }
        // check if the user is already in the raffles with the same discord
        // const readdisData = await fetch(`${baseUrl}/findOne`, {
        //   ...fetchOptions,
        //   body: JSON.stringify({
        //     ...fetchBody,
        //     filter: {
        //       // twitter_id: token.sub,
        //       discord_id: session.user.user_metadata.sub
        //     }
        //   }),
        // });

        // const readdisDataJson = await readdisData.json();

        // if (readdisDataJson.document !== null) {
        //   return res.status(401).json({
        //     status: "ERR",
        //     message: "you are already in the raffle"
        //   })
        // }










        const hash = await connection.sendRawTransaction(
          buffer_tx,
          {
              skipPreflight: false
          }
      )




        const holder = req.body.holder;
        if (holder) {
          fetchBody.database = "holder_raffle";
        }
        const user = req.body.user_data;
        user.twitter_id = token.sub
        const insertData = await fetch(`${baseUrl}/insertMany`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            documents: [user],
          }),
        });


        fetchBody.database = "tweets"
        fetchBody.collection = "tweets"


        const updatepoint = await fetch(`${baseUrl}/updateOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            filter: { _id: { $oid: req.body._id } },
            update: {
              $set: {
                interact: req.body.interact + 1
              },
            },
          }),
        });



        // insert that the user enter the raffle
        const raffle_info = {
          twitter_id: req.body.twitter_id,
          name: req.body.name,
          postAT: Date.now(),
          image: req.body.image,
          time: req.body.raffle_time,
          reword_type: req.body.reword_type,
          amount: req.body.reword_amount,
          reword_name: req.body.reword_name,
          network: "SOL"
        }

        fetchBody.database = "user_raffle";
        fetchBody.collection = token.sub;
        const insertUserRaffle = await fetch(`${baseUrl}/insertOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            document: raffle_info,
          }),
        });


        res.status(200).json({
            status: "OK",
            hash: hash,
        })
    }
    catch(e) {
      console.log(e)
        res.status(500).json({
          status: "ERR",
          message: e
        })
    }


}