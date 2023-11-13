const Web3 = require("web3");
const abi = require("../../../public/abi.json");

export async function claim(
    contract_address: string,
    signer: any,
    receiver: string,
) {
  const signature = await signer.signMessage(
    `
    Message: Welcome to Ragnarok!

    Click to sign in and accept the Dworfz Terms of Service: https://Dworfz.com

    This request will not trigger a blockchain transaction or cost any gas fees.

    you will Claim your D token now

    Wallet address: ${receiver}
    `
);


    const resp = await fetch("/api/program/eth/claim", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            contract_address,
            reword: 4,
            account: receiver,
            seg: signature
        })
      })
      const respj = await resp.json();
  

    const web3  = new Web3(window.ethereum);

    const contract = new web3.eth.Contract(abi, contract_address, {from: receiver});



    const _data = contract.methods.reward(respj.sign_tx.amount, respj.sign_tx.nonce, respj.sign_tx.signedParams.signature).encodeABI();

    const transactionParameters = {
        to: contract_address,
        from: receiver, 
        data: _data
     };

     const txHash = await window.ethereum!.request!({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
     });


     const result = await fetch("/api/program/eth/claim_send", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
        },
      body: JSON.stringify({
          txHash,
          amount: respj.sign_tx.amount,
          account: receiver,
     })
    });

    const json_result = await result.json();
    

    if (json_result.status === "ERR") {
      throw json_result.message
    }






      // let receipt: any;
      // while (!receipt) {
      //   receipt = await web3.eth.getTransactionReceipt(txHash);
      //   if (!receipt) {
      //     await new Promise(resolve => setTimeout(resolve, 5000)); // wait for 5 seconds
      //   }
      // }

      // let currentBlockNumber = await web3.eth.getBlockNumber();
      

      // while (receipt.blockNumber > currentBlockNumber - 4) {
      //   currentBlockNumber = await web3.eth.getBlockNumber();
      //   await new Promise(resolve => setTimeout(resolve, 5000)); // wait for 5 seconds
        
      // }




      // if (receipt.status == true) {
      // }else {
      // }




}