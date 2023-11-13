export async function change_pfp_eth(
    address: string,
    pfp : any,
    signer: any,
    discord_id: string,
) {

    const signature = await signer.signMessage(
        `
        Message: Welcome to Ragnarok!

        Click to sign in and accept the Dworfz Terms of Service: https://Dworfz.com
    
        This request will not trigger a blockchain transaction or cost any gas fees.

        you will change you pfp now

        Wallet address: ${address}
        `
    );


    const resp = await fetch("/api/program/eth/pfp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            address,
            seg: signature,
            pfp,
            discord_id
       })
    })

    const resp_json = await resp.json();

}