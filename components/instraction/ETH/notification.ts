export async function eth_not(
    address: string,
    read : boolean,
    _id: string,
    // signer: any,
    // discord_id: string,
) {

    // const signature = await signer.signMessage(
    //     `
    //     Message: Welcome to Ragnarok!

    //     Click to sign in and accept the Dworfz Terms of Service: https://Dworfz.com
    
    //     This request will not trigger a blockchain transaction or cost any gas fees.

    //     you will chenge you pfp now

    //     Wallet address: ${address}
    //     `
    // );


    const resp = await fetch("/api/database/notification", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            address,
            // seg: signature,
            read,
            _id
       })
    })

    const resp_json = await resp.json();

}