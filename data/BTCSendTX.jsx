import { createUnsecuredToken } from "jsontokens";
import { sendBtcTransaction } from "sats-connect";

const conversion = 100000000;

export const sendWithUni = async (amt, to) => {
  let network = await window.unisat.getNetwork();
  if (network === "testnet") {
    let res = await window.unisat.switchNetwork("livenet");
  }
  const amount = amt * conversion;
  console.log(amt, to);
  try {
    let txid = await window.unisat.sendBitcoin(to, amount);
    console.log(txid);
    return txid;
  } catch (e) {
    console.log(e);
  }
};

export const sendWithHiro = async (amt, to) => {
  const amount = amt * conversion;

  try {
    const resp = await window.btc?.request("sendTransfer", {
      address: to,
      amount: amount,
      network: "mainnet",
    });
    console.log(resp.result.txid);
    return resp;
  } catch (err) {
    console.log(err);
  } finally {
  }
};

export const sendWithXVerse = async (options) => {
  const sendBtcOptions = {
    payload: {
      network: {
        type: "Mainnet",
      },
      recipients: [
        {
          address: options.payload.recipientAddress,
          amountSats: options.payload.amountSats,
        },
      ],
      senderAddress: options.payload.userAddress,
    },
    onFinish: (response) => {
      options.payload.onFinish(response);
    },
    onCancel: () => alert("Canceled"),
  };
  await sendBtcTransaction(sendBtcOptions);
};

export const sendWithUniPlain = async (amt, to) => {
  let network = await window.unisat.getNetwork();
  if (network === "testnet") {
    let res = await window.unisat.switchNetwork("livenet");
  }
  try {
    let txid = await window.unisat.sendBitcoin(to, amt);
    console.log(txid);
    return txid;
  } catch (e) {
    console.log(e);
  }
};

export const sendWithHiroPlain = async (amt, to) => {
  try {
    let plainAmt = amt / conversion;
    const resp = await window.btc?.request("sendTransfer", {
      address: to,
      amount: amt,
      network: "mainnet",
    });
    console.log(resp.result.txid);
    return resp;
  } catch (err) {
    console.log(err);
  } finally {
  }
};

export const sendWithXVersePlain = async (options) => {
  const sendBtcOptions = {
    payload: {
      network: {
        type: "Mainnet",
      },
      recipients: [
        {
          address: options.payload.recipientAddress,
          amountSats: options.payload.amountSats,
        },
      ],
      senderAddress: options.payload.userAddress,
    },
    onFinish: (response) => {
      options.payload.onFinish(response);
    },
    onCancel: () => alert("Canceled"),
  };
  await sendBtcTransaction(sendBtcOptions);
};
