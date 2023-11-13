import { web3 } from '@project-serum/anchor';
export const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID: web3.PublicKey = new web3.PublicKey(
    'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
  );

export const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
  );
export const STAKE_ENTRY_PREFIX = "stake-entry";
export const STAKE_POOL_PREFIX = "stake-pool";
export const IDENTIFIER_PREFIX = "identifier";
export const REWARD_DISTRIBUTOR_SEED = "reward-distributor";
export const REWARD_ENTRY_SEED = "reward-entry";

export const sysvar_rant_pubkey: web3.PublicKey = new web3.PublicKey(
    'SysvarRent111111111111111111111111111111111',
  );
export const auth_rule_program: web3.PublicKey = new web3.PublicKey(
    'auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg',
  );