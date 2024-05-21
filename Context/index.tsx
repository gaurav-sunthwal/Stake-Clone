//@ts-nocheck
"use client";
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {

    const [userAmount , setUserAmount] = useState(50000.000)
return(
    <AppContext.Provider value={{
        userAmount,
        setUserAmount
    }}>
        {children}
    </AppContext.Provider>
)
}

export function useAppContext() {
    return useContext(AppContext);
  }