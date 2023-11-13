import { Console } from "console";
import { ethers } from "ethers";
const abi = require("../../../../public/abi.json");
import { getToken } from "next-auth/jwt";
const ethSigUtil = require("eth-sig-util");
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

export default async function handle(req, res) {

    try {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      const supabase = createServerSupabaseClient({req, res})
      const {
        data: { session },
      } = await supabase.auth.getSession()

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
        const user = req.body.data;

        let user_information;

        if (!token) {
          return res.status(401).json({
            state: "ERR",
            message: "connect twitter!"
        })    
        }
        if (!session) {
          return res.status(401).json({
            state: "ERR",
            message: "connect discord!"
        })    
        }

        const address = req.body.receiver;
        const signature = req.body.signeture;
        //   check the sig provided SOON!
        const signData =
        `
        Message: Welcome to Ragnarok!

        Click to sign in and accept the Dworfz Terms of Service: https://Dworfz.com
    
        This request will not trigger a blockchain transaction or cost any gas fees.

        you will chenge you pfp now

        Wallet address: ${address}
        `

          const msgParams = {
              data: signData,
              sig: signature
          };
          const add = ethSigUtil.recoverPersonalSignature(msgParams);
   
        if (add !== address.toLowerCase()) {
            return res.status(401).json({
                state: "ERR",
                message: "not the right signer!"
            })
        }


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
        // check if the user is already in the raffles
        const readdisData = await fetch(`${baseUrl}/findOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            filter: {
              // twitter_id: token.sub,
              discord_id: session.user.user_metadata.sub
            }
          }),
        });

        const readdisDataJson = await readdisData.json();

        if (readdisDataJson.document !== null) {
          return res.status(401).json({
            status: "ERR",
            message: "you are already in the raffle"
          })
        }

        // get the user info it is exist of not then we can add it
        fetchBody.database = "user";
        fetchBody.collection = req.body.receiver;
          const user_info = await fetch(`${baseUrl}/findOne`, {
            ...fetchOptions,
            body: JSON.stringify({
              ...fetchBody,
              filter: {
                address: req.body.receiver,
              }
            }),
          });
          const readUserInfo = await user_info.json();

          if (readUserInfo.document === null) {
            user_information = {
              twitter_id: token.sub,
              discord_id: session.user.user_metadata.sub,
              address: req.body.receiver,
              points: 0,
              intract: 0,
              totalPoints: 0
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
          } else {
            user_information = readUserInfo.document;
          }
        const receiver = req.body.receiver;
        const reword = req.body.reword;
        // const contract_address = req.body.contract_address;

        // const key = process.env.KEY_ETH;
        // const provider = ethers.getDefaultProvider("https://late-tame-arrow.ethereum-goerli.quiknode.pro/e86d0d661e152299fa228daa3f4fba73e2bd01a1/");
        // const signer = new ethers.Wallet(key, provider);
        // const contract = new ethers.Contract(contract_address, abi, signer);
        // await (await contract.reward(reword, receiver)).wait();

        // insert that I am in the raffle
        fetchBody.database = "raffle";
        fetchBody.collection = req.body.twitter_id;
        user.twitter_id = token.sub;
        const insertData = await fetch(`${baseUrl}/insertOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            document: user,
          }),
        });
        const insertDataJson = await insertData.json();

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
          network: "ETH"
        }

        fetchBody.database = "user_raffle";
        fetchBody.collection = req.body.receiver;
        const insertUserRaffle = await fetch(`${baseUrl}/insertOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            document: raffle_info,
          }),
        });
        const insertUserRaffleJson = await insertUserRaffle.json();

        // update the points and how much I am intraction with the tweets in the tool
        fetchBody.database = "user";
        fetchBody.collection = receiver;

        const updatepoint = await fetch(`${baseUrl}/updateOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            filter: { _id: { $oid: user_information._id } },
            update: {
              $set: {
                points: user_information.points + reword,
                intract: user_information.intract + 1
              },
            },
          }),
        });
        const updatepointJson = await updatepoint.json();

        fetchBody.database = "tweets";
        fetchBody.collection = "tweets";
        // update the intraction of the tweets 
        const updateData = await fetch(`${baseUrl}/updateOne`, {
            ...fetchOptions,
            body: JSON.stringify({
              ...fetchBody,
              filter: { _id: { $oid: req.body._id } },
              update: {
                $set: {
                  intract: req.body.intract + 1,
                },
              },
            }),
          });
          const updateDataJson = await updateData.json();


        res.status(200).json({
            state: "OK",
            user_info: readUserInfo,
            user_in_the_raffles: readDataJson,
            update_points: updatepointJson, 
            // insert_raffles: insertDataJson,
            tweet_interact: updateDataJson,
            insertUserRaffleJson: insertUserRaffleJson
        })
    }
    catch(e) {
      console.log(e)
        res.status(400).json(e)
    } 


}