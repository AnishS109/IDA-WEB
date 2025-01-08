import { createContext, useEffect, useState } from "react";

export const DataContext = createContext({
  account: { userName: "", name: "" },
  role: ""
});

const DataProvider = ({ children }) => {

<<<<<<< HEAD
  const backendUrl = "http://localhost:5000"

  // -------------------------------------------------
=======
  const backendUrl = "https://ida-web-server.onrender.com"
>>>>>>> 7b8cde19163ac237036aa52c66321f6849182de1
  
  const [role, setRole] = useState(() => {
    const savedRole = sessionStorage.getItem("role");
    return savedRole ? savedRole : "";
  });
  
  useEffect(() => {
    if (role) {
      sessionStorage.setItem("role", role);
    }
  }, [role]);  

  // -------------------------------------------------
  
  const [account, setAccount] = useState(() => {
    const savedAccount = sessionStorage.getItem("account");
    return savedAccount ? JSON.parse(savedAccount) : { username: "", name: "" };
  });
  
  useEffect(() => {
    sessionStorage.setItem("account", JSON.stringify(account));
  }, [account]);

  // ------------------------------------------------------

  const [confirmedStudentDone, setConfirmedStudentDone] = useState(() => {
    const savedStudent = sessionStorage.getItem("confirmedStudentDone");
    return savedStudent ? JSON.parse(savedStudent) : null;
  });
  
  useEffect(() => {
    sessionStorage.setItem("confirmedStudentDone", JSON.stringify(confirmedStudentDone));
  }, [confirmedStudentDone]);

  return (
    <DataContext.Provider value={{
      account,
      setAccount,
      role,
      setRole,
      backendUrl,
      confirmedStudentDone,
      setConfirmedStudentDone
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
