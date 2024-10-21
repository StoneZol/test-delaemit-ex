'use client'
import { createContext, useContext, useState } from "react";

const HeaderContext= createContext(null)

export const HeaderProvider = ({children})=>{
    const [visible, setVisible] = useState(false)
    return (
        <HeaderContext.Provider value={{visible, setVisible}}>
            {children}
        </HeaderContext.Provider>
    )
}

export const useHeaderContext = () => {
    const context = useContext(HeaderContext);
    
    if (context === null) {
      throw new Error("useHeaderContext должен использоваться внутри HeaderProvider");
    }
  
    return context;
  };