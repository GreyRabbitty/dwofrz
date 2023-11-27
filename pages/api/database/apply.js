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
      database: req.query.database,
      collection: req.query.collection,
    };

    // console.log('fetchBody ===> ', fetchBody);
    
    const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;

    try {
      switch (req.method) {
        case "GET":
          const readData = await fetch(`${baseUrl}/findOne`, {
            ...fetchOptions,
            body: JSON.stringify({
              ...fetchBody,
              filter: {
                owner: req.query.address
              }
            }),
          });
          const readDataJson = await readData.json();
          // console.log('readDataJson ===> ', readDataJson);
          res.status(200).json(readDataJson.document);
          break;
        default:
          res.status(405).end();
          break;
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  