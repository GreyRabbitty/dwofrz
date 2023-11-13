import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
    try {
    const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
    });
    if (token) {
        return res.status(200).json({
            status: "OK",
            twitter_id: token.sub,
        })
    } else {
        return req.status(401).json({
            status: "ERR",
            message: "there is no twitter connection!"
        })
    }
    }catch(e) {
        return res.status(500).json(e)
    }
}