export async function raff(
    twitter_id: string,
    name: string,
    signal: any,
    image: string
) {

    console.log('raffle started ===> ', {
        twitter_id,
        name,
        signal,
        image
    })

    const resp = await fetch("/api/database/raffle_start", {
        signal: signal,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify({
            twitter_id,
            name,
            image
        })
    });

    const rspj = await resp.json();
    if (rspj.status == "ERR") {
        throw rspj.massage
    }
    console.log('MiddleWare rspj ===>', rspj.winner);
    return rspj.winner
}