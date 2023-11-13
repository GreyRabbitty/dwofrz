export async function get_followers(screen_name: string, signal: any) {
  try {
    const followers = await fetch("/api/twitter/search/get_follower", {
        signal: signal,
        method: "POST",
        body: JSON.stringify({
          screen_name,
        }),
    });

    const followers_json = await followers.json();
    return followers_json.data;
  }catch(e) {
  }
}