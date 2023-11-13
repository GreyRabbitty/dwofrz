export async function eth_not_all(
    address: string,
    read : boolean,
    // signer: any,
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


    const resp = await fetch("/api/database/read_all_not", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            address,
            // seg: signature,
            read,
       })
    })

    const resp_json = await resp.json();

}