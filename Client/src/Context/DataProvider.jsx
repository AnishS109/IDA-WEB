import { createContext, useEffect, useState } from "react";

export const DataContext = createContext({
  account: { userName: "", name: "" },
  role: ""
});

const DataProvider = ({ children }) => {

  const backendUrl = "http://localhost:5000"

  // -------------------------------------------------
  
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

  // ------------------------------------------------------

    // const [CallingStudentname, setCallingStudentName] = useState("");

  const [CallingStudentname, setCallingStudentName] = useState(() => {
    const savedStudent = sessionStorage.getItem("CallingStudentname");
    return savedStudent ? JSON.parse(savedStudent) : null;
  });
  
  useEffect(() => {
    sessionStorage.setItem("CallingStudentname", JSON.stringify(CallingStudentname));
  }, [CallingStudentname]);

  return (
    <DataContext.Provider value={{
      account,
      setAccount,
      role,
      setRole,
      backendUrl,
      confirmedStudentDone,
      setConfirmedStudentDone,
      setCallingStudentName,
      CallingStudentname
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;