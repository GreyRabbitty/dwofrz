const Web3 = require("web3");
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
            collection: "ETH",
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

        if (contract.toLowerCase() !== receipt.to) {
            return res.status(400).json({
                state: "ERR",
                message: "this is not the right contract"
            })
        }
        const data = req.body.data;

        // this need to be the address that will accept the apply our address !!!!!!!!!!!!!!!!!!!!

        // if (owner.toLowerCase() !== user.toLowerCase()) {
        //     return res.status(400).json({
        //         state: "ERR",
        //     })
        // }


        const deleteData = await fetch(`${baseUrl}/deleteOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            filter: { _id: { $oid: req.body._id } },
          }),
        });
        const deleteDataJson = await deleteData.json();

        fetchBody.database = "user_apply"
        fetchBody.collection = req.body.user
        // const user_info = await fetch(`${baseUrl}/findOne`, {
        //     ...fetchOptions,
        //     body: JSON.stringify({
        //       ...fetchBody,
        //       filter: {
        //           owner: req.body.user,
        //       }
        //     }),
        // });
        // const readUserInfo = (await user_info.json()).document;

        // if (readUserInfo) {
          const user_info = await fetch(`${baseUrl}/updateOne`, {
            ...fetchOptions,
            body: JSON.stringify({
              ...fetchBody,
              filter: { _id: { $oid: data.user_id } },
              update: {
                $set: {
                    approve: true,
                    postAt: Date.now()
                },
              },
            }),
        });
        const deleteuserDataJson = await user_info.json();
        // }



      const info = req.body.info;

      fetchBody.database = "tweets"
      fetchBody.collection = "tweets"

      delete data._id
      data.postAt = Date.now()


      const insertData = await fetch(`${baseUrl}/insertMany`, {
        ...fetchOptions,
        body: JSON.stringify({
          ...fetchBody,
          documents: [data],
        }),
      });
      const insertDataJson = await insertData.json();

      // fetchBody.database = "Notification"
      // fetchBody.collection = req.body.user

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
          insertData: insertDataJson,
          // insertDataJson_user: insertDataJson_user,
          deleteDataJson: deleteDataJson
      })
    }
    catch(e) {
      console.log(e)
        res.status(500).json(e)
    } 


}