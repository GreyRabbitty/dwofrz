export async function instr_postTweet(replay) {
  const results = await fetch("/api/twitter/post/postTweet", {
      method: "POST",
      body: JSON.stringify({
        replay,
      }),
    })
    
    const json = await results.json();

    console.log('following ==> ', json);
    return json;
  }