export async function complete_tweet(
    id : string,
) {

    const resp = await fetch("/api/database/complete_tweet", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify({
            id,
        })
    })

    const rspj = await resp.json();

    if (rspj.status == "ERR") {
        throw rspj.massage
    }
}