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
        // if (readUserInfo) {
        //     if (!readUserInfo.live_holder) {
        //         return res.status(400).json({
        //             status: "ERR",
        //             massage: "already finsh!"
        //         })
        //     }
        //     else
        // if (readUserInfo.postAt + finish_times > Date.now()) {
        //         return res.status(400).json({
        //             status: "ERR",
        //             massage: "the tweet didn't finish yet!"
        //         })
        //     }
        // }else {
        //     return res.status(400).json({
        //         status: "ERR",
        //         massage: "Not found!"
        //       })
        // }



        // fetchBody.database = "holder_raffle";
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

          const winners = []
          let number = 0;
          if (addresses) {
            if (addresses.length == 0) {

            } else if (addresses.length == 1) {
                let winner = addresses[number]
                winners.push(winner);
            } else {
                const randoms = [];
                while (randoms.length <= 3)  {
                  number = Math.floor(Math.random() * addresses.length);
                  if (randoms.length == 0) {
                    randoms.push(number);
                  } else {
                    let push = true;
                    randoms.map((num) => {
                      if (num == number) {
                        push = false
                      }
                    })
                    if (push) {
                      randoms.push(number);
                    }
                  }
                }
                for (let i = 0; i < 3; i++) {
                  let winner = {
                    address: addresses[randoms[i]].address,
                    name: addresses[randoms[i]].name,
                    twitter: addresses[randoms[i]].twitter_id
                  };
                  winners.push(winner);
                }
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
                winner_holder: winners,
                live_holder: false,
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


        const real_winner = get_winner_json.winner_holder

        
        // winners.map( async (win) => {
        //     const not = {
        //       project_image: req.body.image,
        //       info:"congrats you win in the raffle",
        //       seen:false,
        //       success:false,
        //       type:"winner",
        //       twitter_id: win.twitter,
        //       name: win.name,
        //     }

        //       fetchBody.collection = win.twitter
        //       fetchBody.database = "Notification"
        //       const insertData = await fetch(`${baseUrl}/insertMany`, {
        //         ...fetchOptions,
        //         body: JSON.stringify({
        //           ...fetchBody,
        //           documents: [not],
        //         }),
        //       });
        //       const insertDataJson = await insertData.json();
        //     })

        return res.status(200).json({
        status: "OK",
        winner: winners
        })

    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  }
  