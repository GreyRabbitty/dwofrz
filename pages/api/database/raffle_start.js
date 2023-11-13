// import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'


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
      // const supabase = createServerSupabaseClient({req, res})
      // const {
      //   data: { session },
      // } = await supabase.auth.getSession()

        const user_info = await fetch(`${baseUrl}/findOne`, {
            ...fetchOptions,
            body: JSON.stringify({
              ...fetchBody,
              filter: {
                  twitter_id: req.body.twitter_id,
              }
            }),
        });
        const readUserInfo = (await user_info.json()).document;
        const finish_times = 24 * 60 * 60 * 1000 * 2;

        if (readUserInfo) {
            if (!readUserInfo.live) {
                return res.status(400).json({
                    status: "ERR",
                    massage: "already finsh!"
                })
            }
            else
        if (readUserInfo.postAt + finish_times > Date.now()) {
                return res.status(400).json({
                    status: "ERR",
                    massage: "the tweet didn't finish yet!"
                })
            }
        }else {
            return res.status(400).json({
                status: "ERR",
                massage: "Not found!"
              })
        }



        fetchBody.database = "raffle";
        fetchBody.collection = req.body.twitter_id;
        const readData = await fetch(`${baseUrl}/find`, {
            ...fetchOptions,
            body: JSON.stringify({
              ...fetchBody,
              limit: Number(req.query.limit),
              skip: Number(req.query.start),
            }),
          });
          const readDataJson = await readData.json();

          const addresses = readDataJson.documents;


          let winner;
          let number = 0;
          if (addresses) {
            if (addresses.length == 0) {

                winner = "there is no winner"

            } else if (addresses.length == 1) {
                winner = addresses[number]
    
            } else {
                
                number = Math.floor(Math.random() * addresses.length);

                winner = {
                    address: addresses[number].address,
                    name: addresses[number].name,
                };
            }
          } else {
            return res.status(400).json({
                status: "ERR",
                massage: "Not found!"
              })
          }

        fetchBody.database = "tweets";
        fetchBody.collection = "tweets";

        const updatepoint = await fetch(`${baseUrl}/updateOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            filter: { _id: { $oid: readUserInfo._id } },
            update: {
              $set: {
                winner: addresses[number] ? addresses[number].address : null,
                live: false,
                complete: false
              },
            },
          }),
        });

        await new Promise(f => setTimeout(f, 8000))


        const get_winner = await fetch(`${baseUrl}/findOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            filter: { _id: { $oid: readUserInfo._id } },
          }),
        });
        const get_winner_json = (await get_winner.json()).document;


        const real_winner = get_winner_json.winner


        if (real_winner !== "there is no winner") {

            const not = {
              project_image: req.body.image,
              info:"congrats you win in the raffle",
              seen:false,
              success:false,
              type:"winner",
              twitter_id: req.body.twitter_id,
              name: req.body.name,
            }

            fetchBody.collection = real_winner
            fetchBody.database = "Notification"

              const insertData = await fetch(`${baseUrl}/insertMany`, {
                  ...fetchOptions,
                  body: JSON.stringify({
                      ...fetchBody,
                      documents: [not],
                    }),
                });
                const insertDataJson = await insertData.json();
            }

        return res.status(200).json({
        status: "OK",
        winner: real_winner
        })

    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  }
  