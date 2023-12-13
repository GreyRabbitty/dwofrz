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
            database: "tweetlist",
            collection: "tweetlist"
        };



        const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;
        const twitter_url = req.body.twitter_url;


        // update the project image here
        const user_info = await fetch(`${baseUrl}/findOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            filter: {
                twitter_url: twitter_url,
            }
          }),
        });
        const readUserInfo = (await user_info.json()).document;

        if (readUserInfo) {
        console.log('<=========== Duplicated =========>')
            throw 'Duplicated tweets!!';
        }
        else {
            console.log('<=========== New ==========>')
            // const insertData_user = await fetch(`${baseUrl}/insertOne`, {
            //     ...fetchOptions,
            //     body: JSON.stringify({
            //       ...fetchBody,
            //       document: {
            //         twitter_url: twitter_url
            //     },
            //     }),
            //   });
      
            // const insertDataJson_user = await insertData_user.json();
        }
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