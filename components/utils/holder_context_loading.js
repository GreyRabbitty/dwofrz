import React, {useState } from "react";
export const LoadingContext = React.createContext(false);
export const SetLoadingContext = React.createContext();

export function LoadingProvider({ children }) {
    const [loading, setLoading] = useState(true)
    function setloading(bool) {
        setLoading(bool);
    }
    return (
        <LoadingContext.Provider value={loading} >
        <SetLoadingContext.Provider value={setloading}>
            {children}
        </SetLoadingContext.Provider>
        </LoadingContext.Provider>
    )
}