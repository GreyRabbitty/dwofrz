export async function instr_tweet(
  status,
  in_reply_to_status_id,
  auto_populate_reply_metadata
  ) {
    const results = await fetch("/api/twitter/post/tweet", {
        method: "POST",
        body: JSON.stringify({
          status,
          in_reply_to_status_id,
          auto_populate_reply_metadata,
        }),
      })
      const json = results.json()
      return json;
}