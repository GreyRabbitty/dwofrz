import { ethers } from "ethers";
const abi = require("../../../public/abi.json");
const nft_abi = require("../../../public/nft_abi.json");

export async function refuse(
    signer: any,
    contract_address: string,
    item_id: number,
) {

    const contract = new ethers.Contract(contract_address, abi, signer);
    
    const hash = await contract.refuseItem(item_id)

    return hash.hash
}