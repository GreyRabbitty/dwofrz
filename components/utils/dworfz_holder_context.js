import React, { useState } from "react";

export const DworfzHolderContext = React.createContext(false);
export const SetDworfzHolderContext = React.createContext();

export function DworfzHolderProvider({ children }) {
    const [dworfz_holder, setDworfzHolder] = useState(false)

    function setdworfzholder(bool) {
        setDworfzHolder(bool)
    }

    return (
        <DworfzHolderContext.Provider value={dworfz_holder} >
        <SetDworfzHolderContext.Provider value={setdworfzholder} >
            {children}
        </SetDworfzHolderContext.Provider>
        </DworfzHolderContext.Provider>
    )
}