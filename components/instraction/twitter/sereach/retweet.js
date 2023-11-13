export async function sereach_retweet() {
  const results = await fetch("/api/twitter/search/retweet", {
      method: "POST",
      body: JSON.stringify({
        query,
      }),
    })
  const json = await results.json()
  return json;
}