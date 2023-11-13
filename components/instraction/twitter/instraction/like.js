export async function instr_like(tweet_id) {
  const results = await fetch("/api/twitter/post/like", {
      method: "POST",
      body: JSON.stringify({
        tweet_id,
      }),
    });

    const json = results.json()
    return json;
}