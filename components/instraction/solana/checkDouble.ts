export async function submit(
    twitter_id: number,
) {
    
    const resp = await fetch("/api/program/sol/check_twitter_id", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            twitter_id
        }),
    });

    const hashJson = await resp.json();

    if (hashJson.status === "ERR") {
        throw hashJson.message
    }


}