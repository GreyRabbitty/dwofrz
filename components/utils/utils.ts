import * as anchor from "@project-serum/anchor";
import * as splToken from "@solana/spl-token";
import * as sweb3 from "@solana/web3.js";

const CREATOR_OFFSET = 321;

export const truncate = (input: string, len: any) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export function getSolscanLink(address: string): string {
  return "https://solscan.io/address/" + address;
}

export const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

export interface TokenMetas {
  id: number;
  tokenAccount: sweb3.PublicKey;
  tokenAccountLamports: number;
  mint: sweb3.PublicKey;
  amount: number;
  creator?: sweb3.PublicKey;
  decimals?: number;
  metadataAccount?: sweb3.PublicKey;
  metadataAccountLamports?: number;
  masterEditionAccount?: sweb3.PublicKey;
  masterEditionAccountLamports?: number;
  collectionMetadataAccount?: sweb3.PublicKey;
  collectionMint?: sweb3.PublicKey;
  name?: string;
  url?: string;
  image?: string;
  type?: string;
}

export function countNFTs(tokens: TokenMetas[]): number {
  if (!tokens) return 0;
  return tokens.filter((t) => t.masterEditionAccount).length;
}

export async function findTokenAccounts(
  connection: sweb3.Connection,
  owner: sweb3.PublicKey,
  holder: boolean
): Promise<[TokenMetas[], boolean]> {
  const response = await connection.getTokenAccountsByOwner(owner, {
    programId: splToken.TOKEN_PROGRAM_ID,
  });
  let id = 0;
  const tokens: TokenMetas[] = [];
  for (let account of response.value) {
    const offsetInBytes = 2 * 32;
    let amount = 0;
    for (let i = 0; i < 8; i++) {
      amount += account.account.data[offsetInBytes + i] * 2 ** (i * 8);
    }

    if (amount >= 1) {
      const mint = new sweb3.PublicKey(account.account.data.slice(0, 32));
      const metadataPDA = await getMetadataPDA(mint);
      const metadataAccountInfo = await connection.getAccountInfo(metadataPDA);
      let creator;
      if (metadataAccountInfo) {
        creator = new sweb3.PublicKey(
          metadataAccountInfo!.data.slice(
            CREATOR_OFFSET + 1 + 4,
            CREATOR_OFFSET + 1 + 4 + 32
          )
        );
        if (
          creator.toBase58() == "7Pz5yfA3iQqQik39azMcw1ND9vBUF54MCNb4yBPTkTAD"
        ) {
          holder = true;
        }
      }

      const t: TokenMetas = {
        id,
        tokenAccount: account.pubkey,
        tokenAccountLamports: account.account.lamports,
        mint: mint,
        amount,
        creator,
      };
      tokens.push(t);
      id++;
      await populateMetadataInfo(connection, t); // eventually i want this in parallel but I don't know how to update ui properly
    }
  }
  return [tokens, holder];
}

async function getMetadataPDA(mint: anchor.web3.PublicKey) {
  const pdaInfo = await anchor.web3.PublicKey.findProgramAddress(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );
  const metadataPDA = pdaInfo[0];
  return metadataPDA;
}

async function populateMetadataInfo(
  connection: sweb3.Connection,
  tokenMetas: TokenMetas
) {
  const metadataPDA = await getMetadataPDA(tokenMetas.mint);

  const metadataAccountInfo = await connection.getAccountInfo(metadataPDA);

  if (metadataAccountInfo) {
    tokenMetas.metadataAccount = metadataPDA; // only set if actually exists
    tokenMetas.metadataAccountLamports = metadataAccountInfo.lamports;

    const nameBuffer = metadataAccountInfo.data.slice(
      1 + 32 + 32 + 4,
      1 + 32 + 32 + 4 + 32
    );
    const nameLenght = metadataAccountInfo.data.readUInt32LE(1 + 32 + 32);
    let name = "";
    for (let j = 0; j < nameLenght; j++) {
      if (nameBuffer.readUInt8(j) === 0) break;
      name += String.fromCharCode(nameBuffer.readUInt8(j));
    }
    tokenMetas.name = name;

    const URL_OFFSET = 1 + 32 + 32 + 36 + 14;
    const urlBuffer = metadataAccountInfo.data.slice(
      URL_OFFSET + 4,
      URL_OFFSET + 4 + 200
    );
    const urlLenght = metadataAccountInfo.data.readUInt32LE(URL_OFFSET);
    let extermalMetadataURI = "";
    for (let j = 0; j < urlLenght; j++) {
      if (urlBuffer.readUInt8(j) === 0) break;
      extermalMetadataURI += String.fromCharCode(urlBuffer.readUInt8(j));
    }
    if (extermalMetadataURI.length > 0) {
      tokenMetas.url = extermalMetadataURI;
    }

    fetchImageLink(tokenMetas);

    tokenMetas.collectionMint =
      getCollectionMintFromMetadataAccount(metadataAccountInfo);
    if (tokenMetas.collectionMint) {
      tokenMetas.collectionMetadataAccount = await getMetadataPDA(
        tokenMetas.collectionMint
      );
    }

    const editionPdaInfo = await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        tokenMetas.mint.toBuffer(),
        Buffer.from("edition"),
      ],
      TOKEN_METADATA_PROGRAM_ID
    );
    const editionPDA = editionPdaInfo[0];
    const masterEditionAccountInfo = await connection.getAccountInfo(
      editionPDA
    );

    if (masterEditionAccountInfo) {
      tokenMetas.masterEditionAccount = editionPDA; // only set if actually exists
      tokenMetas.masterEditionAccountLamports =
        masterEditionAccountInfo.lamports;
    }
  }
}

function getCollectionMintFromMetadataAccount(
  metadataAccountInfo: sweb3.AccountInfo<Buffer>
) {
  const CREATOR_SIZE = 32 + 1 + 1;

  const creatorsPresent = metadataAccountInfo.data[CREATOR_OFFSET];
  const creators = creatorsPresent
    ? metadataAccountInfo.data[CREATOR_OFFSET + 1]
    : 0; // we just need to read first of 4 bytes since creator length is max 5

  const enOffset =
    CREATOR_OFFSET +
    1 +
    (creatorsPresent ? 4 + CREATOR_SIZE * creators : 0) +
    2;
  const editionNoncePresent = metadataAccountInfo.data[enOffset];
  const tsOffset = enOffset + (editionNoncePresent ? 2 : 1);
  const tokenStandardPresent = metadataAccountInfo.data[tsOffset];

  const collectionOffset = tsOffset + (tokenStandardPresent ? 2 : 1);
  const collectionPresent = metadataAccountInfo.data[collectionOffset];
  if (!collectionPresent) return undefined;
  const verifiedCollection = metadataAccountInfo.data[collectionOffset + 1];
  const collectionMint = new sweb3.PublicKey(
    metadataAccountInfo.data.slice(
      collectionOffset + 2,
      collectionOffset + 2 + 32
    )
  );
  if (verifiedCollection) {
    return collectionMint;
  }

  return undefined;
}

async function fetchImageLink(token: TokenMetas) {
  if (!token.url) return;

  const response = await fetch(token.url, { method: "GET" });
  const data = await response.json();
  if (data["image"]) {
    token.image = data["image"];
  }

  return data;
}
