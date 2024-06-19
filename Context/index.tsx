//@ts-nocheck
"use client";
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
    let [userName, setUserName] = useState("gaurav-sunthwal");
    let [userAccountBalance, setUserAccountBalance] = useState(500.0000);
  return (
    <AppContext.Provider
      value={{
        userName,
        setUserName,
        userAccountBalance,
        setUserAccountBalance
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
