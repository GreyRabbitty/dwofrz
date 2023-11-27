export async function initialze_claim(program, pandora, user, claimer, systemProgram) {
    const tx = await program.methods
      .initilizeClaim()
      .accounts({
        user: user,
        claimer: claimer,
        pandora: pandora, 
        systemProgram: systemProgram
      })
      // .rpc({
      //   "commitment": "finalized"
      // })
      // // console.log(tx)
      .transaction()
      return tx;
}