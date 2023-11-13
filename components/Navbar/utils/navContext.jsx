import React, { useContext, useState } from "react";

export const ShowContext = React.createContext();
export const SetShowContext = React.createContext();

export function NavProvider({ children }) {
  const [show, setShow] = useState(false);

  function set_show(bool) {
    setShow(bool);
  }

  return (
    <ShowContext.Provider value={show}>
      <SetShowContext.Provider value={set_show}>
        {children}
      </SetShowContext.Provider>
    </ShowContext.Provider>
  );
}
