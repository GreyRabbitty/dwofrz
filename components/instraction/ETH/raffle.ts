import {point} from "../../programs/ETH/point"

export async function eth_raffle(
    contract_address: string,
    data : any,
    signer: any,
    twitter_id: string,
    data_id: string,
    intract: number,
    reward: number,
    receiver: string,
    discord_id: string,
    name: string,
    image: string,
    raffle_time: any,
    reword_type: string,
    reword_amount: number,
    reword_name: string,
) {

    // try {

    const dt = {
        interact: intract + 1
    }

    const signeture = await signer.signMessage(
        `
        Message: Welcome to Ragnarok!

        Click to sign in and accept the Dworfz Terms of Service: https://Dworfz.com
    
        This request will not trigger a blockchain transaction or cost any gas fees.

        you will chenge you pfp now

        Wallet address: ${receiver}
        `
    );

    point(
        receiver,
        contract_address,
        reward,
        intract,
        data_id,
        twitter_id,
        data,
        signeture,
        discord_id,
        name,
        image,
        raffle_time,
        reword_type,
        reword_amount,
        reword_name
    );

}