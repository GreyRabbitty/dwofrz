import React, {useState } from "react";

export const HolderContext = React.createContext(false);
export const SetHolderContext = React.createContext();

export function HolderProvider({ children }) {
    const [holder, setHolder] = useState(false)

    function setholder(bool) {
        setHolder(bool)
    }

    return (
        <HolderContext.Provider value={holder} >
        <SetHolderContext.Provider value={setholder} >
            {children}
        </SetHolderContext.Provider>
        </HolderContext.Provider>
    )
}