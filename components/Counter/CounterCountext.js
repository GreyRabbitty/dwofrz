import React, {useContext, useState } from "react";

export const TimerContext = React.createContext(false)
export const SetTimerContext = React.createContext()

export function ConterProvider({ children }) {
    const [timer, setTimer] = useState(false)

    function settimer(bool) {
        setTimer(bool)
    }

    return (
        <TimerContext.Provider value={timer} >
        <SetTimerContext.Provider value={settimer} >
            {children}
        </SetTimerContext.Provider>
        </TimerContext.Provider>
    )

}