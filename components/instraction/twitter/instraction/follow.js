export async function instr_follow(twitter_name) {
  const results = await fetch("/api/twitter/post/follow", {
      method: "POST",
      body: JSON.stringify({
        twitter_name,
      }),
    })
    
    const json = await results.json()
    return json;
  }