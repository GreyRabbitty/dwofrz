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
      database: "Notification",
      collection: req.body.address,
    };

    const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;

    try {
        const updateData = await fetch(`${baseUrl}/updateMany`, {
            ...fetchOptions,
            body: JSON.stringify({
              ...fetchBody,
              filter: { seen: false },
              update: {
                $set: {
                    seen: true,
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