import nacl from 'tweetnacl'
import { web3 } from '@project-serum/anchor';
import bs58 from 'bs58'


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
      database: "tweets",
      collection: "tweets",
    };

    const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;

    try {

        // verify if the user is the one that we want him to be [owner]
        var enc = new TextEncoder(); // always utf-8
        const signData = enc.encode(`
        Message: Welcome to Ragnarok!

        Do you really delete?
    
        Wallet address: ${req.body.address}`
        )

        const signature = req.body.seg;
        const pubkey = new web3.PublicKey("33DJQowiaDoRMF5U68iBPudJP5BqHyHnVXH8MdfR8VWK");

        const result = nacl.sign.detached.verify(signData, bs58.decode(signature), pubkey.toBuffer())


        if (!result) {
            return res.status(401).json({
                status: "ERR",
                message: "you are not allowed to do this action!"
            })
        }

        const updatepoint = await fetch(`${baseUrl}/updateOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            filter: { _id: { $oid: req.body.id } },
            update: {
              $set: {
                done: true
              },
            },
          }),
        });
        const updateDataJson = await updatepoint.json();

        // const deleteData = await fetch(`${baseUrl}/updateOne`, {
        //     ...fetchOptions,
        //     body: JSON.stringify({
        //       ...fetchBody,
        //       filter: { _id: { $oid: req.body.id } },
        //     }),
        //   });
        //   const deleteDataJson = await deleteData.json();
          res.status(200).json({
            status: "OK",
            deleteDataJson: updateDataJson
        });
        }catch(error) {
            console.error(error);
            res.status(500).json({
                status: "ERR",
                message: error
            });
        }

        }