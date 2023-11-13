export async function instr_retweet(tweet_id) {
  const results = await fetch("/api/twitter/post/retweet", {
      method: "POST",
      body: JSON.stringify({
        tweet_id,
      }),
    })
  const json = await results.json()
  return json;
}