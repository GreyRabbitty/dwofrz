import { Console } from "console";
import { ethers } from "ethers";
const abi = require("../../../../public/abi.json");
const Web3 = require("web3");

export default async function handle(req, res) {

    const address = "0xAa444f823C3cEFcd3776fDC53f95ebbE7a6039B0"

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
            database: "raffle",
            collection: req.body.twitter_id,
          };
        const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;
        const receiver = req.body.account;
        const contract_address = req.body.contract_address;

        // need to add sig verification!!!!!!!!!!!!!!!!!!!!!!!!
        const ethSigUtil = require("eth-sig-util");

           const signature = req.body.seg;
           //   check the sig provided SOON!
           const signData =
    `
    Message: Welcome to Ragnarok!

    Click to sign in and accept the Dworfz Terms of Service: https://Dworfz.com

    This request will not trigger a blockchain transaction or cost any gas fees.

    you will Claim your D token now

    Wallet address: ${receiver}
    `
             const msgParams = {
                 data: signData,
                 sig: signature
             };
             const add = ethSigUtil.recoverPersonalSignature(msgParams);
           if (add !== receiver.toLowerCase()) {
               return res.status(401).json({
                   state: "ERR",
                   message: "not the right signer!"
               })
              }

        fetchBody.database = "user";
        fetchBody.collection = receiver;
          const user_info = await fetch(`${baseUrl}/findOne`, {
            ...fetchOptions,
            body: JSON.stringify({
              ...fetchBody,
              filter: {
                address: receiver,
              }
            }),
          });
          const readUserInfo = (await user_info.json()).document;


          fetchBody.database = "data";
          fetchBody.collection = "tools";
            const nounce_info = await fetch(`${baseUrl}/findOne`, {
              ...fetchOptions,
              body: JSON.stringify({
                ...fetchBody,
                filter: {
                  tool: "RAGNAROK",
                }
              }),
            });
        const nonce = (await nounce_info.json()).document;


        let key = process.env.KEY_ETH;
        
        const web3 = new Web3("https://late-tame-arrow.ethereum-goerli.quiknode.pro/e86d0d661e152299fa228daa3f4fba73e2bd01a1/");

        var hash = web3.utils.soliditySha3(
            receiver, readUserInfo.points, nonce.nonce, contract_address
         ).toString();

        const signedParams = web3.eth.accounts.sign(hash,key);

        var data = {
            signedParams : signedParams,
            nonce : nonce.nonce,
            amount : readUserInfo.points
         };

         const updatepoint = await fetch(`${baseUrl}/updateOne`, {
            ...fetchOptions,
            body: JSON.stringify({
              ...fetchBody,
              filter: { _id: { $oid: nonce._id } },
              update: {
                $set: {
                  nonce: nonce.nonce + 1
                },
              },
            }),
          });
          const updatepointJson = await updatepoint.json();


        res.status(200).json({
            state: "OK",
            sign_tx: data,
            updatepointJson: updatepointJson,
        })
    }
    catch(e) {
      // console.log(e)
        res.status(400).json({
            state: "ERR",
            message: e,
        })
    } 


}