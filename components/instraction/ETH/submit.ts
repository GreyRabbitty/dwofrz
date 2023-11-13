import {apply} from "../../programs/ETH/submit"

export async function submit_eth(
    address: string,
    signer: any,
    contract_address: string,
    token_id: number,
    twitter_id: number,
    name: string,
    discord_constact: string | undefined,
    discord_url: string | undefined,
    twitter_url: string,
    network: string,
    bundle: string,
    discription: string,
    featured_tweet: boolean,
    amount: number,
    token_address: string,
    token: string,
    is_nft: boolean,
    server_id: string | undefined,
    nft_name: string,
    project_image: string
    ) {
        let eth = false;
        let erc20 = false;
        let nft = false;
        let token_amount = 0;

        if (token == "ETH") {
            eth = true;
        }
        else if (is_nft) {
            token_amount = 1;
            nft = true;
        }
        else if (!is_nft) {
            token_amount = amount;
            erc20 = true
        }



    const  txHash = await apply(
       signer,
       contract_address,
       token_id,
       nft,
       eth,
       amount,
       erc20,
       token_amount,
       token_address,
       bundle
    );





    const data = {
        item_id: 0,
        owner: address,
        postAt: Date.now(),
        twitter_id: twitter_id,
        name: name,
        discord_constact: discord_constact,
        discord_url: discord_url,
        twitter_url:twitter_url,
        network: network,
        token_address: token,
        bundle: bundle,
        discription: discription,
        featured_tweet: featured_tweet,
        eth_amount: amount,
        native_coin: eth,
        token_name: token,
        token_amount: token_amount,
        nft: nft,
        nft_address: token_address,
        token_id: token_id,
        server_id: server_id,
        project_image: project_image,
        nft_name: nft_name,
        winner: null,
        live: true,
        interact: 0,
        live_holder: true
    };


    const response = await fetch("api/program/eth/send_submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            txHash,
            data,
            user: address,
          }),
    })

    const respJson = await response.json();
    if (respJson.status == "ERR") {
        throw respJson.message
    }




}