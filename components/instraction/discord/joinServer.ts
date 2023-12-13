export async function joinDiscordServer(
    guildId:string,
    userId:string,
    accessToken: string
) {

    console.log('accessToken ==> ', {guildId, userId, accessToken});
    const res = await fetch("/api/discord", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            guildId,
            userId,
            accessToken
          })
    })

    const hashJson = await res.json();

}
