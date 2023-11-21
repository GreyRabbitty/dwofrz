import NextCors from 'nextjs-cors'; 

// const mogoose = require("mongoose")

// mogoose.connect(process.env.MONGODB_DATA_API_URL, () => {
// })
export default async function handler(req, res) {

  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

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
  const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;

  console.log('===================== database / index.js =========================');
  console.log(' >>>>>>>>>>> Database ==>', req.query.database);
  console.log(' >>>>>>>>>>> collection ==>', req.query.collection);

  console.log('fetchOptions ======> ', fetchOptions)
  console.log('fetchBody ======> ', fetchBody)
  console.log('baseUrl ======> ', baseUrl)

  try {
    switch (req.method) {
      case "GET":
        const readData = await fetch(`${baseUrl}/find`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            limit: Number(req.query.limit),
            skip: Number(req.query.start),
          }),
        });
        const readDataJson = await readData.json();
        console.log('findResult => readDataJson ============> ', readDataJson);
        res.status(200).json(readDataJson.documents);
        break;

      // case "POST":
      //   const flutter = req.body.data;
      //   const insertData = await fetch(`${baseUrl}/insertMany`, {
      //     ...fetchOptions,
      //     body: JSON.stringify({
      //       ...fetchBody,
      //       documents: flutter,
      //     }),
      //   });
      //   const insertDataJson = await insertData.json();
      //   res.status(200).json(insertDataJson);
      //   break;

      // case "PUT":
      //   const updateData = await fetch(`${baseUrl}/updateOne`, {
      //     ...fetchOptions,
      //     body: JSON.stringify({
      //       ...fetchBody,
      //       filter: { _id: { $oid: req.body._id } },
      //       update: {
      //         $set: {
      //           winner: req.body.body.address,
      //           live: req.body.body.live
      //         },
      //       },
      //     }),
      //   });
        
      //   const updateDataJson = await updateData.json();
      //   res.status(200).json(updateDataJson);
      //   break;

      // case "DELETE":
      //   const deleteData = await fetch(`${baseUrl}/deleteOne`, {
      //     ...fetchOptions,
      //     body: JSON.stringify({
      //       ...fetchBody,
      //       filter: { _id: { $oid: req.body._id } },
      //     }),
      //   });
      //   const deleteDataJson = await deleteData.json();
      //   res.status(200).json(deleteDataJson);
      //   break;
      default:
        res.status(405).end();
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}