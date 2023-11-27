import {
  BN, web3
} from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(
  'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
);

export function token_record(
  associeted_token_account: web3.PublicKey,
  mint: web3.PublicKey,
  ) {


    // const [master_edition] = await web3.PublicKey.findProgramAddress(
    //     [
    //       Buffer.from('metadata'),
    //       TOKEN_METADATA_PROGRAM_ID.toBuffer(),
    //       mint.toBuffer(),
    //       Buffer.from('edition'),
    //     ],
    //     TOKEN_METADATA_PROGRAM_ID
    //   );


      // const [metadata_acount] = await web3.PublicKey.findProgramAddress(
      //   [
      //     Buffer.from('metadata'),
      //     TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      //     mint.toBuffer(),
      //   ],
      //   TOKEN_METADATA_PROGRAM_ID
      // );


    //     // console.log(address)
    //   const [associeted_token_account] = await web3.PublicKey.findProgramAddress(
    //     [
    //         address.toBuffer(),
    //         TOKEN_PROGRAM_ID.toBuffer(),
    //         mint.toBuffer(),
    //     ],
    //     SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    // );


    const [record_account] = web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from('metadata'),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
        Buffer.from('token_record'),
        associeted_token_account.toBuffer()
      ],
      TOKEN_METADATA_PROGRAM_ID
    );


    return  record_account;
    }