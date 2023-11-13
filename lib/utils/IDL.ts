export type CardinalStakePool = 
{
    version: "0.1.0",
    name: "staking",
    instructions: [
      {
        name: "initStakePool",
        accounts: [
          {
            name: "stakePool",
            isMut: true,
            isSigner: false
          },
          {
            name: "identifier",
            isMut: true,
            isSigner: false
          },
          {
            name: "payer",
            isMut: true,
            isSigner: true
          },
          {
            name: "systemProgram",
            isMut: false,
            isSigner: false
          }
        ],
        args: [
          {
            name: "ix",
            type: {
              defined: "InitPoolIx"
            }
          }
        ]
      },
      {
        name: "initIdentifier",
        accounts: [
          {
            name: "identifier",
            isMut: true,
            isSigner: false
          },
          {
            name: "payer",
            isMut: true,
            isSigner: true
          },
          {
            name: "systemProgram",
            isMut: false,
            isSigner: false
          }
        ],
        args: []
      },
      {
        name: "updateStakePool",
        accounts: [
          {
            name: "stakePool",
            isMut: true,
            isSigner: false
          },
          {
            name: "payer",
            isMut: true,
            isSigner: true
          }
        ],
        args: [
          {
            name: "ix",
            type: {
              defined: "UpdatePoolIx"
            }
          }
        ]
      },
      {
        name: "closeStakePool",
        accounts: [
          {
            name: "stakePool",
            isMut: true,
            isSigner: false
          },
          {
            name: "authority",
            isMut: true,
            isSigner: true
          }
        ],
        args: []
      },
      {
        name: "initEntry",
        accounts: [
          {
            name: "stakeEntry",
            isMut: true,
            isSigner: false
          },
          {
            name: "stakePool",
            isMut: true,
            isSigner: false
          },
          {
            name: "originalMint",
            isMut: false,
            isSigner: false
          },
          {
            name: "originalMintMetadata",
            isMut: false,
            isSigner: false
          },
          {
            name: "payer",
            isMut: true,
            isSigner: true
          },
          {
            name: "systemProgram",
            isMut: false,
            isSigner: false
          }
        ],
        args: []
      },
      {
        name: "stake",
        accounts: [
          {
            name: "stakeEntry",
            isMut: true,
            isSigner: false
          },
          {
            name: "stakePool",
            isMut: true,
            isSigner: false
          },
          {
            name: "originalMint",
            isMut: false,
            isSigner: false
          },
          {
            name: "originalMintTokenAccount",
            isMut: true,
            isSigner: false
          },
          {
            name: "userOriginalMintTokenRecord",
            isMut: true,
            isSigner: false
          },
          {
            name: "user",
            isMut: true,
            isSigner: true
          },
          {
            name: "mintMetadata",
            isMut: true,
            isSigner: false
          },
          {
            name: "mintEdition",
            isMut: false,
            isSigner: false
          },
          {
            name: "authorizationRules",
            isMut: false,
            isSigner: false
          },
          {
            name: "sysvarInstructions",
            isMut: false,
            isSigner: false
          },
          {
            name: "tokenMetadataProgram",
            isMut: false,
            isSigner: false
          },
          {
            name: "authorizationRulesProgram",
            isMut: false,
            isSigner: false
          },
          {
            name: "tokenProgram",
            isMut: false,
            isSigner: false
          },
          {
            name: "systemProgram",
            isMut: false,
            isSigner: false
          }
        ],
        args: []
      },
      {
        name: "unstake",
        accounts: [
          {
            name: "stakeEntry",
            isMut: true,
            isSigner: false
          },
          {
            name: "rewardEntry",
            isMut: true,
            isSigner: false
          },
          {
            name: "stakePool",
            isMut: true,
            isSigner: false
          },
          {
            name: "originalMint",
            isMut: false,
            isSigner: false
          },
          {
            name: "user",
            isMut: true,
            isSigner: true
          },
          {
            name: "userOriginalMintTokenAccount",
            isMut: true,
            isSigner: false
          },
          {
            name: "userOriginalMintTokenRecord",
            isMut: true,
            isSigner: false
          },
          {
            name: "mintMetadata",
            isMut: true,
            isSigner: false
          },
          {
            name: "mintEdition",
            isMut: false,
            isSigner: false
          },
          {
            name: "authorizationRules",
            isMut: false,
            isSigner: false
          },
          {
            name: "sysvarInstructions",
            isMut: false,
            isSigner: false
          },
          {
            name: "tokenProgram",
            isMut: false,
            isSigner: false
          },
          {
            name: "tokenMetadataProgram",
            isMut: false,
            isSigner: false
          },
          {
            name: "authorizationRulesProgram",
            isMut: false,
            isSigner: false
          },
          {
            name: "systemProgram",
            isMut: false,
            isSigner: false
          }
        ],
        args: []
      },
      {
        name: "updateTotalStakeSeconds",
        accounts: [
          {
            name: "stakeEntry",
            isMut: true,
            isSigner: false
          },
          {
            name: "lastStaker",
            isMut: true,
            isSigner: true
          }
        ],
        args: []
      },
      {
        name: "initRewardDistributors",
        accounts: [
          {
            name: "rewardDistributor",
            isMut: true,
            isSigner: false
          },
          {
            name: "stakePool",
            isMut: false,
            isSigner: false
          },
          {
            name: "rewardMint",
            isMut: true,
            isSigner: false
          },
          {
            name: "authority",
            isMut: true,
            isSigner: true
          },
          {
            name: "payer",
            isMut: true,
            isSigner: true
          },
          {
            name: "tokenProgram",
            isMut: false,
            isSigner: false
          },
          {
            name: "systemProgram",
            isMut: false,
            isSigner: false
          }
        ],
        args: [
          {
            name: "ix",
            type: {
              defined: "InitRewardDistributorIx"
            }
          }
        ]
      },
      {
        name: "initRewardEntry",
        accounts: [
          {
            name: "rewardEntry",
            isMut: true,
            isSigner: false
          },
          {
            name: "stakeEntry",
            isMut: false,
            isSigner: false
          },
          {
            name: "rewardDistributor",
            isMut: true,
            isSigner: false
          },
          {
            name: "payer",
            isMut: true,
            isSigner: true
          },
          {
            name: "systemProgram",
            isMut: false,
            isSigner: false
          }
        ],
        args: []
      },
      {
        name: "updateRewardDistributor",
        accounts: [
          {
            name: "rewardDistributor",
            isMut: true,
            isSigner: false
          },
          {
            name: "authority",
            isMut: false,
            isSigner: true
          }
        ],
        args: [
          {
            name: "ix",
            type: {
              defined: "UpdateRewardDistributorIx"
            }
          }
        ]
      },
      {
        name: "updateRewardEntry",
        accounts: [
          {
            name: "rewardEntry",
            isMut: true,
            isSigner: false
          },
          {
            name: "rewardDistributor",
            isMut: false,
            isSigner: false
          },
          {
            name: "authority",
            isMut: false,
            isSigner: true
          }
        ],
        args: [
          {
            name: "ix",
            type: {
              defined: "UpdateRewardEntryIx"
            }
          }
        ]
      },
      {
        name: "reclaimFund",
        accounts: [
          {
            name: "rewardDistributor",
            isMut: true,
            isSigner: false
          },
          {
            name: "rewardDistributorTokenAccount",
            isMut: true,
            isSigner: false
          },
          {
            name: "authorityTokenAccount",
            isMut: true,
            isSigner: false
          },
          {
            name: "authority",
            isMut: true,
            isSigner: true
          },
          {
            name: "tokenProgram",
            isMut: false,
            isSigner: false
          }
        ],
        args: [
          {
            name: "amount",
            type: "u64"
          }
        ]
      },
      {
        name: "claim",
        accounts: [
          {
            name: "rewardEntry",
            isMut: true,
            isSigner: false
          },
          {
            name: "rewardDistributor",
            isMut: true,
            isSigner: false
          },
          {
            name: "stakeEntry",
            isMut: false,
            isSigner: false
          },
          {
            name: "stakePool",
            isMut: false,
            isSigner: false
          },
          {
            name: "rewardMint",
            isMut: true,
            isSigner: false
          },
          {
            name: "userRewardMintTokenAccount",
            isMut: true,
            isSigner: false
          },
          {
            name: "rewardManager",
            isMut: true,
            isSigner: false
          },
          {
            name: "user",
            isMut: true,
            isSigner: true
          },
          {
            name: "tokenProgram",
            isMut: false,
            isSigner: false
          },
          {
            name: "systemProgram",
            isMut: false,
            isSigner: false
          }
        ],
        args: []
      }
    ],
    accounts: [
      {
        name: "StakeEntry",
        type: {
          kind: "struct",
          fields: [
            {
              name: "bump",
              type: "u8"
            },
            {
              name: "pool",
              type: "publicKey"
            },
            {
              name: "originalMint",
              type: "publicKey"
            },
            {
              name: "originalMintClaimed",
              type: "bool"
            },
            {
              name: "staker",
              type: "publicKey"
            },
            {
              name: "lastStakedAt",
              type: "i64"
            },
            {
              name: "totalStakeSeconds",
              type: "u128"
            },
            {
              name: "stakeMintClaimed",
              type: "bool"
            },
            {
              name: "kind",
              type: "u8"
            },
            {
              name: "stakeMint",
              type: {
                option: "publicKey"
              }
            },
            {
              name: "cooldownStartSeconds",
              type: {
                option: "i64"
              }
            },
            {
              name: "lastUpdatedAt",
              type: {
                option: "i64"
              }
            }
          ]
        }
      },
      {
        name: "StakePool",
        type: {
          kind: "struct",
          fields: [
            {
              name: "bump",
              type: "u8"
            },
            {
              name: "identifier",
              type: "u64"
            },
            {
              name: "authority",
              type: "publicKey"
            },
            {
              name: "requiresCreators",
              type: {
                vec: "publicKey"
              }
            },
            {
              name: "requiresCollections",
              type: {
                vec: "publicKey"
              }
            },
            {
              name: "requiresAuthorization",
              type: "bool"
            },
            {
              name: "overlayText",
              type: "string"
            },
            {
              name: "imageUri",
              type: "string"
            },
            {
              name: "resetOnStake",
              type: "bool"
            },
            {
              name: "totalStaked",
              type: "u32"
            },
            {
              name: "cooldownSeconds",
              type: {
                option: "u32"
              }
            },
            {
              name: "minStakeSeconds",
              type: {
                option: "u32"
              }
            },
            {
              name: "endDate",
              type: {
                option: "i64"
              }
            },
            {
              name: "doubleOrResetEnabled",
              type: {
                option: "bool"
              }
            }
          ]
        }
      },
      {
        name: "RewardEntry",
        type: {
          kind: "struct",
          fields: [
            {
              name: "bump",
              type: "u8"
            },
            {
              name: "stakeEntry",
              type: "publicKey"
            },
            {
              name: "rewardDistributor",
              type: "publicKey"
            },
            {
              name: "rewardSecondsReceived",
              type: "u128"
            },
            {
              name: "multiplier",
              type: "u64"
            }
          ]
        }
      },
      {
        name: "Identifier",
        type: {
          kind: "struct",
          fields: [
            {
              name: "bump",
              type: "u8"
            },
            {
              name: "count",
              type: "u64"
            }
          ]
        }
      },
      {
        name: "RewardDistributor",
        type: {
          kind: "struct",
          fields: [
            {
              name: "bump",
              type: "u8"
            },
            {
              name: "stakePool",
              type: "publicKey"
            },
            {
              name: "kind",
              type: "u8"
            },
            {
              name: "authority",
              type: "publicKey"
            },
            {
              name: "rewardMint",
              type: "publicKey"
            },
            {
              name: "rewardAmount",
              type: "u64"
            },
            {
              name: "rewardDurationSeconds",
              type: "u128"
            },
            {
              name: "rewardsIssued",
              type: "u128"
            },
            {
              name: "maxSupply",
              type: {
                option: "u64"
              }
            },
            {
              name: "defaultMultiplier",
              type: "u64"
            },
            {
              name: "multiplierDecimals",
              type: "u8"
            },
            {
              name: "maxRewardSecondsReceived",
              type: {
                option: "u128"
              }
            }
          ]
        }
      },
      {
        name: "TokenManager",
        type: {
          kind: "struct",
          fields: [
            {
              name: "version",
              type: "u8"
            },
            {
              name: "bump",
              type: "u8"
            }
          ]
        }
      }
    ],
    fields: [
      {
        name: "InitRewardDistributorIx",
        type: {
          kind: "struct",
          fields: [
            {
              name: "rewardAmount",
              type: "u64"
            },
            {
              name: "rewardDurationSeconds",
              type: "u128"
            },
            {
              name: "kind",
              type: "u8"
            },
            {
              name: "supply",
              type: {
                option: "u64"
              }
            },
            {
              name: "maxSupply",
              type: {
                option: "u64"
              }
            },
            {
              name: "defaultMultiplier",
              type: {
                option: "u64"
              }
            },
            {
              name: "multiplierDecimals",
              type: {
                option: "u8"
              }
            },
            {
              name: "maxRewardSecondsReceived",
              type: {
                option: "u128"
              }
            }
          ]
        }
      },
      {
        name: "UpdateRewardDistributorIx",
        type: {
          kind: "struct",
          fields: [
            {
              name: "defaultMultiplier",
              type: "u64"
            },
            {
              name: "multiplierDecimals",
              type: "u8"
            },
            {
              name: "rewardAmount",
              type: "u64"
            },
            {
              name: "rewardDurationSeconds",
              type: "u128"
            },
            {
              name: "maxRewardSecondsReceived",
              type: {
                option: "u128"
              }
            }
          ]
        }
      },
      {
        name: "UpdateRewardEntryIx",
        type: {
          kind: "struct",
          fields: [
            {
              name: "multiplier",
              type: "u64"
            }
          ]
        }
      },
      {
        name: "InitPoolIx",
        type: {
          kind: "struct",
          fields: [
            {
              name: "overlayText",
              type: "string"
            },
            {
              name: "imageUri",
              type: "string"
            },
            {
              name: "requiresCollections",
              type: {
                vec: "publicKey"
              }
            },
            {
              name: "requiresCreators",
              type: {
                vec: "publicKey"
              }
            },
            {
              name: "requiresAuthorization",
              type: "bool"
            },
            {
              name: "authority",
              type: "publicKey"
            },
            {
              name: "resetOnStake",
              type: "bool"
            },
            {
              name: "cooldownSeconds",
              type: {
                option: "u32"
              }
            },
            {
              name: "minStakeSeconds",
              type: {
                option: "u32"
              }
            },
            {
              name: "endDate",
              type: {
                option: "i64"
              }
            },
            {
              name: "doubleOrResetEnabled",
              type: {
                option: "bool"
              }
            }
          ]
        }
      },
      {
        name: "UpdatePoolIx",
        type: {
          kind: "struct",
          fields: [
            {
              name: "imageUri",
              type: {
                option: "string"
              }
            },
            {
              name: "overlayText",
              type: "string"
            },
            {
              name: "requiresCollections",
              type: {
                vec: "publicKey"
              }
            },
            {
              name: "requiresCreators",
              type: {
                vec: "publicKey"
              }
            },
            {
              name: "requiresAuthorization",
              type: "bool"
            },
            {
              name: "authority",
              type: "publicKey"
            },
            {
              name: "resetOnStake",
              type: "bool"
            },
            {
              name: "cooldownSeconds",
              type: {
                option: "u32"
              }
            },
            {
              name: "minStakeSeconds",
              type: {
                option: "u32"
              }
            },
            {
              name: "endDate",
              type: {
                option: "i64"
              }
            },
            {
              name: "doubleOrResetEnabled",
              type: {
                option: "bool"
              }
            }
          ]
        }
      },
      {
        name: "StakeEntryKind",
        type: {
          kind: "enum",
          variants: [
            {
              name: "Permissionless"
            },
            {
              name: "Permissioned"
            }
          ]
        }
      }
    ],
    errors: [
      {
        code: 6000,
        name: "InvalidOriginalMint",
        msg: "Original mint is invalid"
      },
      {
        code: 6001,
        name: "InvalidTokenManagerMint",
        msg: "Token Manager mint is invalid"
      },
      {
        code: 6002,
        name: "InvalidUserOriginalMintTokenAccount",
        msg: "Invalid user original mint token account"
      },
      {
        code: 6003,
        name: "InvalidUserMintTokenAccount",
        msg: "Invalid user token manager mint account"
      },
      {
        code: 6004,
        name: "InvalidStakeEntryOriginalMintTokenAccount",
        msg: "Invalid stake entry original mint token account"
      },
      {
        code: 6005,
        name: "InvalidStakeEntryMintTokenAccount",
        msg: "Invalid stake entry token manager mint token account"
      },
      {
        code: 6006,
        name: "InvalidUnstakeUser",
        msg: "Invalid unstake user only last staker can unstake"
      },
      {
        code: 6007,
        name: "InvalidRewardDistributorTokenAccount",
        msg: "Invalid reward distributor token account"
      },
      {
        code: 6008,
        name: "InvalidAuthorityTokenAccount",
        msg: "Invalid authority token account"
      },
      {
        code: 6009,
        name: "SupplyRequired",
        msg: "Initial supply required for kind treasury"
      },
      {
        code: 6010,
        name: "InvalidStakePool",
        msg: "Invalid stake pool"
      },
      {
        code: 6011,
        name: "NoMintMetadata",
        msg: "No mint metadata"
      },
      {
        code: 6012,
        name: "MintNotAllowedInPool",
        msg: "Mint not allowed in this pool"
      },
      {
        code: 6013,
        name: "InvalidPoolAuthority",
        msg: "Invalid stake pool authority"
      },
      {
        code: 6014,
        name: "InvalidStakeType",
        msg: "Invalid stake type"
      },
      {
        code: 6015,
        name: "InvalidStakeEntryStakeTokenAccount",
        msg: "Invalid stake entry stake token account"
      },
      {
        code: 6016,
        name: "InvalidLastStaker",
        msg: "Invalid last staker"
      },
      {
        code: 6017,
        name: "InvalidTokenManagerProgram",
        msg: "Invalid token manager program"
      },
      {
        code: 6018,
        name: "InvalidReceiptMint",
        msg: "Invalid receipt mint"
      },
      {
        code: 6019,
        name: "StakeEntryAlreadyStaked",
        msg: "Stake entry already has tokens staked"
      },
      {
        code: 6020,
        name: "InvalidAuthority",
        msg: "Invalid authority"
      },
      {
        code: 6021,
        name: "CannotCloseStakedEntry",
        msg: "Cannot close staked entry"
      },
      {
        code: 6022,
        name: "CannotClosePoolWithStakedEntries",
        msg: "Cannot close staked entry"
      },
      {
        code: 6023,
        name: "CooldownSecondRemaining",
        msg: "Token still has some cooldown seconds remaining"
      },
      {
        code: 6024,
        name: "MinStakeSecondsNotSatisfied",
        msg: "Minimum stake seconds not satisfied"
      },
      {
        code: 6025,
        name: "InvalidStakeAuthorizationRecord",
        msg: "Invalid stake authorization provided"
      },
      {
        code: 6026,
        name: "InvalidMintMetadata",
        msg: "Invalid mint metadata"
      },
      {
        code: 6027,
        name: "StakePoolHasEnded",
        msg: "Stake pool has ended"
      },
      {
        code: 6028,
        name: "InvalidMintMetadataOwner",
        msg: "Mint metadata is owned by the incorrect program"
      },
      {
        code: 6029,
        name: "StakeMintAlreadyInitialized",
        msg: "Stake mint already intialized"
      },
      {
        code: 6030,
        name: "InvalidStakeEntry",
        msg: "Invalid stake entry"
      },
      {
        code: 6031,
        name: "CannotUpdateUnstakedEntry",
        msg: "Cannot update unstaked entry"
      },
      {
        code: 6130,
        name: "InvalidFundsMint",
        msg: "Invalid funds mint"
      },
      {
        code: 6131,
        name: "InvalidMintForTokenAccount",
        msg: "Invalid mint for token account"
      },
      {
        code: 6132,
        name: "StakeEntryFundsTokenAccountEmpty",
        msg: "Stake entry funds token account is empty"
      },
      {
        code: 6133,
        name: "InvalidUserRewardMintTokenAccount",
        msg: "Invalid User Reward Mint Token Account"
      },
      {
        code: 6134,
        name: "InvalidRewardMint",
        msg: "Invalid Reward Mint"
      },
      {
        code: 6135,
        name: "InvalidRewardDistributorAuthority",
        msg: "Invalid Reward Distributor Authority"
      },
      {
        code: 6136,
        name: "InvalidRewardDistributor",
        msg: "Invalid Reward Distributor"
      }
    ],
    metadata: {
      address: "6tBPww6mfWdJ4Hs9Y1kVsVDLn1H4GgjBCM8Xu2LMQE9"
    }
  };
  
  export const IDL: CardinalStakePool = 
  {
    version: "0.1.0",
    name: "staking",
    instructions: [
      {
        name: "initStakePool",
        accounts: [
          {
            name: "stakePool",
            isMut: true,
            isSigner: false
          },
          {
            name: "identifier",
            isMut: true,
            isSigner: false
          },
          {
            name: "payer",
            isMut: true,
            isSigner: true
          },
          {
            name: "systemProgram",
            isMut: false,
            isSigner: false
          }
        ],
        args: [
          {
            name: "ix",
            type: {
              defined: "InitPoolIx"
            }
          }
        ]
      },
      {
        name: "initIdentifier",
        accounts: [
          {
            name: "identifier",
            isMut: true,
            isSigner: false
          },
          {
            name: "payer",
            isMut: true,
            isSigner: true
          },
          {
            name: "systemProgram",
            isMut: false,
            isSigner: false
          }
        ],
        args: []
      },
      {
        name: "updateStakePool",
        accounts: [
          {
            name: "stakePool",
            isMut: true,
            isSigner: false
          },
          {
            name: "payer",
            isMut: true,
            isSigner: true
          }
        ],
        args: [
          {
            name: "ix",
            type: {
              defined: "UpdatePoolIx"
            }
          }
        ]
      },
      {
        name: "closeStakePool",
        accounts: [
          {
            name: "stakePool",
            isMut: true,
            isSigner: false
          },
          {
            name: "authority",
            isMut: true,
            isSigner: true
          }
        ],
        args: []
      },
      {
        name: "initEntry",
        accounts: [
          {
            name: "stakeEntry",
            isMut: true,
            isSigner: false
          },
          {
            name: "stakePool",
            isMut: true,
            isSigner: false
          },
          {
            name: "originalMint",
            isMut: false,
            isSigner: false
          },
          {
            name: "originalMintMetadata",
            isMut: false,
            isSigner: false
          },
          {
            name: "payer",
            isMut: true,
            isSigner: true
          },
          {
            name: "systemProgram",
            isMut: false,
            isSigner: false
          }
        ],
        args: []
      },
      {
        name: "stake",
        accounts: [
          {
            name: "stakeEntry",
            isMut: true,
            isSigner: false
          },
          {
            name: "stakePool",
            isMut: true,
            isSigner: false
          },
          {
            name: "originalMint",
            isMut: false,
            isSigner: false
          },
          {
            name: "originalMintTokenAccount",
            isMut: true,
            isSigner: false
          },
          {
            name: "userOriginalMintTokenRecord",
            isMut: true,
            isSigner: false
          },
          {
            name: "user",
            isMut: true,
            isSigner: true
          },
          {
            name: "mintMetadata",
            isMut: true,
            isSigner: false
          },
          {
            name: "mintEdition",
            isMut: false,
            isSigner: false
          },
          {
            name: "authorizationRules",
            isMut: false,
            isSigner: false
          },
          {
            name: "sysvarInstructions",
            isMut: false,
            isSigner: false
          },
          {
            name: "tokenMetadataProgram",
            isMut: false,
            isSigner: false
          },
          {
            name: "authorizationRulesProgram",
            isMut: false,
            isSigner: false
          },
          {
            name: "tokenProgram",
            isMut: false,
            isSigner: false
          },
          {
            name: "systemProgram",
            isMut: false,
            isSigner: false
          }
        ],
        args: []
      },
      {
        name: "unstake",
        accounts: [
          {
            name: "stakeEntry",
            isMut: true,
            isSigner: false
          },
          {
            name: "rewardEntry",
            isMut: true,
            isSigner: false
          },
          {
            name: "stakePool",
            isMut: true,
            isSigner: false
          },
          {
            name: "originalMint",
            isMut: false,
            isSigner: false
          },
          {
            name: "user",
            isMut: true,
            isSigner: true
          },
          {
            name: "userOriginalMintTokenAccount",
            isMut: true,
            isSigner: false
          },
          {
            name: "userOriginalMintTokenRecord",
            isMut: true,
            isSigner: false
          },
          {
            name: "mintMetadata",
            isMut: true,
            isSigner: false
          },
          {
            name: "mintEdition",
            isMut: false,
            isSigner: false
          },
          {
            name: "authorizationRules",
            isMut: false,
            isSigner: false
          },
          {
            name: "sysvarInstructions",
            isMut: false,
            isSigner: false
          },
          {
            name: "tokenProgram",
            isMut: false,
            isSigner: false
          },
          {
            name: "tokenMetadataProgram",
            isMut: false,
            isSigner: false
          },
          {
            name: "authorizationRulesProgram",
            isMut: false,
            isSigner: false
          },
          {
            name: "systemProgram",
            isMut: false,
            isSigner: false
          }
        ],
        args: []
      },
      {
        name: "updateTotalStakeSeconds",
        accounts: [
          {
            name: "stakeEntry",
            isMut: true,
            isSigner: false
          },
          {
            name: "lastStaker",
            isMut: true,
            isSigner: true
          }
        ],
        args: []
      },
      {
        name: "initRewardDistributors",
        accounts: [
          {
            name: "rewardDistributor",
            isMut: true,
            isSigner: false
          },
          {
            name: "stakePool",
            isMut: false,
            isSigner: false
          },
          {
            name: "rewardMint",
            isMut: true,
            isSigner: false
          },
          {
            name: "authority",
            isMut: true,
            isSigner: true
          },
          {
            name: "payer",
            isMut: true,
            isSigner: true
          },
          {
            name: "tokenProgram",
            isMut: false,
            isSigner: false
          },
          {
            name: "systemProgram",
            isMut: false,
            isSigner: false
          }
        ],
        args: [
          {
            name: "ix",
            type: {
              defined: "InitRewardDistributorIx"
            }
          }
        ]
      },
      {
        name: "initRewardEntry",
        accounts: [
          {
            name: "rewardEntry",
            isMut: true,
            isSigner: false
          },
          {
            name: "stakeEntry",
            isMut: false,
            isSigner: false
          },
          {
            name: "rewardDistributor",
            isMut: true,
            isSigner: false
          },
          {
            name: "payer",
            isMut: true,
            isSigner: true
          },
          {
            name: "systemProgram",
            isMut: false,
            isSigner: false
          }
        ],
        args: []
      },
      {
        name: "updateRewardDistributor",
        accounts: [
          {
            name: "rewardDistributor",
            isMut: true,
            isSigner: false
          },
          {
            name: "authority",
            isMut: false,
            isSigner: true
          }
        ],
        args: [
          {
            name: "ix",
            type: {
              defined: "UpdateRewardDistributorIx"
            }
          }
        ]
      },
      {
        name: "updateRewardEntry",
        accounts: [
          {
            name: "rewardEntry",
            isMut: true,
            isSigner: false
          },
          {
            name: "rewardDistributor",
            isMut: false,
            isSigner: false
          },
          {
            name: "authority",
            isMut: false,
            isSigner: true
          }
        ],
        args: [
          {
            name: "ix",
            type: {
              defined: "UpdateRewardEntryIx"
            }
          }
        ]
      },
      {
        name: "reclaimFund",
        accounts: [
          {
            name: "rewardDistributor",
            isMut: true,
            isSigner: false
          },
          {
            name: "rewardDistributorTokenAccount",
            isMut: true,
            isSigner: false
          },
          {
            name: "authorityTokenAccount",
            isMut: true,
            isSigner: false
          },
          {
            name: "authority",
            isMut: true,
            isSigner: true
          },
          {
            name: "tokenProgram",
            isMut: false,
            isSigner: false
          }
        ],
        args: [
          {
            name: "amount",
            type: "u64"
          }
        ]
      },
      {
        name: "claim",
        accounts: [
          {
            name: "rewardEntry",
            isMut: true,
            isSigner: false
          },
          {
            name: "rewardDistributor",
            isMut: true,
            isSigner: false
          },
          {
            name: "stakeEntry",
            isMut: false,
            isSigner: false
          },
          {
            name: "stakePool",
            isMut: false,
            isSigner: false
          },
          {
            name: "rewardMint",
            isMut: true,
            isSigner: false
          },
          {
            name: "userRewardMintTokenAccount",
            isMut: true,
            isSigner: false
          },
          {
            name: "rewardManager",
            isMut: true,
            isSigner: false
          },
          {
            name: "user",
            isMut: true,
            isSigner: true
          },
          {
            name: "tokenProgram",
            isMut: false,
            isSigner: false
          },
          {
            name: "systemProgram",
            isMut: false,
            isSigner: false
          }
        ],
        args: []
      }
    ],
    accounts: [
      {
        name: "StakeEntry",
        type: {
          kind: "struct",
          fields: [
            {
              name: "bump",
              type: "u8"
            },
            {
              name: "pool",
              type: "publicKey"
            },
            {
              name: "originalMint",
              type: "publicKey"
            },
            {
              name: "originalMintClaimed",
              type: "bool"
            },
            {
              name: "staker",
              type: "publicKey"
            },
            {
              name: "lastStakedAt",
              type: "i64"
            },
            {
              name: "totalStakeSeconds",
              type: "u128"
            },
            {
              name: "stakeMintClaimed",
              type: "bool"
            },
            {
              name: "kind",
              type: "u8"
            },
            {
              name: "stakeMint",
              type: {
                option: "publicKey"
              }
            },
            {
              name: "cooldownStartSeconds",
              type: {
                option: "i64"
              }
            },
            {
              name: "lastUpdatedAt",
              type: {
                option: "i64"
              }
            }
          ]
        }
      },
      {
        name: "StakePool",
        type: {
          kind: "struct",
          fields: [
            {
              name: "bump",
              type: "u8"
            },
            {
              name: "identifier",
              type: "u64"
            },
            {
              name: "authority",
              type: "publicKey"
            },
            {
              name: "requiresCreators",
              type: {
                vec: "publicKey"
              }
            },
            {
              name: "requiresCollections",
              type: {
                vec: "publicKey"
              }
            },
            {
              name: "requiresAuthorization",
              type: "bool"
            },
            {
              name: "overlayText",
              type: "string"
            },
            {
              name: "imageUri",
              type: "string"
            },
            {
              name: "resetOnStake",
              type: "bool"
            },
            {
              name: "totalStaked",
              type: "u32"
            },
            {
              name: "cooldownSeconds",
              type: {
                option: "u32"
              }
            },
            {
              name: "minStakeSeconds",
              type: {
                option: "u32"
              }
            },
            {
              name: "endDate",
              type: {
                option: "i64"
              }
            },
            {
              name: "doubleOrResetEnabled",
              type: {
                option: "bool"
              }
            }
          ]
        }
      },
      {
        name: "RewardEntry",
        type: {
          kind: "struct",
          fields: [
            {
              name: "bump",
              type: "u8"
            },
            {
              name: "stakeEntry",
              type: "publicKey"
            },
            {
              name: "rewardDistributor",
              type: "publicKey"
            },
            {
              name: "rewardSecondsReceived",
              type: "u128"
            },
            {
              name: "multiplier",
              type: "u64"
            }
          ]
        }
      },
      {
        name: "Identifier",
        type: {
          kind: "struct",
          fields: [
            {
              name: "bump",
              type: "u8"
            },
            {
              name: "count",
              type: "u64"
            }
          ]
        }
      },
      {
        name: "RewardDistributor",
        type: {
          kind: "struct",
          fields: [
            {
              name: "bump",
              type: "u8"
            },
            {
              name: "stakePool",
              type: "publicKey"
            },
            {
              name: "kind",
              type: "u8"
            },
            {
              name: "authority",
              type: "publicKey"
            },
            {
              name: "rewardMint",
              type: "publicKey"
            },
            {
              name: "rewardAmount",
              type: "u64"
            },
            {
              name: "rewardDurationSeconds",
              type: "u128"
            },
            {
              name: "rewardsIssued",
              type: "u128"
            },
            {
              name: "maxSupply",
              type: {
                option: "u64"
              }
            },
            {
              name: "defaultMultiplier",
              type: "u64"
            },
            {
              name: "multiplierDecimals",
              type: "u8"
            },
            {
              name: "maxRewardSecondsReceived",
              type: {
                option: "u128"
              }
            }
          ]
        }
      },
      {
        name: "TokenManager",
        type: {
          kind: "struct",
          fields: [
            {
              name: "version",
              type: "u8"
            },
            {
              name: "bump",
              type: "u8"
            }
          ]
        }
      }
    ],
    fields: [
      {
        name: "InitRewardDistributorIx",
        type: {
          kind: "struct",
          fields: [
            {
              name: "rewardAmount",
              type: "u64"
            },
            {
              name: "rewardDurationSeconds",
              type: "u128"
            },
            {
              name: "kind",
              type: "u8"
            },
            {
              name: "supply",
              type: {
                option: "u64"
              }
            },
            {
              name: "maxSupply",
              type: {
                option: "u64"
              }
            },
            {
              name: "defaultMultiplier",
              type: {
                option: "u64"
              }
            },
            {
              name: "multiplierDecimals",
              type: {
                option: "u8"
              }
            },
            {
              name: "maxRewardSecondsReceived",
              type: {
                option: "u128"
              }
            }
          ]
        }
      },
      {
        name: "UpdateRewardDistributorIx",
        type: {
          kind: "struct",
          fields: [
            {
              name: "defaultMultiplier",
              type: "u64"
            },
            {
              name: "multiplierDecimals",
              type: "u8"
            },
            {
              name: "rewardAmount",
              type: "u64"
            },
            {
              name: "rewardDurationSeconds",
              type: "u128"
            },
            {
              name: "maxRewardSecondsReceived",
              type: {
                option: "u128"
              }
            }
          ]
        }
      },
      {
        name: "UpdateRewardEntryIx",
        type: {
          kind: "struct",
          fields: [
            {
              name: "multiplier",
              type: "u64"
            }
          ]
        }
      },
      {
        name: "InitPoolIx",
        type: {
          kind: "struct",
          fields: [
            {
              name: "overlayText",
              type: "string"
            },
            {
              name: "imageUri",
              type: "string"
            },
            {
              name: "requiresCollections",
              type: {
                vec: "publicKey"
              }
            },
            {
              name: "requiresCreators",
              type: {
                vec: "publicKey"
              }
            },
            {
              name: "requiresAuthorization",
              type: "bool"
            },
            {
              name: "authority",
              type: "publicKey"
            },
            {
              name: "resetOnStake",
              type: "bool"
            },
            {
              name: "cooldownSeconds",
              type: {
                option: "u32"
              }
            },
            {
              name: "minStakeSeconds",
              type: {
                option: "u32"
              }
            },
            {
              name: "endDate",
              type: {
                option: "i64"
              }
            },
            {
              name: "doubleOrResetEnabled",
              type: {
                option: "bool"
              }
            }
          ]
        }
      },
      {
        name: "UpdatePoolIx",
        type: {
          kind: "struct",
          fields: [
            {
              name: "imageUri",
              type: {
                option: "string"
              }
            },
            {
              name: "overlayText",
              type: "string"
            },
            {
              name: "requiresCollections",
              type: {
                vec: "publicKey"
              }
            },
            {
              name: "requiresCreators",
              type: {
                vec: "publicKey"
              }
            },
            {
              name: "requiresAuthorization",
              type: "bool"
            },
            {
              name: "authority",
              type: "publicKey"
            },
            {
              name: "resetOnStake",
              type: "bool"
            },
            {
              name: "cooldownSeconds",
              type: {
                option: "u32"
              }
            },
            {
              name: "minStakeSeconds",
              type: {
                option: "u32"
              }
            },
            {
              name: "endDate",
              type: {
                option: "i64"
              }
            },
            {
              name: "doubleOrResetEnabled",
              type: {
                option: "bool"
              }
            }
          ]
        }
      },
      {
        name: "StakeEntryKind",
        type: {
          kind: "enum",
          variants: [
            {
              name: "Permissionless"
            },
            {
              name: "Permissioned"
            }
          ]
        }
      }
    ],
    errors: [
      {
        code: 6000,
        name: "InvalidOriginalMint",
        msg: "Original mint is invalid"
      },
      {
        code: 6001,
        name: "InvalidTokenManagerMint",
        msg: "Token Manager mint is invalid"
      },
      {
        code: 6002,
        name: "InvalidUserOriginalMintTokenAccount",
        msg: "Invalid user original mint token account"
      },
      {
        code: 6003,
        name: "InvalidUserMintTokenAccount",
        msg: "Invalid user token manager mint account"
      },
      {
        code: 6004,
        name: "InvalidStakeEntryOriginalMintTokenAccount",
        msg: "Invalid stake entry original mint token account"
      },
      {
        code: 6005,
        name: "InvalidStakeEntryMintTokenAccount",
        msg: "Invalid stake entry token manager mint token account"
      },
      {
        code: 6006,
        name: "InvalidUnstakeUser",
        msg: "Invalid unstake user only last staker can unstake"
      },
      {
        code: 6007,
        name: "InvalidRewardDistributorTokenAccount",
        msg: "Invalid reward distributor token account"
      },
      {
        code: 6008,
        name: "InvalidAuthorityTokenAccount",
        msg: "Invalid authority token account"
      },
      {
        code: 6009,
        name: "SupplyRequired",
        msg: "Initial supply required for kind treasury"
      },
      {
        code: 6010,
        name: "InvalidStakePool",
        msg: "Invalid stake pool"
      },
      {
        code: 6011,
        name: "NoMintMetadata",
        msg: "No mint metadata"
      },
      {
        code: 6012,
        name: "MintNotAllowedInPool",
        msg: "Mint not allowed in this pool"
      },
      {
        code: 6013,
        name: "InvalidPoolAuthority",
        msg: "Invalid stake pool authority"
      },
      {
        code: 6014,
        name: "InvalidStakeType",
        msg: "Invalid stake type"
      },
      {
        code: 6015,
        name: "InvalidStakeEntryStakeTokenAccount",
        msg: "Invalid stake entry stake token account"
      },
      {
        code: 6016,
        name: "InvalidLastStaker",
        msg: "Invalid last staker"
      },
      {
        code: 6017,
        name: "InvalidTokenManagerProgram",
        msg: "Invalid token manager program"
      },
      {
        code: 6018,
        name: "InvalidReceiptMint",
        msg: "Invalid receipt mint"
      },
      {
        code: 6019,
        name: "StakeEntryAlreadyStaked",
        msg: "Stake entry already has tokens staked"
      },
      {
        code: 6020,
        name: "InvalidAuthority",
        msg: "Invalid authority"
      },
      {
        code: 6021,
        name: "CannotCloseStakedEntry",
        msg: "Cannot close staked entry"
      },
      {
        code: 6022,
        name: "CannotClosePoolWithStakedEntries",
        msg: "Cannot close staked entry"
      },
      {
        code: 6023,
        name: "CooldownSecondRemaining",
        msg: "Token still has some cooldown seconds remaining"
      },
      {
        code: 6024,
        name: "MinStakeSecondsNotSatisfied",
        msg: "Minimum stake seconds not satisfied"
      },
      {
        code: 6025,
        name: "InvalidStakeAuthorizationRecord",
        msg: "Invalid stake authorization provided"
      },
      {
        code: 6026,
        name: "InvalidMintMetadata",
        msg: "Invalid mint metadata"
      },
      {
        code: 6027,
        name: "StakePoolHasEnded",
        msg: "Stake pool has ended"
      },
      {
        code: 6028,
        name: "InvalidMintMetadataOwner",
        msg: "Mint metadata is owned by the incorrect program"
      },
      {
        code: 6029,
        name: "StakeMintAlreadyInitialized",
        msg: "Stake mint already intialized"
      },
      {
        code: 6030,
        name: "InvalidStakeEntry",
        msg: "Invalid stake entry"
      },
      {
        code: 6031,
        name: "CannotUpdateUnstakedEntry",
        msg: "Cannot update unstaked entry"
      },
      {
        code: 6130,
        name: "InvalidFundsMint",
        msg: "Invalid funds mint"
      },
      {
        code: 6131,
        name: "InvalidMintForTokenAccount",
        msg: "Invalid mint for token account"
      },
      {
        code: 6132,
        name: "StakeEntryFundsTokenAccountEmpty",
        msg: "Stake entry funds token account is empty"
      },
      {
        code: 6133,
        name: "InvalidUserRewardMintTokenAccount",
        msg: "Invalid User Reward Mint Token Account"
      },
      {
        code: 6134,
        name: "InvalidRewardMint",
        msg: "Invalid Reward Mint"
      },
      {
        code: 6135,
        name: "InvalidRewardDistributorAuthority",
        msg: "Invalid Reward Distributor Authority"
      },
      {
        code: 6136,
        name: "InvalidRewardDistributor",
        msg: "Invalid Reward Distributor"
      }
    ],
    metadata: {
      address: "6tBPww6mfWdJ4Hs9Y1kVsVDLn1H4GgjBCM8Xu2LMQE9"
    }
  }
  ;
  