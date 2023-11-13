export default async function handler(req, res) {

    const ress = await fetch(`https://discord.com/api/v9/users/@me/guilds`,{
        headers: {Authorization: `Bearer ${req.query.token} `}
      });
    const resp  = await ress.json()

    res.status(200).json(resp);
}

