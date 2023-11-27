import { web3 } from "@project-serum/anchor";
import { Nlike_retweet_comment } from "../../../../components/discord/nft/like_retweet_comment";
import { Nlike_retweet_comment_discord } from "../../../../components/discord/nft/like_retweet_comment_discord";
import { Nlike_retweet_comment_follow } from "../../../../components/discord/nft/like_retweet_comment_follow";
import { Nlike_retweet_comment_follow_discord } from "../../../../components/discord/nft/like_retweet_comment_follow_discord";
import { Like_retweet_comment } from "../../../../components/discord/solana/like_retweet_comment";
import { Like_retweet_comment_discord } from "../../../../components/discord/solana/like_retweet_comment_discord";
import { Like_retweet_comment_follow } from "../../../../components/discord/solana/like_retweet_comment_follow";
import { Like_retweet_comment_follow_discord } from "../../../../components/discord/solana/like_retweet_comment_follow_discord";
const {
  Client,
  IntentsBitField,
  EmbedBuilder,
  TextChannel,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");
const { roleMention } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessages,
  ],
});

export default async function handle(req, res) {

  // console.log('================== api / program / sol / send_accept ===================');

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

    // const buffer_tx = Buffer.from(serialized, "base64");
    // const rpc = process.env.RPC;

    // const connection = new web3.Connection(rpc, {
    //   confirmTransactionInitialTimeout: 2147483647,
    // });

    // const hash = await connection.sendRawTransaction(buffer_tx, {
    //   skipPreflight: true,
    // });
    // const confirmation = await connection.confirmTransaction(hash, "confirmed");

    // if (confirmation.value.err) {
    //   res.status(500).json(confirmation.value.err);
    // } else {
      const data = req.body.data;

      // console.log(' >>>>>>>> Data API deleteOne doing ');

      // console.log('fetchOptions ===> ', fetchOptions);
      // console.log('fetchBody ===> ', fetchBody);
      // console.log('baseUrl ===> ', baseUrl);

      const deleteData = await fetch(`${baseUrl}/deleteOne`, {
        ...fetchOptions,
        body: JSON.stringify({
          ...fetchBody,
          filter: { _id: { $oid: req.body._id } },
        }),
      });
      const deleteDataJson = await deleteData.json();

      // console.log(' >>>>>>>> Data API deleteOne done, deleteDataJson ====> ', deleteDataJson);

      fetchBody.database = "user_apply";
      fetchBody.collection = req.body.userb;

      // console.log(' >>>>>>>> Data API updateOne doing ');

      // console.log('fetchOptions ===> ', fetchOptions);
      // console.log('fetchBody ===> ', fetchBody);
      // console.log('baseUrl ===> ', baseUrl);
      // console.log('_id ===> ', data.user_id);

      const user_info = await fetch(`${baseUrl}/updateOne`, {
        ...fetchOptions,
        body: JSON.stringify({
          ...fetchBody,
          filter: { _id: { $oid: data.user_id } },
          update: {
            $set: {
              approve: true,
              postAt: Date.now(),
            },
          },
        }),
      });

      const readUserInfo = await user_info.json();

      // console.log(' >>>>>>>> Data API updateOne done, readUserInfo ====> ', readUserInfo);
                        

                        // if (readUserInfo) {
                        //     const deleteuserData = await fetch(`${baseUrl}/deleteOne`, {
                        //         ...fetchOptions,
                        //         body: JSON.stringify({
                        //             ...fetchBody,
                        //             filter: { _id: { $oid: readUserInfo._id } },
                        //         }),
                        //     });
                        //     const deleteuserDataJson = await deleteuserData.json();
                        // }

      const info = req.body.info;

      fetchBody.database = "tweets";
      fetchBody.collection = "tweets";

      delete data._id;
      data.postAt = Date.now();

      // console.log(' >>>>>>>> Data API insertMany doing ');

      // console.log('fetchOptions ===> ', fetchOptions);
      // console.log('fetchBody ===> ', fetchBody);
      // console.log('baseUrl ===> ', baseUrl);
      // console.log('data ===> ', data);

      const insertData = await fetch(`${baseUrl}/insertMany`, {
        ...fetchOptions,
        body: JSON.stringify({
          ...fetchBody,
          documents: [data],
        }),
      });
      const insertDataJson = await insertData.json();

      // console.log(' >>>>>>>> Data API insertMany done, insertDataJson ====> ', insertDataJson);

      fetchBody.database = "Notification";
      fetchBody.collection = req.body.userb;

      // // insert user data

      // console.log(' >>>>>>>> Data API insertMany doing ');

      // console.log('fetchOptions ===> ', fetchOptions);
      // console.log('fetchBody ===> ', fetchBody);
      // console.log('baseUrl ===> ', baseUrl);
      // console.log('data ===> ', data);

      const insertData_user = await fetch(`${baseUrl}/insertMany`, {
        ...fetchOptions,
        body: JSON.stringify({
          ...fetchBody,
          documents: [info],
        }),
      });

      // console.log(' >>>>>>>> Data API insertMany done, insertData_user ====> ', insertData_user);

      if (data.native_coin) {
        switch (data.bundle) {
          case "Like comment retweet":
            Like_retweet_comment(data);
            break;
          case "like comment retweet join discord":
            Like_retweet_comment_discord(data);
            break;
          case "Like comment retweet follow":
            Like_retweet_comment_follow(data);
            break;
          case "follow like comment retweet join discord":
            Like_retweet_comment_follow_discord(data);
            break;
          default:
            break;
        }
      } else {
        switch (data.bundle) {
          case "Like comment retweet":
            Nlike_retweet_comment(data);
            break;
          case "like comment retweet join discord":
            Nlike_retweet_comment_discord(data);
            break;
          case "Like comment retweet follow":
            Nlike_retweet_comment_follow(data);
            break;
          case "follow like comment retweet join discord":
            Nlike_retweet_comment_follow_discord(data);
            break;
          default:
            break;
        }
      }

      res.status(200).json({
        // hash: hash,
        insertData: insertDataJson,
        insertDataJson_user: insertDataJson_user,
        deleteDataJson: deleteDataJson,
        updateData: updateDataJson,
        readUserInfo: readUserInfo,
        insertData_user: insertData_user
      });
    // }
  } catch (e) {
    // console.log(e);
    res.status(500).json(e);
  }
}
