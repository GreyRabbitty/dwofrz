import React, { useState } from "react";

export const nftContext = React.createContext(false);
export const SetnftContext = React.createContext();

export function NftProvider({ children }) {
    const [nft, setNft] = useState(null)

    function setnft(bool) {
        setNft(bool)
    }

    return (
        <nftContext.Provider value={nft} >
        <SetnftContext.Provider value={setnft} >
            {children}
        </SetnftContext.Provider>
        </nftContext.Provider>
    )
}