export async function sereach_tweet(id) {
  const result = await fetch("/api/twitter/search/_tweet", {
      method: "POST",
      body: JSON.stringify({
        id,
      }),
    })
  const json = await result.json()
  return json;
}