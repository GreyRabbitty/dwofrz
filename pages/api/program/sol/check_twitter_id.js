export default async function handle(req, res) {

  // console.log('================== api / program / sol / send_accept ===================');

  try {
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
      database: "waiting_tweet",
      collection: "solana",
    };

    const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;

    const twitter_id = req.body.data;

      const deleteData = await fetch(`${baseUrl}/deleteOne`, {
        ...fetchOptions,
        body: JSON.stringify({
          ...fetchBody,
          filter: { _id: { $oid: req.body._id } },
        }),
      });
      const deleteDataJson = await deleteData.json();

      // console.log(' >>>>>>>> Data API deleteOne done, deleteDataJson ====> ', deleteDataJson);

      fetchBody.database = "user_apply";
      fetchBody.collection = req.body.userb;

      // console.log(' >>>>>>>> Data API updateOne doing ');

      // console.log('fetchOptions ===> ', fetchOptions);
      // console.log('fetchBody ===> ', fetchBody);
      // console.log('baseUrl ===> ', baseUrl);
      // console.log('_id ===> ', data.user_id);

      const user_info = await fetch(`${baseUrl}/updateOne`, {
        ...fetchOptions,
        body: JSON.stringify({
          ...fetchBody,
          filter: { _id: { $oid: data.user_id } },
          update: {
            $set: {
              approve: true,
              postAt: Date.now(),
            },
          },
        }),
      });

      const readUserInfo = await user_info.json();

      const info = req.body.info;

      fetchBody.database = "tweets";
      fetchBody.collection = "tweets";

      delete data._id;
      data.postAt = Date.now();

      const insertData = await fetch(`${baseUrl}/insertMany`, {
        ...fetchOptions,
        body: JSON.stringify({
          ...fetchBody,
          documents: [data],
        }),
      });
      const insertDataJson = await insertData.json();

      // console.log(' >>>>>>>> Data API insertMany done, insertDataJson ====> ', insertDataJson);

      fetchBody.database = "Notification";
      fetchBody.collection = req.body.userb;

      // // insert user data

      // console.log(' >>>>>>>> Data API insertMany doing ');

      // console.log('fetchOptions ===> ', fetchOptions);
      // console.log('fetchBody ===> ', fetchBody);
      // console.log('baseUrl ===> ', baseUrl);
      // console.log('data ===> ', data);

      const insertData_user = await fetch(`${baseUrl}/insertMany`, {
        ...fetchOptions,
        body: JSON.stringify({
          ...fetchBody,
          documents: [info],
        }),
      });

      // console.log(' >>>>>>>> Data API insertMany done, insertData_user ====> ', insertData_user);

      if (data.native_coin) {
        switch (data.bundle) {
          case "Like comment retweet":
            Like_retweet_comment(data);
            break;
          case "like comment retweet join discord":
            Like_retweet_comment_discord(data);
            break;
          case "Like comment retweet follow":
            Like_retweet_comment_follow(data);
            break;
          case "follow like comment retweet join discord":
            Like_retweet_comment_follow_discord(data);
            break;
          default:
            break;
        }
      } else {
        switch (data.bundle) {
          case "Like comment retweet":
            Nlike_retweet_comment(data);
            break;
          case "like comment retweet join discord":
            Nlike_retweet_comment_discord(data);
            break;
          case "Like comment retweet follow":
            Nlike_retweet_comment_follow(data);
            break;
          case "follow like comment retweet join discord":
            Nlike_retweet_comment_follow_discord(data);
            break;
          default:
            break;
        }
      }

      res.status(200).json({
        // hash: hash,
        insertData: insertDataJson,
        insertDataJson_user: insertDataJson_user,
        deleteDataJson: deleteDataJson,
        updateData: updateDataJson,
        readUserInfo: readUserInfo,
        insertData_user: insertData_user
      });
    // }
  } catch (e) {
    // console.log(e);
    res.status(500).json(e);
  }
}
