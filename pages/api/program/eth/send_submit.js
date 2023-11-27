const Web3 = require("web3");
const abi = require("../../../../public/abi.json")
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
            collection: req.body.user,
          };

          const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;

        // await new Promise(f => setTimeout(f, 10000))

        const contract = "0xAa444f823C3cEFcd3776fDC53f95ebbE7a6039B0"

        const txHash = req.body.txHash;
        const owner = req.body.user;


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

        const user = receipt.from;
  
        if (receipt.status == false) {
            return res.status(400).json({
                state: "ERR",
                message: "transaction revert"
            })   
          }
        if (contract.toLowerCase() !== receipt.to.toLowerCase()) {
            return res.status(400).json({
                state: "ERR",
                message: "this is not the right contract"
            })
        }

        if (owner.toLowerCase() !== user.toLowerCase()) {
            return res.status(400).json({
                state: "ERR",
            })
        }
        const data = req.body.data;

        const contract_address = "0xAa444f823C3cEFcd3776fDC53f95ebbE7a6039B0"
    
        const _contract = new web3.eth.Contract(abi, contract_address);
    
        const _data = await _contract.methods.getItemCounter().call();
    
        
        data.item_id = Number(_data)




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
        //   if (readUserInfo.pfp) {
        //     data.project_image = readUserInfo.pfp;
        //   } else {
        //     data.project_image = token ? token.picture : "https://cdn.discordapp.com/attachments/1030474275662082098/1080214478546804810/Dworfz_Sneak_peek_twtr.png"
        //   }
        // }
        // else {
        //   // default image of dworfz;
        //   data.project_image = token ? token.picture : "https://cdn.discordapp.com/attachments/1030474275662082098/1080214478546804810/Dworfz_Sneak_peek_twtr.png"
        // }

        fetchBody.database = "user_apply";
        fetchBody.collection = req.body.user;
        // this to see if the tweet is approved or not
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
        fetchBody.collection = "ETH"
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
            insertData: insertDataJson,
            insertDataJson_user: insertDataJson_user
            // updateData: updateDataJson
        })
    }
    catch(e) {
      // console.log(e)
      res.status(500).json({
        status: "ERR",
        message: e
      })
    }
}