import { createContext, useEffect, useState } from "react";

export const DataContext = createContext({
  account: { userName: "", name: "" },
});

const DataProvider = ({ children }) => {

  const backendUrl = "https://ida-web-server.onrender.com"

  const [account, setAccount] = useState(() => {
    const savedAccount = sessionStorage.getItem("account");
    return savedAccount ? JSON.parse(savedAccount) : { username: "", name: "" };
  });
  
  useEffect(() => {
    sessionStorage.setItem("account", JSON.stringify(account));
  }, [account]);
  

  return (
    <DataContext.Provider value={{
      account,
      setAccount,
      backendUrl,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
