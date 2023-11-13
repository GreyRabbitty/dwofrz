
export async function sol_not(
    address: string,
    read : boolean,
    _id: string
) {
 
 
        const resp = await fetch("/api/database/notification", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                address,
                // seg: bs58.encode(signature),
                read,
                _id
           })
        });

        const rspj = await resp.json();
        if (rspj.status == "ERR") {
            throw rspj.massage
        }
}