import { createContext, useEffect, useState } from "react";

export const DataContext = createContext({
  account: { userName: "", name: "" },
  role: ""
});

const DataProvider = ({ children }) => {

  const backendUrl = "https://ida-web-server.onrender.com"

  const savedRole = localStorage.getItem("role");

  const [role, setRole] = useState(savedRole || "");
  const [account, setAccount] = useState(() => {
    const savedAccount = localStorage.getItem("account");
    return savedAccount ? JSON.parse(savedAccount) : { username: "", name: "" };
  });

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role);
    }
  }, [role]);

  useEffect(() => {
    localStorage.setItem("account", JSON.stringify(account));
  }, [account]);

  return (
    <DataContext.Provider value={{
      account,
      setAccount,
      role,
      setRole,
      backendUrl
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
