import { createContext, useEffect, useState } from "react";

export const DataContext = createContext({
  account: { userName: "", name: "" },
  role: ""
});

const DataProvider = ({ children }) => {

  const backendUrl = "https://ida-web-server.onrender.com"
  
  const [role, setRole] = useState(() => {
    const savedRole = sessionStorage.getItem("role");
    return savedRole ? savedRole : "";
  });
  
  useEffect(() => {
    if (role) {
      sessionStorage.setItem("role", role);
    }
  }, [role]);  

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
      role,
      setRole,
      backendUrl,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
