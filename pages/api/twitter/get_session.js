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
            message: "you are not allowed"
          })
        } 

        res.status(200).json({
            status: "OK",
            twitter_id: token.sub
        })

  }catch(e) {
    res.status(500).json({
        status: "ERR",
        message: e
      })
    console.log(e)
  }

    
    }