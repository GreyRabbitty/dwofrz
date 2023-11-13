import {accept} from "../../programs/ETH/accept"

export async function accept_items(
    data : any,
    signer: any,
    contract_address: string,
    owner: string
) {
    // try {

        
        const user_apply = await fetch(`/api/database?database=user_apply&collection=${data.owner}`)
        const user_applyJson = await user_apply.json();


        const hash = await accept(
            signer,
            contract_address,
            data.item_id
        );


    // await delete_data(data._id, "ETH", "waiting_tweet")
    // await delete_data(user_applyJson[0]._id, data.owner, "user_apply")


    const info = {
        info: "your application is accepted",
        seen: false,
        success: true,
        type: "apply"
    }

    data.postAt = Date.now()


    const res = await fetch("/api/program/eth/send_accept", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            txHash: hash,
            user: data.owner,
            _id: data._id,
            info,
            data
          }),
    })
    const res_json = await res.json()


    if (res_json.status == "ERR") {
        throw res_json.message
    }
}