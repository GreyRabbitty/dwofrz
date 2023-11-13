import axios from "axios";
import {
  ADD_PANDORA,
  ADMIN_LOGIN,
  BASE_URL,
  GET_PANDORA,
  GET_PANDORAS,
  SET_MINT,
  SPIN,
} from "./pandora_apis";

// For all Pandoras, will filter through expired/sold-out
export const getPandoras = (
  setVerifiedPandoras,
  setUnverifiedPandoras,
  setIsLoading
) => {
  axios
    .get(BASE_URL + GET_PANDORAS)
    .then((res) => {
      const filtaredData = res.data.filter((item) => item.id !== "count");
      const verified = filtaredData.filter((item) => item.verified);
      const unverified = filtaredData.filter((item) => !item.verified);

      setVerifiedPandoras(verified);
      setUnverifiedPandoras(unverified);
      setIsLoading(false);
    })
    .catch((error) => {
      setIsLoading(false);
    });
};

// For Single Pandora Page Before Mint and During Mint for extra details
export const getPandora = async (id) => {
  const pandora = await axios.get(BASE_URL + GET_PANDORA + `${id}`);
  return pandora;
};

// Generates a 3x3 board displaying the outcome
export const spinPandora = (outcome = "1") => {
  const data = {
    number: outcome,
  };

  const spin = axios.post(BASE_URL + SPIN, data);
  return spin;
};

// STAFF/ADMIN - Adding Pandora to database
export const addPandora = (
  name,
  limit,
  price,
  date,
  img = "",
  address,
  ata
) => {
  const data = {
    address: address,
    collection_name: name,
    collection_limit: limit,
    preview_img: img,
    mint_date: date,
    verified: true,
    associated_token_account: ata,
    chain: "SOL",
    price: price,
  };

  axios.post(BASE_URL + ADD_PANDORA, data).then((res) => {
    return res;
  });
};

// ADMIN - Sets Pandora to Minting State
export const setPandoraMinting = (id, state) => {
  const data = {
    id: id,
    state: state,
  };

  axios.post(BASE_URL + SET_MINT, data).then((res) => console.log(res));
};

// ADMIN - Log-in verification for Admin page
export const adminLogin = (user, pass) => {
  const data = {
    username: user,
    password: pass,
  };

  axios.post(BASE_URL + ADMIN_LOGIN, data).then((res) => {
    return res;
  });
};
