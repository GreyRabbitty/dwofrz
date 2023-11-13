import {refuse} from "../../programs/ETH/refuse"

export async function cancel_item(
    data : any,
    signer: any,
    contract_address: string,
) {


    const hash = await refuse(signer, contract_address, data.item_id)

    const info = {
        info: "your application is refused",
        seen: false,
        success: false,
        type: "apply"
    }

    const response = await fetch("/api/program/eth/send_refuse", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            data,
            txHash: hash,
            user: data.owner,
            info,
            _id: data._id
          }),
    })

    const res_json = await response.json();


    if (res_json.status == "ERR") {
        throw res_json.message
    }


}