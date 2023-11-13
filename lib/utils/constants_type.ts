import type { Idl } from "@coral-xyz/anchor";
import type {
  AllAccountsMap,
  IdlTypes,
  TypeDef,
} from "@coral-xyz/anchor/dist/cjs/program/namespace/types";
import { CardinalStakePool } from "./IDL";


export type StakeEntryData = ParsedIdlAccountData<
  "StakeEntry",
  CardinalStakePool
>;

export type RewardEntryData = ParsedIdlAccountData<
  "RewardEntry",
  CardinalStakePool
>;

export type ParsedIdlAccountData<
  T extends keyof AllAccountsMap<IDL>,
  IDL extends Idl
> = TypeDef<AllAccountsMap<IDL>[T], IdlTypes<IDL>>;
