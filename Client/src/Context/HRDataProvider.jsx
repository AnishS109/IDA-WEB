import { createContext } from "react";

export const HRDataContext = createContext(null)

const HRDataProvider = ({ children }) => {
  return (
    <HRDataContext.Provider value={{

    }}>

      {children}

    </HRDataContext.Provider>
  )
}

export default HRDataProvider;