import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';


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
        database: "pandora",
        collection: "indexes",
    };

    const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;


    try {
 
        const readData = await fetch(`${baseUrl}/findOne`, {
            ...fetchOptions,
            body: JSON.stringify({
              ...fetchBody,
              filter: {
                address: req.body.address
              }
            }),
          });
          const readDataJson = await readData.json();
          if (readDataJson.document) {
            return res.status(200).json({
                status: "OK",
                index: readDataJson.document.index
            })
          }

        const index = {
            address: req.body.address,
            index: 0
        }

        const insertData = await fetch(`${baseUrl}/insertOne`, {
            ...fetchOptions,
            body: JSON.stringify({
              ...fetchBody,
              document: index
            }),
          });
          const insertDataJson = await insertData.json();
          // console.log(insertDataJson)
          res.status(200).json({
            status: "OK",
            index: 0
        });
        }catch(error) {
            console.error(error);
            res.status(500).json({
                status: "ERR",
                message: error
            });
        }

        }