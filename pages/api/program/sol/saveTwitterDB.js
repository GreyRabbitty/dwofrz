import { getToken } from "next-auth/jwt";

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
            database: "tweetlist",
            collection: "tweetlist"
        };

        const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;
        const twitter_url = req.body.twitter_url;

        console.log('<=========== New ==========>')
        const insertData_user = await fetch(`${baseUrl}/insertOne`, {
            ...fetchOptions,
            body: JSON.stringify({
              ...fetchBody,
              document: {
                twitter_url: twitter_url
              },
            }),
        });
  
        const insertDataJson_user = await insertData_user.json();
        
        res.status(200).json({
          status: "OK",
        })
    }
    catch(e) {
      // console.log(e);
      res.status(500).json({
        status: "ERR",
        message: e
      })
    }
}