import { ethers } from "ethers";
const abi = require("../../../public/abi.json");
const nft_abi = require("../../../public/nft_abi.json");
const token_abi = require("../../../public/erc20_abi.json");

export async function apply(
    signer: any,
    contract_address: string,
    token_id: number,
    nft: boolean,
    eth: boolean,
    amount: any,
    token: boolean,
    token_amount: any,
    token_address: string,
    bundle: any
    ) {



        let eth_reward = amount;
        let eth_payment: any = 0;
        let payment;

        if (bundle == "follow like comment retweet join discord") {
            if (eth) {
                eth_payment = 0.000 + Number(amount)
            } else {
                eth_payment = 0.000
            }
            payment = 1
        }
        else if (bundle == "like comment retweet join discord") {
            if (eth) {
                eth_payment = 0.000 + Number(amount)
    
            } else {
                eth_payment = 0.000
            }
            payment = 2
        }
        else if (bundle == "Like comment retweet") {
            if (eth) {
                eth_payment = 0.000 + Number(amount)
            } else {
                eth_payment = 0.000
            }
            payment = 3
        } else if (bundle == "Like comment retweet follow") {
            if (eth) {
                eth_payment = 0.000 + Number(amount)
            } else {
                eth_payment = 0.000
            }
            payment = 4 
        }

        eth_payment = Number(parseFloat((eth_payment)).toPrecision(12)).toFixed(10).replace(/\.?0+$/, "")
        eth_reward = Number(parseFloat((eth_reward)).toPrecision(12)).toFixed(10).replace(/\.?0+$/, "")
        
        

        token_amount = ethers.utils.parseEther(token_amount.toString());
        eth_payment = ethers.utils.parseEther(eth_payment.toString());
        eth_reward = ethers.utils.parseEther(eth_reward.toString());




    if (nft) {
        const nft_contract = new ethers.Contract(token_address, nft_abi, signer);
        await (await nft_contract.approve(contract_address, token_id)).wait();
    }

    if (token) {
        // abi is incorrect
        const token_contract = new ethers.Contract(token_address, token_abi, signer);
        await (await token_contract.approve(contract_address, token_amount)).wait();
    }

    const escrow_contract = new ethers.Contract(contract_address, abi, signer);

     const wow = await escrow_contract.makeItem(
        nft,
        token_address,
        token_id,
        payment,
        eth,
        eth_reward,
        token,
        token_amount,
        token_address,
        {
            value: eth_payment
        }
    )
        return wow.hash
}