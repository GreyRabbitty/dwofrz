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
        const updateData = await fetch(`${baseUrl}/updateOne`, {
            ...fetchOptions,
            body: JSON.stringify({
              ...fetchBody,
              filter: { _id: { $oid: req.body._id } },
              update: {
                $set: {
                    complete: true,
                },
              },
            }),
          });
          const updateDataJson = await updateData.json();
          res.status(200).json(updateDataJson);
        }catch(e) {
            console.error(error);
            res.status(500).json({ error });
        }
}