import { Console } from "console";
import { ethers } from "ethers";
const abi = require("../../../../public/abi.json");
const Web3 = require("web3");
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
            collection: null,
          };


        const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;

        const contract = "0xAa444f823C3cEFcd3776fDC53f95ebbE7a6039B0"

        const receiver = req.body.account;
        const txHash = req.body.txHash;
 


        const web3 = new Web3("https://late-tame-arrow.ethereum-goerli.quiknode.pro/e86d0d661e152299fa228daa3f4fba73e2bd01a1/");



        let receipt;
        while (!receipt) {
          receipt = await web3.eth.getTransactionReceipt(txHash);
          if (!receipt) {
            await new Promise(resolve => setTimeout(resolve, 5000)); // wait for 5 seconds
          }
        }

        let currentBlockNumber = await web3.eth.getBlockNumber();

        while (receipt.blockNumber > currentBlockNumber - 1) {
          currentBlockNumber = await web3.eth.getBlockNumber();
          await new Promise(resolve => setTimeout(resolve, 5000)); // wait for 5 seconds
        }

        receipt = await web3.eth.getTransactionReceipt(txHash);

        if (receipt.status == false) {
            return res.status(400).json({
                state: "ERR",
                message: "transaction revert"
            })   
          }
          const user = receipt.from;
          const claims = req.body.amount

        if (contract.toLowerCase() !== receipt.to.toLowerCase()) {
            return res.status(400).json({
                state: "ERR",
                message: "this is not the right contract"
            })
        }

        if (receiver.toLowerCase() !== user.toLowerCase()) {
            return res.status(400).json({
                state: "ERR",
            })
        }

          user.twitter_id = token.sub
          const user_info = await fetch(`${baseUrl}/findOne`, {
            ...fetchOptions,
            body: JSON.stringify({
              ...fetchBody,
              filter: {
                address: req.body.account,
              }
            }),
          });
          const readUserInfo = (await user_info.json()).document;


        const updatepoint = await fetch(`${baseUrl}/updateOne`, {
            ...fetchOptions,
            body: JSON.stringify({
              ...fetchBody,
              filter: { _id: { $oid: readUserInfo._id } },
              update: {
                $set: {
                  points: 0,
                  totalPoints: readUserInfo.totalPoints + claims
                },
              },
            }),
          });
          const updatepointJson = await updatepoint.json();
  
        res.status(200).json({
            state: "OK",
            updatepointJson: updatepointJson,
        })
    }
    catch(e) {
      console.log(e)
        res.status(400).json({
            state: "ERR",
            message: e,
        })
    } 


}