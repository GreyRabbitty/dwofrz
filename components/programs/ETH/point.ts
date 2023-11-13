import { ethers } from "ethers";
const abi = require("../../../public/abi.json");

export async function point (
    receiver: string,
    contract_address: string,
    reword: number,
    interact: number,
    data_id: string,
    twitter_id: string,
    data: any,
    signeture: any,
    discord_id: string,
    name: string,
    image: string,
    raffle_time: any,
    reword_type: string,
    reword_amount: number,
    reword_name: string,
) {
    const resp = await fetch("/api/program/eth/build_eth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            receiver,
            contract_address,
            reword,
            interact,
            twitter_id,
            _id : data_id,
            data,
            signeture,
            discord_id,
            name,
            image,
            raffle_time,
            reword_type,
            reword_amount,
            reword_name,
        })
    });

    const js = await resp.json();
    if (js.status == "ERR") {
        throw js.massage;
    }

    // const provider = ethers.getDefaultProvider("https://late-tame-arrow.ethereum-goerli.quiknode.pro/e86d0d661e152299fa228daa3f4fba73e2bd01a1/");

    // const signer = new ethers.Wallet(keyJson, provider);
    // const contract = new ethers.Contract(contract_address, abi, signer);
    // // need receiver
    // await (await contract.reward(reword, receiver)).wait();

}